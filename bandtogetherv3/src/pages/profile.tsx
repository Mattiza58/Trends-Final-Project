import { useState, useEffect } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import LargeText from "../components/largetext";
import ProfileCard from "../components/profilecard";
import EditProfileModal from "../components/EditProfileModal";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { FirestoreUserProfile, Song, Band } from "../types";

const Profile = () => {
    const { user, loading: authLoading } = useAuth();
    const [profile, setProfile] = useState<FirestoreUserProfile | null>(null);
    const [resolvedSongs, setResolvedSongs] = useState<Song[]>([]);
    const [resolvedBands, setResolvedBands] = useState<Band[]>([]);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setLoading(false);
            return;
        }
        Promise.allSettled([
            getDoc(doc(db, "users", user.uid)),
            getDocs(collection(db, "songs")),
            getDocs(collection(db, "bands")),
        ]).then(([userResult, songsResult, bandsResult]) => {
            if (userResult.status === "fulfilled" && userResult.value.exists()) {
                const profileData = userResult.value.data() as FirestoreUserProfile;
                setProfile(profileData);

                if (songsResult.status === "fulfilled" && profileData.songs && profileData.songs.length > 0) {
                    const allSongs = songsResult.value.docs.map(d => ({ id: d.id, ...d.data() } as Song));
                    const titleSet = new Set(profileData.songs.map(t => t.toLowerCase()));
                    setResolvedSongs(allSongs.filter(s => titleSet.has(s.title.toLowerCase())));
                }

                console.log("profileData.bands:", profileData.bands);
                console.log("bandsResult status:", bandsResult.status);

                if (bandsResult.status === "rejected") {
                    console.error("Bands fetch failed:", bandsResult.reason);
                } else {
                    const allBands = bandsResult.value.docs.map(d => ({ id: d.id, ...d.data() } as Band));
                    console.log("All bands from Firestore:", allBands);
                    if (profileData.bands && profileData.bands.length > 0) {
                        const nameSet = new Set(profileData.bands.map(n => n.toLowerCase()));
                        const matched = allBands.filter(b => nameSet.has(b.name.toLowerCase()));
                        console.log("Matched bands:", matched);
                        setResolvedBands(matched);
                    }
                }
            }
            setLoading(false);
        });
    }, [user, authLoading]);

    if (authLoading || loading) return <div style={{ fontFamily: "Be Vietnam Pro, sans-serif", padding: "2rem" }}>Loading...</div>;

    if (!profile) return <div style={{ fontFamily: "Be Vietnam Pro, sans-serif", padding: "2rem" }}>No profile found.</div>;

    return <div>
        <LargeText link="Profile" />
        <ProfileCard
            name={`${profile.firstName} ${profile.lastName}`}
            user_name={`@${profile.username}`}
            followers={0}
            following={0}
            location={profile.location}
            instruments={profile.instruments.join(", ")}
            genres={profile.genres.join(", ")}
            yrs_experience={`${profile.experience} Years Experience`}
            songs={resolvedSongs}
            bands={resolvedBands}
            onEditClick={() => setShowEditModal(true)}
        />
        {showEditModal && (
            <EditProfileModal
                profile={profile}
                onClose={() => setShowEditModal(false)}
                onSave={(updated) => setProfile(updated)}
            />
        )}
    </div>;
};

export default Profile;

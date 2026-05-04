import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import LargeText from "../components/largetext";
import ProfileCard from "../components/profilecard";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { FirestoreUserProfile } from "../types";

const Profile = () => {
    const { user, loading: authLoading } = useAuth();
    const [profile, setProfile] = useState<FirestoreUserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setLoading(false);
            return;
        }
        getDoc(doc(db, "users", user.uid)).then(snap => {
            if (snap.exists()) {
                setProfile(snap.data() as FirestoreUserProfile);
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
        />
    </div>;
};

export default Profile;

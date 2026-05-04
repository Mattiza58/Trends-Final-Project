import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FirestoreUserProfile } from "../types";
import styles from "../components/maintext.module.css";

interface UserCardData {
    uid: string;
    profile: FirestoreUserProfile;
}

const UserCard = ({ profile }: { profile: FirestoreUserProfile }) => (
    <div className={styles.connect_card}>
        <img
            src={profile.pictureUrl || "/placeholder_icon.png"}
            className={styles.connect_card_image}
            onError={e => { (e.target as HTMLImageElement).src = "/placeholder_icon.png" }}
            alt={profile.firstName}
        />
        <div className={styles.connect_card_info}>
            <p className={styles.connect_card_name}>{profile.firstName} {profile.lastName}</p>
            <p className={styles.connect_card_username}>@{profile.username}</p>
            {profile.location && (
                <p className={styles.connect_card_location}>
                    <img src="/white_location_icon.png" className={styles.connect_pin_icon} alt="" />
                    {profile.location}
                </p>
            )}
            {profile.instruments && profile.instruments.length > 0 && (
                <p className={styles.connect_card_instruments}>{profile.instruments.join(", ")}</p>
            )}
        </div>
    </div>
);

const Connect = () => {
    const [users, setUsers] = useState<UserCardData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDocs(collection(db, "users")).then(snapshot => {
            const fetched: UserCardData[] = snapshot.docs.map(doc => ({
                uid: doc.id,
                profile: doc.data() as FirestoreUserProfile,
            }));
            setUsers(fetched);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    return (
        <div className={styles.music_page}>
            <div className={styles.large_text} style={{ padding: "2rem 2rem 1rem 0" }}>Connect</div>

            <div className={styles.connect_search_row}>
                <div className={styles.search_bar_wrapper} style={{ marginBottom: 0 }}>
                    <span className={styles.search_icon}>&#128269;</span>
                    <input
                        className={styles.search_bar}
                        type="text"
                        placeholder="Search musicians..."
                        readOnly
                        style={{ cursor: "pointer" }}
                    />
                </div>
                <button className={styles.filter_button}>Filter</button>
            </div>

            {loading ? (
                <p style={{ fontFamily: "Be Vietnam Pro, sans-serif", marginTop: "2rem" }}>Loading...</p>
            ) : users.length === 0 ? (
                <p style={{ fontFamily: "Be Vietnam Pro, sans-serif", marginTop: "2rem", color: "#888" }}>No users found.</p>
            ) : (
                <div className={styles.connect_grid}>
                    {users.map(({ uid, profile }) => (
                        <UserCard key={uid} profile={profile} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Connect;

import { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FirestoreUserProfile } from "../types";
import UserProfilePopup from "../components/UserProfilePopup";
import styles from "../components/maintext.module.css";

const INSTRUMENTS = [
    "Guitar", "Bass Guitar", "Drums", "Piano", "Violin",
    "Cello", "Trumpet", "Saxophone", "Flute", "Clarinet",
    "Vocals", "DJ/Electronic", "Ukulele", "Banjo", "Mandolin",
    "Harp", "Trombone", "Harmonica", "Accordion", "Synthesizer", "Percussion"
];

const GENRES = [
    "Rock", "Pop", "Jazz", "Classical", "Hip-Hop",
    "R&B", "Country", "Electronic", "Folk", "Blues",
    "Metal", "Punk", "Reggae", "Soul", "Funk",
    "Latin", "Gospel", "Indie", "Alternative", "K-Pop"
];

interface UserCardData {
    uid: string;
    profile: FirestoreUserProfile;
}

const UserCard = ({ profile, onClick }: { profile: FirestoreUserProfile; onClick: () => void }) => (
    <div className={styles.connect_card} onClick={onClick}>
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
    const [query, setQuery] = useState("");
    const [filterInstruments, setFilterInstruments] = useState<string[]>([]);
    const [filterGenres, setFilterGenres] = useState<string[]>([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<FirestoreUserProfile | null>(null);
    const filterRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setFilterOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const toggleInstrument = (inst: string) =>
        setFilterInstruments(prev => prev.includes(inst) ? prev.filter(i => i !== inst) : [...prev, inst]);

    const toggleGenre = (genre: string) =>
        setFilterGenres(prev => prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]);

    const filtered = users.filter(({ profile }) => {
        const fullName = `${profile.firstName} ${profile.lastName}`.toLowerCase();
        if (query.trim() && !fullName.includes(query.toLowerCase())) return false;
        if (filterInstruments.length > 0 && !filterInstruments.some(i => profile.instruments?.includes(i))) return false;
        if (filterGenres.length > 0 && !filterGenres.some(g => profile.genres?.includes(g))) return false;
        return true;
    });

    const activeTags = [
        ...filterInstruments.map(i => ({ label: i, remove: () => toggleInstrument(i) })),
        ...filterGenres.map(g => ({ label: g, remove: () => toggleGenre(g) })),
    ];

    const activeCount = filterInstruments.length + filterGenres.length;

    return (
        <div className={styles.music_page}>
            <div className={styles.large_text} style={{ padding: "2rem 2rem 1rem 0" }}>Connect</div>

            <div className={styles.connect_search_row}>
                <div className={styles.search_bar_wrapper} style={{ marginBottom: 0 }}>
                    <img className={styles.search_icon} src="/search_icon.png" alt="" />
                    <input
                        className={styles.search_bar}
                        type="text"
                        placeholder="Search musicians..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>

                <div className={styles.connect_filter_wrapper} ref={filterRef}>
                    <button
                        className={styles.filter_button}
                        onClick={() => setFilterOpen(o => !o)}
                    >
                        Filter{activeCount > 0 ? ` (${activeCount})` : ""}
                    </button>

                    {filterOpen && (
                        <div className={styles.connect_filter_popup}>
                            <div className={styles.connect_filter_section_label}>Instruments</div>
                            <div className={styles.connect_filter_options}>
                                {INSTRUMENTS.map(inst => (
                                    <button
                                        key={inst}
                                        className={`${styles.connect_filter_option} ${filterInstruments.includes(inst) ? styles.connect_filter_option_active : ""}`}
                                        onClick={() => toggleInstrument(inst)}
                                    >
                                        {inst}
                                    </button>
                                ))}
                            </div>
                            <div className={styles.connect_filter_section_label} style={{ marginTop: "1rem" }}>Genres</div>
                            <div className={styles.connect_filter_options}>
                                {GENRES.map(genre => (
                                    <button
                                        key={genre}
                                        className={`${styles.connect_filter_option} ${filterGenres.includes(genre) ? styles.connect_filter_option_active : ""}`}
                                        onClick={() => toggleGenre(genre)}
                                    >
                                        {genre}
                                    </button>
                                ))}
                            </div>
                            {activeCount > 0 && (
                                <button
                                    className={styles.search_filter_clear}
                                    style={{ marginTop: "1rem" }}
                                    onClick={() => { setFilterInstruments([]); setFilterGenres([]); }}
                                >
                                    Clear all
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {activeTags.map(tag => (
                    <span key={tag.label} className={styles.connect_active_tag}>
                        {tag.label}
                        <button className={styles.connect_active_tag_remove} onClick={tag.remove}>×</button>
                    </span>
                ))}
            </div>

            {selectedUser && (
                <UserProfilePopup profile={selectedUser} onClose={() => setSelectedUser(null)} />
            )}

            {loading ? (
                <p style={{ fontFamily: "Be Vietnam Pro, sans-serif", marginTop: "2rem" }}>Loading...</p>
            ) : filtered.length === 0 ? (
                <p style={{ fontFamily: "Be Vietnam Pro, sans-serif", marginTop: "2rem", color: "#888" }}>No musicians found.</p>
            ) : (
                <div className={styles.connect_grid}>
                    {filtered.map(({ uid, profile }) => (
                        <UserCard key={uid} profile={profile} onClick={() => setSelectedUser(profile)} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Connect;

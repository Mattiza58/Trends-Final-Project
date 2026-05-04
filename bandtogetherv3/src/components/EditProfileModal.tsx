import { useState, useRef, useEffect } from "react"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"
import { FirestoreUserProfile } from "../types"
import styles from "./maintext.module.css"

const INSTRUMENTS = [
    "Guitar", "Bass Guitar", "Drums", "Piano", "Violin",
    "Cello", "Trumpet", "Saxophone", "Flute", "Clarinet",
    "Vocals", "DJ/Electronic", "Ukulele", "Banjo", "Mandolin",
    "Harp", "Trombone", "Harmonica", "Accordion", "Synthesizer", "Percussion"
]

const GENRES = [
    "Rock", "Pop", "Jazz", "Classical", "Hip-Hop",
    "R&B", "Country", "Electronic", "Folk", "Blues",
    "Metal", "Punk", "Reggae", "Soul", "Funk",
    "Latin", "Gospel", "Indie", "Alternative", "K-Pop"
]

const EXPERIENCE_OPTIONS = ["<1", "1+", "2+", "3+", "4+"]

interface EditProfileModalProps {
    profile: FirestoreUserProfile
    onClose: () => void
    onSave: (updated: FirestoreUserProfile) => void
}

const EditProfileModal = ({ profile, onClose, onSave }: EditProfileModalProps) => {
    const { user } = useAuth()

    const [firstName, setFirstName] = useState(profile.firstName)
    const [lastName, setLastName] = useState(profile.lastName)
    const [username, setUsername] = useState(profile.username)
    const [age, setAge] = useState(profile.age)
    const [gender, setGender] = useState(profile.gender)
    const [location, setLocation] = useState(profile.location)
    const [instruments, setInstruments] = useState<string[]>(profile.instruments)
    const [genres, setGenres] = useState<string[]>(profile.genres)
    const [experience, setExperience] = useState(profile.experience)
    const [showInstrumentDropdown, setShowInstrumentDropdown] = useState(false)
    const [showGenreDropdown, setShowGenreDropdown] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState("")

    const instrumentRef = useRef<HTMLDivElement>(null)
    const genreRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (instrumentRef.current && !instrumentRef.current.contains(e.target as Node)) {
                setShowInstrumentDropdown(false)
            }
            if (genreRef.current && !genreRef.current.contains(e.target as Node)) {
                setShowGenreDropdown(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    const toggleInstrument = (instrument: string) => {
        if (instruments.includes(instrument)) {
            setInstruments(instruments.filter(i => i !== instrument))
        } else if (instruments.length < 10) {
            setInstruments([...instruments, instrument])
        }
    }

    const toggleGenre = (genre: string) => {
        if (genres.includes(genre)) {
            setGenres(genres.filter(g => g !== genre))
        } else if (genres.length < 10) {
            setGenres([...genres, genre])
        }
    }

    const handleSave = async () => {
        if (!user) return
        setSubmitting(true)
        setSubmitError("")
        try {
            const updated: FirestoreUserProfile = {
                ...profile,
                firstName,
                lastName,
                username,
                age,
                gender,
                location,
                instruments,
                genres,
                experience,
            }
            await setDoc(doc(db, "users", user.uid), { ...updated, email: user.email }, { merge: true })
            onSave(updated)
            onClose()
        } catch (err) {
            console.error("Failed to update profile:", err)
            setSubmitError("Failed to save changes. Please try again.")
            setSubmitting(false)
        }
    }

    return (
        <div className={styles.modal_overlay} onMouseDown={onClose}>
            <div className={styles.create_user_box} onMouseDown={e => e.stopPropagation()}>
                <button className={styles.modal_close_button} onClick={onClose}>×</button>
                <div className={styles.user_details_container}>
                    <div className={styles.create_user_maintext}>Edit Profile</div>
                    <div className={styles.basic_details_col}>
                        <div className={styles.create_form}>
                            <div className={styles.form_field}>
                                <label className={styles.field_label}>First Name:</label>
                                <input className={styles.modern_input} type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Enter first name" />
                            </div>
                            <div className={styles.form_field}>
                                <label className={styles.field_label}>Last Name:</label>
                                <input className={styles.modern_input} type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Enter last name" />
                            </div>
                            <div className={styles.form_field}>
                                <label className={styles.field_label}>Username:</label>
                                <input className={styles.modern_input} type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Choose a username" />
                            </div>
                            <div className={styles.form_field}>
                                <label className={styles.field_label}>Age:</label>
                                <input className={styles.modern_input} type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Your age" />
                            </div>
                            <div className={styles.form_field}>
                                <label className={styles.field_label}>Gender:</label>
                                <input className={styles.modern_input} type="text" value={gender} onChange={e => setGender(e.target.value)} placeholder="Your gender" />
                            </div>
                            <div className={styles.form_field}>
                                <label className={styles.field_label}>Location:</label>
                                <input className={styles.modern_input} type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="City, State" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.music_details_col}>
                        <div className={styles.music_section} ref={instrumentRef}>
                            <label className={styles.section_label}>Instruments / Skills:</label>
                            <div className={styles.tag_container}>
                                {instruments.map(inst => (
                                    <span key={inst} className={styles.tag}>
                                        {inst}
                                        <button className={styles.tag_remove} onClick={() => toggleInstrument(inst)}>×</button>
                                    </span>
                                ))}
                                {instruments.length < 10 && (
                                    <button className={styles.add_button} onClick={() => setShowInstrumentDropdown(!showInstrumentDropdown)}>+ Add</button>
                                )}
                            </div>
                            {showInstrumentDropdown && (
                                <div className={styles.dropdown}>
                                    {INSTRUMENTS.filter(i => !instruments.includes(i)).map(inst => (
                                        <button key={inst} className={styles.dropdown_item} onClick={() => toggleInstrument(inst)}>
                                            {inst}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={styles.music_section}>
                            <label className={styles.section_label}>Years of Experience:</label>
                            <div className={styles.experience_buttons}>
                                {EXPERIENCE_OPTIONS.map(opt => (
                                    <button
                                        key={opt}
                                        className={`${styles.exp_button} ${experience === opt ? styles.exp_button_active : ""}`}
                                        onClick={() => setExperience(experience === opt ? "" : opt)}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.music_section} ref={genreRef}>
                            <label className={styles.section_label}>Preferred Genres:</label>
                            <div className={styles.tag_container}>
                                {genres.map(genre => (
                                    <span key={genre} className={styles.tag}>
                                        {genre}
                                        <button className={styles.tag_remove} onClick={() => toggleGenre(genre)}>×</button>
                                    </span>
                                ))}
                                {genres.length < 10 && (
                                    <button className={styles.add_button} onClick={() => setShowGenreDropdown(!showGenreDropdown)}>+ Add</button>
                                )}
                            </div>
                            {showGenreDropdown && (
                                <div className={styles.dropdown}>
                                    {GENRES.filter(g => !genres.includes(g)).map(genre => (
                                        <button key={genre} className={styles.dropdown_item} onClick={() => toggleGenre(genre)}>
                                            {genre}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", width: "100%", paddingRight: "2rem", paddingBottom: "1rem", gap: "0.5rem" }}>
                    {submitError && <span style={{ color: "red", fontSize: "0.85rem" }}>{submitError}</span>}
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                        <button className={styles.submit_button} style={{ backgroundColor: "#aaa" }} onClick={onClose}>Cancel</button>
                        <button className={styles.submit_button} onClick={handleSave} disabled={submitting}>
                            {submitting ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfileModal

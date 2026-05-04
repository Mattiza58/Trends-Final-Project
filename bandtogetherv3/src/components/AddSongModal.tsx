import { useState } from "react"
import { collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"
import { Song } from "../types"
import styles from "./maintext.module.css"

interface AddSongModalProps {
    onClose: () => void
    onSongAdded: (song: Song) => void
}

const AddSongModal = ({ onClose, onSongAdded }: AddSongModalProps) => {
    const { user } = useAuth()
    const [title, setTitle] = useState("")
    const [artist, setArtist] = useState("")
    const [genre, setGenre] = useState("")
    const [year, setYear] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState("")

    const handleSave = async () => {
        if (!user) return
        if (!title.trim() || !artist.trim()) {
            setSubmitError("Title and artist are required.")
            return
        }
        setSubmitting(true)
        setSubmitError("")
        try {
            const songData = {
                title: title.trim(),
                artist: artist.trim(),
                genre: genre.trim(),
                year: parseInt(year) || new Date().getFullYear(),
                imageUrl: imageUrl.trim(),
            }
            const docRef = await addDoc(collection(db, "songs"), songData)
            await updateDoc(doc(db, "users", user.uid), {
                songs: arrayUnion(title.trim()),
            })
            onSongAdded({ id: docRef.id, ...songData })
            onClose()
        } catch (err) {
            console.error("Failed to add song:", err)
            setSubmitError("Failed to save song. Please try again.")
            setSubmitting(false)
        }
    }

    return (
        <div className={styles.modal_overlay} onMouseDown={onClose}>
            <div className={styles.create_user_box} onMouseDown={e => e.stopPropagation()}>
                <button className={styles.modal_close_button} onClick={onClose}>×</button>
                <div className={styles.user_details_container}>
                    <div className={styles.create_user_maintext}>Add Song</div>
                    <div className={styles.basic_details_col}>
                        <div className={styles.create_form}>
                            <div className={styles.form_field}>
                                <label className={styles.field_label}>Title:</label>
                                <input
                                    className={styles.modern_input}
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Song title"
                                />
                            </div>
                            <div className={styles.form_field}>
                                <label className={styles.field_label}>Artist:</label>
                                <input
                                    className={styles.modern_input}
                                    type="text"
                                    value={artist}
                                    onChange={e => setArtist(e.target.value)}
                                    placeholder="Artist name"
                                />
                            </div>
                            <div className={styles.form_field}>
                                <label className={styles.field_label}>Genre:</label>
                                <input
                                    className={styles.modern_input}
                                    type="text"
                                    value={genre}
                                    onChange={e => setGenre(e.target.value)}
                                    placeholder="e.g. Rock, Jazz, Pop"
                                />
                            </div>
                            <div className={styles.form_field}>
                                <label className={styles.field_label}>Year:</label>
                                <input
                                    className={styles.modern_input}
                                    type="number"
                                    value={year}
                                    onChange={e => setYear(e.target.value)}
                                    placeholder={String(new Date().getFullYear())}
                                    min="1900"
                                    max={new Date().getFullYear()}
                                />
                            </div>
                            <div className={styles.form_field}>
                                <label className={styles.field_label}>Image URL:</label>
                                <input
                                    className={styles.modern_input}
                                    type="text"
                                    value={imageUrl}
                                    onChange={e => setImageUrl(e.target.value)}
                                    placeholder="Image Link"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", width: "100%", paddingRight: "2rem", paddingBottom: "1rem", gap: "0.5rem" }}>
                    {submitError && <span style={{ color: "red", fontSize: "0.85rem" }}>{submitError}</span>}
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                        <button className={styles.submit_button} style={{ backgroundColor: "#aaa" }} onClick={onClose}>Cancel</button>
                        <button className={styles.submit_button} onClick={handleSave} disabled={submitting}>
                            {submitting ? "Saving..." : "Add Song"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSongModal

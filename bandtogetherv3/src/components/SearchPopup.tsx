import { useState, useEffect, useRef } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import { Song } from "../types"
import SongPopup from "./SongPopup"
import styles from "./maintext.module.css"

interface SearchPopupProps {
    onClose: () => void
}

const SearchPopup = ({ onClose }: SearchPopupProps) => {
    const [query, setQuery] = useState("")
    const [songs, setSongs] = useState<Song[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [selectedSong, setSelectedSong] = useState<Song | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
        getDocs(collection(db, "songs"))
            .then(snap => {
                const raw = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                console.log("Raw Firestore songs data:", raw)
                setSongs(raw as Song[])
                setLoading(false)
            })
            .catch(err => {
                console.error("Failed to fetch songs:", err)
                setError(err.code ?? "unknown-error")
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
        document.addEventListener("keydown", handler)
        return () => document.removeEventListener("keydown", handler)
    }, [onClose])

    const results = query.trim()
        ? songs.filter(s => s.title.toLowerCase().includes(query.toLowerCase()))
        : songs

    return (
        <div className={styles.search_popup_overlay}>
            <button className={styles.search_popup_close} onClick={onClose}>×</button>

            <div className={styles.search_bar_wrapper} style={{ marginBottom: "1.5rem" }}>
                <span className={styles.search_icon}>&#128269;</span>
                <input
                    ref={inputRef}
                    className={styles.search_bar}
                    type="text"
                    placeholder="Search songs..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
            </div>

            {loading && <p className={styles.search_no_results}>Loading...</p>}

            {error && <p className={styles.search_no_results}>Error: {error} — check Firestore rules and that the songs collection exists.</p>}

            {!loading && !error && results.length === 0 && (
                <p className={styles.search_no_results}>No songs found for "{query}"</p>
            )}

            {!loading && results.map(song => (
                <div
                    key={song.id}
                    className={`${styles.search_result_row} ${styles.search_result_row_clickable}`}
                    onClick={() => setSelectedSong(song)}
                >
                    <img
                        className={styles.search_result_image}
                        src={song.imageUrl}
                        alt={song.title}
                        onError={e => { (e.target as HTMLImageElement).src = "/placeholder_icon.png" }}
                    />
                    <span className={styles.search_result_title}>{song.title}</span>
                    <span className={styles.search_result_meta}>{song.artist}</span>
                    <span className={styles.search_result_meta}>{song.genre}</span>
                    <span className={styles.search_result_meta}>{song.year}</span>
                    <button
                        className={styles.search_result_add}
                        onClick={e => e.stopPropagation()}
                    >+</button>
                </div>
            ))}

            {selectedSong && (
                <SongPopup song={selectedSong} onClose={() => setSelectedSong(null)} />
            )}
        </div>
    )
}

export default SearchPopup

import { Song } from "../types"
import styles from "./maintext.module.css"

interface SongPopupProps {
    song: Song
    onClose: () => void
}

const SongPopup = ({ song, onClose }: SongPopupProps) => {
    return (
        <div className={styles.modal_overlay} onMouseDown={onClose}>
            <div className={styles.create_user_box} onMouseDown={e => e.stopPropagation()}>
                <button className={styles.modal_close_button} onClick={onClose}>×</button>

                <div className={styles.song_popup_content}>
                    <img
                        className={styles.song_popup_image}
                        src={song.imageUrl}
                        alt={song.title}
                        onError={e => { (e.target as HTMLImageElement).src = "/placeholder_icon.png" }}
                    />

                    <div className={styles.song_popup_details}>
                        <div className={styles.song_popup_title}>{song.title}</div>

                        <div className={styles.song_popup_row}>
                            <span className={styles.song_popup_label}>Artist</span>
                            <span className={styles.song_popup_value}>{song.artist}</span>
                        </div>
                        <div className={styles.song_popup_row}>
                            <span className={styles.song_popup_label}>Genre</span>
                            <span className={styles.song_popup_value}>{song.genre}</span>
                        </div>
                        <div className={styles.song_popup_row}>
                            <span className={styles.song_popup_label}>Year</span>
                            <span className={styles.song_popup_value}>{song.year}</span>
                        </div>
                        {(song as any).album && (
                            <div className={styles.song_popup_row}>
                                <span className={styles.song_popup_label}>Album</span>
                                <span className={styles.song_popup_value}>{(song as any).album}</span>
                            </div>
                        )}
                        {(song as any).duration && (
                            <div className={styles.song_popup_row}>
                                <span className={styles.song_popup_label}>Duration</span>
                                <span className={styles.song_popup_value}>{(song as any).duration}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongPopup

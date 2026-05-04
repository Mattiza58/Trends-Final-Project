import { FirestoreUserProfile } from "../types"
import styles from "./maintext.module.css"

interface UserProfilePopupProps {
    profile: FirestoreUserProfile
    onClose: () => void
}

const UserProfilePopup = ({ profile, onClose }: UserProfilePopupProps) => {
    return (
        <div className={styles.modal_overlay} onMouseDown={onClose}>
            <div className={styles.create_user_box} onMouseDown={e => e.stopPropagation()}>
                <button className={styles.modal_close_button} onClick={onClose}>×</button>

                <div className={styles.song_popup_content}>
                    <img
                        className={styles.user_popup_avatar}
                        src={profile.pictureUrl || "/placeholder_icon.png"}
                        alt={profile.firstName}
                        onError={e => { (e.target as HTMLImageElement).src = "/placeholder_icon.png" }}
                    />

                    <div className={styles.song_popup_details}>
                        <div className={styles.song_popup_title}>
                            {profile.firstName} {profile.lastName}
                        </div>
                        <div style={{ marginTop: "-0.5rem", marginBottom: "0.5rem" }}>
                            <span style={{ fontFamily: "Be Vietnam Pro, sans-serif", color: "#999", fontSize: "0.95rem" }}>
                                @{profile.username}
                            </span>
                        </div>

                        {profile.location && (
                            <div className={styles.song_popup_row}>
                                <span className={styles.song_popup_label}>Location</span>
                                <span className={styles.song_popup_value}>{profile.location}</span>
                            </div>
                        )}
                        {profile.experience && (
                            <div className={styles.song_popup_row}>
                                <span className={styles.song_popup_label}>Experience</span>
                                <span className={styles.song_popup_value}>{profile.experience} years</span>
                            </div>
                        )}
                        {profile.instruments && profile.instruments.length > 0 && (
                            <div className={styles.song_popup_row} style={{ alignItems: "flex-start" }}>
                                <span className={styles.song_popup_label} style={{ paddingTop: "0.2rem" }}>Instruments</span>
                                <div className={styles.user_popup_tags}>
                                    {profile.instruments.map(inst => (
                                        <span key={inst} className={styles.user_popup_tag}>{inst}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {profile.genres && profile.genres.length > 0 && (
                            <div className={styles.song_popup_row} style={{ alignItems: "flex-start" }}>
                                <span className={styles.song_popup_label} style={{ paddingTop: "0.2rem" }}>Genres</span>
                                <div className={styles.user_popup_tags}>
                                    {profile.genres.map(genre => (
                                        <span key={genre} className={styles.user_popup_tag}>{genre}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfilePopup

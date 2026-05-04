import { useRef } from "react";
import styles from "./maintext.module.css"
import { UserProps } from "../types.ts";

const ProfileCard = (props: UserProps) =>{
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && props.onPictureChange) {
            props.onPictureChange(file);
        }
        e.target.value = "";
    };

    return <div className={styles.profile_card_container}>
        <div className={styles.card_container}>
            <div className={styles.profile_image_wrapper}>
                <img
                    src={props.pictureUrl || "/placeholder_icon.png"}
                    className={styles.profile_image}
                    onError={e => { (e.target as HTMLImageElement).src = "/placeholder_icon.png" }}
                />
                <img
                    src="/edit_pfp_icon.png"
                    className={styles.edit_pfp_icon}
                    alt="Edit profile picture"
                    onClick={() => fileInputRef.current?.click()}
                />
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </div>
            <div style = {{fontFamily: "Be Vietnam Pro, sans-serif",  
                padding: "10px", fontSize: "1.25rem", margin: "10px"}}>
                {props.name}<br></br>
                <div style = {{paddingTop: "5px", fontSize: "1rem"}}>
                    {props.user_name}
                </div>
                <div style = {{paddingTop: "10px", fontSize: "0.9rem"}}>
                <b>{props.followers}</b> Followers <b>{props.following}</b> Following
                </div>
            </div>
            <button className = {styles.edit_profile_button} onClick={props.onEditClick}>
                Edit Profile
            </button>
            <ul style = {{fontFamily: "Be Vietnam Pro, sans-serif"}}>
                <li>
                    {props.location}
                </li>
                <li>
                    {props.instruments}
                </li>
                <li>
                    {props.genres}
                </li>
                <li>
                    {props.yrs_experience}
                </li>
            </ul>
        </div>
        <div className={styles.profile_right_panel}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                <div className={styles.section_header} style={{ marginBottom: 0 }}>Latest Music</div>
                <button className={styles.search_result_add}>+</button>
            </div>
            <div className={styles.song_card_row}>
                {(props.songs ?? []).slice(0, 3).map((song, i) => (
                    <div key={i} className={styles.song_card_item}>
                        {song.imageUrl ? (
                            <img
                                className={styles.album_image}
                                src={song.imageUrl}
                                alt={song.title}
                                onError={e => { (e.target as HTMLImageElement).src = "/placeholder_icon.png" }}
                            />
                        ) : (
                            <div className={styles.song_card_placeholder}>
                                <span className={styles.song_card_note}>&#9835;</span>
                            </div>
                        )}
                        <div className={styles.album_info}>
                            <p className={styles.album_title}>{song.title}</p>
                            <p className={styles.album_artist}>{song.artist}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", marginTop: "2.5rem" }}>
                <div className={styles.section_header} style={{ marginBottom: 0 }}>Bands</div>
                <button className={styles.search_result_add}>+</button>
            </div>
            <div className={styles.band_row}>
                {(props.bands ?? []).slice(0, 3).map((band, i) => (
                    <div key={i} className={styles.band_item}>
                        {band.imageUrl ? (
                            <img
                                className={styles.band_circle_img}
                                src={band.imageUrl}
                                alt={band.name}
                                onError={e => { (e.target as HTMLImageElement).src = "/placeholder_icon.png" }}
                            />
                        ) : (
                            <div className={styles.band_circle} />
                        )}
                        <p className={styles.band_name}>{band.name}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

// const getCalendar = (()=>{

// })

export default ProfileCard
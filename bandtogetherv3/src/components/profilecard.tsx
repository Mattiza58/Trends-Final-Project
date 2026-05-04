import styles from "./maintext.module.css"
import { UserProps } from "../types.ts";

const ProfileCard = (props: UserProps) =>{
    return <div className={styles.profile_card_container}>
        <div className={styles.card_container}>
            <img src = "/placeholder_icon.png" className={styles.profile_image}>
            </img>
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
            <div className={styles.section_header}>Latest Music</div>
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

            <div className={styles.section_header} style={{ marginTop: "2.5rem" }}>Bands</div>
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
import styles from "./maintext.module.css"

interface UserProps{
    name: string;
    user_name: string;
    followers: number;
    following: number;
    location: string;
    instruments: string;
    genres: string;
    yrs_experience: string
} 

const ProfileCard = ({name, user_name, followers, following, location, instruments, genres, yrs_experience}: UserProps) =>{
    return <div className={styles.profile_card_container}>
        <div className={styles.card_container}>
            <img src = "/placeholder_icon.png" className={styles.profile_image}>
            </img>
            <div style = {{fontFamily: "Be Vietnam Pro, sans-serif",  
                padding: "10px", fontSize: "1.25rem", margin: "10px"}}>
                {name}<br></br>
                <div style = {{paddingTop: "5px", fontSize: "1rem"}}>
                    {user_name}
                </div>
                <div style = {{paddingTop: "10px", fontSize: "0.9rem"}}>
                <b>{followers}</b> Followers <b>{following}</b> Following
                </div>
            </div>
            <button className = {styles.edit_profile_button}>
                Edit Profile
            </button>
            <ul style = {{fontFamily: "Be Vietnam Pro, sans-serif"}}>
                <li>
                    {location}
                </li>
                <li>
                    {instruments}
                </li>
                <li>
                    {genres}
                </li>
                <li>
                    {yrs_experience}
                </li>
            </ul>
        </div>
        <div className={styles.card_container}>
            Upcoming Shows
        </div>
    </div>
}

export default ProfileCard
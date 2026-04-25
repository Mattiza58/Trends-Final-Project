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
            <div style = {{fontFamily: "Be Vietnam Pro, sans-serif", fontSize: "30px"}}>
                <b>Latest Music</b>
            </div>
            <div style = {{paddingTop: "20px"}}>
            {/* NOTE: The iframe is just a placeholder and not the intended functionality */}
            <iframe width="560" height="315" src="https://www.youtube.com/embed/RlNhD0oS5pk?si=I6iymzVYQ3Kkl5kq" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
    </div>
}

// const getCalendar = (()=>{

// })

export default ProfileCard
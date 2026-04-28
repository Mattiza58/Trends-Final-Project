import styles from "./maintext.module.css"
import {UserProps} from "../types.ts";

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
            <button className = {styles.edit_profile_button}>
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
import styles from "./maintext.module.css"

interface UserProps{
    name: string;
    user_name: string;
} 

const ProfileCard = ({name, user_name}: UserProps) =>{
    return <div className={styles.profile_card_container}>
        <div className={styles.card_container}>
            <div className={styles.profile_image}>
            </div>
            <div style = {{fontFamily: "Be Vietnam Pro, sans-serif",  
                padding: "10px", fontSize: "1.25rem", margin: "10px"}}>
                {name}<br></br>
                <div style = {{fontFamily: "Be Vietnam Pro, sans-serif", paddingTop: "5px", fontSize: "1rem"}}>
                    {user_name}
                </div>
            </div>
            <button className = {styles.edit_profile_button}>
                Edit Profile
            </button>
            <ul>
                <li>
                    <div style = {{gap: "10px"}}>
                        <img src ="/location_icon.png" style = {{display: "inline", width: "15px"}}></img>
                        hello
                    </div>
                </li>
                <li>
                    hi
                </li>
                <li>
                    hi
                </li>
                <li>
                    hi
                </li>
            </ul>
        </div>
        <div className={styles.card_container}>
            hi
        </div>
    </div>
}

export default ProfileCard
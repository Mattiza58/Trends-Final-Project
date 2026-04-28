import styles from "./maintext.module.css"

const UserCreation = (() =>{
    return <div className = {styles.splash_screen_sign_up}>
        <div style = {{position: "absolute", bottom: 0, left: -40, zIndex: 1}}>
            <img src = "../guitar_icon.png"></img>
        </div>
        <div style = {{position: "absolute", bottom: 0, right: 0, zIndex: 1}}>
            <img  src = "../drums_icon.png"></img>
        </div>
        <div className = {styles.create_user_box}>
            <div className = {styles.user_details_container}>
                <div className = {styles.create_user_maintext}>
                    Sign-Up 
                </div>
                <div className = {styles.basic_details_col}>
                    <form>
                        <ul className = {styles.basic_details_list}>
                            <li><label> First Name: </label><input type = "text"></input></li>
                            <li><label> Last Name: </label><input type = "text"></input></li>
                            <li><label> Username: </label><input type = "text"></input></li>
                            <li><label> Age: </label><input type = "text"></input></li>
                            <li><label> Gender: </label><input type = "text"></input></li>
                            <li><label> Location: </label><input type = "text"></input></li>
                        </ul>
                    </form>
                </div>
                <div className = {styles.music_details_col}>
                    <ul className = {styles.basic_details_list}>
                        <li><label> Instruments: </label><input type = "text"></input></li>
                        <li><label> Years of Experience: </label><input type = "text"></input></li>
                        <li><label> Perferred Genres: </label><input type = "text"></input></li>
                    </ul>
                </div>
            </div>
            <div style = {{
                display: "flex",
                justifyContent: "right",
                width: "inherit"
            }}>
                <button className = {styles.submit_button}>
                        Submit
                </button>
            </div>
        </div>
        
    </div>
})

export default UserCreation;
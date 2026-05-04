import { Link } from "react-router-dom";
import styles from "./maintext.module.css"
import { useAuth } from "../context/AuthContext"


const MainText = (() =>{
    const { user } = useAuth();
    return <div className={user ? styles.maintext2_centered : styles.maintext2}>
        <div>
            <img className = {styles.logo} src = "../../public/logo.png"></img>
        </div>
        <div className = {styles.sign_up_box}>
            Ready to form the band of your <b>dreams</b>?
            <br>
            </br>
            <br>
            </br>
            {!user && <u><b><Link to = "/sign_in">Sign up now</Link></b></u>}
            {/* <img src = "../../public/arrowtext.png" style = {{position: "absolute", width: "10%", paddingTop:"80px", paddingLeft: "50px"}}></img> */}
        </div>
    </div>
})

export default MainText;
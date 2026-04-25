import {Link} from "react-router-dom"
import styles from "./maintext.module.css"
import { useAuth } from "../context/AuthContext"


const NavBar = (()=>{
const {user, signOut} = useAuth();

    return  <nav>
        <div>
            <Link to = "/">
            <img src = "../../public/logo(small)v2.png" className = {styles.small_logo}>
            </img>
            </Link>
        </div>
        <ul>
            <li>
                <Link to = "/profile">Profile</Link>
            </li>
            <li>
                <Link to = "/performances">Perfomances</Link>
            </li>
            <li>
                <Link to ="/connect" >Connect</Link>
            </li>
            <li>
                <Link to = "/music">Music</Link>
            </li>
            <li className = {styles.other_li}>
                {user ? <button className ={styles.login_button} onClick = {signOut}>
                    Log Out
                </button> : <Link to = "/sign_in" style = {{margin: "0", padding: "0"}}> <button className ={styles.login_button}>
                    Login 
                </button> </Link>}                
            </li>
        </ul>
    </nav>
})



export default NavBar;
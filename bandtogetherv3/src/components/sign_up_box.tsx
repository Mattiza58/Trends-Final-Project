import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signInWithGoogle } from "../firebase";
import styles from "./maintext.module.css"
import GoogleButton from "react-google-button";

const SignUpBox = (() =>{
const { user } = useAuth(); 
  const navigate = useNavigate();

  // The safest way to handle the redirect without TypeScript errors
  useEffect(() => {
    if (user) {
      // If 'user' populates, they successfully logged in. Redirect them!
      navigate("/profile");
    }
  }, [user, navigate]);


    return <div className = {styles.splash_screen}>
        <div className = {styles.login_box}>
            <b>Sign-Up / Log-In</b>
            <GoogleButton onClick = {signInWithGoogle}/>
        </div>
    </div>

})

export default SignUpBox;
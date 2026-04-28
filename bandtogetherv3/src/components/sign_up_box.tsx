import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signInWithGoogle } from "../firebase";
import styles from "./maintext.module.css"
import GoogleButton from "react-google-button";
import SplashScreen from "./splashScreen";

const SignUpBox = (() =>{
const { user } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);


    return <div>
     <SplashScreen />
        <div className = {styles.login_box}>
            <b>Sign-Up</b>
            <GoogleButton onClick = {signInWithGoogle}/>
        </div>
    </div>


})

export default SignUpBox;
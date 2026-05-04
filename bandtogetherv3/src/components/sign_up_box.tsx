import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signInWithGoogle, signUpWithEmail, signInWithEmail } from "../firebase";
import styles from "./maintext.module.css"
import GoogleButton from "react-google-button";
import SplashScreen from "./splashScreen";

const SignUpBox = (() => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            const pendingUid = sessionStorage.getItem('pendingProfileSetup');
            navigate(pendingUid === user.uid ? "/create_user" : "/profile");
        }
    }, [user, navigate]);

    const handleSubmit = async () => {
        setError("");
        try {
            if (isSignIn) {
                await signInWithEmail(email, password);
            } else {
                await signUpWithEmail(email, password);
            }
        } catch (e) {
            setError(e instanceof Error ? e.message.replace("Firebase: ", "") : "Something went wrong.");
        }
    };

    return <div>
        <SplashScreen />
        <div className={styles.login_box}>
            <b>Sign-Up</b>
            <GoogleButton onClick={signInWithGoogle} />

            {!showEmailForm ? (
                <span
                    style={{ fontFamily: "Be Vietnam Pro, sans-serif", fontSize: "0.85rem", color: "#555", cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => setShowEmailForm(true)}
                >
                    or continue with email
                </span>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%", boxSizing: "border-box" }}>
                    <input
                        className={styles.modern_input}
                        style={{ width: "100%", boxSizing: "border-box" }}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        className={styles.modern_input}
                        style={{ width: "100%", boxSizing: "border-box" }}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {error && <span style={{ fontFamily: "Be Vietnam Pro, sans-serif", fontSize: "0.78rem", color: "red" }}>{error}</span>}
                    <button className={styles.submit_button} style={{ width: "100%", borderRadius: "10px" }} onClick={handleSubmit}>
                        {isSignIn ? "Sign In" : "Sign Up"}
                    </button>
                    <span
                        style={{ fontFamily: "Be Vietnam Pro, sans-serif", fontSize: "0.82rem", color: "#555", cursor: "pointer", textAlign: "center" }}
                        onClick={() => setIsSignIn(v => !v)}
                    >
                        {isSignIn ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </span>
                </div>
            )}
        </div>
    </div>
})

export default SignUpBox;

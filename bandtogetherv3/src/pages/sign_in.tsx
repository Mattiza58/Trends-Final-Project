import GoogleButton from 'react-google-button';
import { signInWithGoogle } from '../firebase';

const SignIn = (()=>{
    return <div style = {{display: "block"}}>
        <div style = {{justifySelf: "center", marginTop: "100px"}}>
            <GoogleButton onClick = {signInWithGoogle}/>
            <label> UserName</label>
            <input type = "text"></input>
            <input type = "text"></input>
            <button>
                sign up
            </button>
        </div>
    </div>
})

export default SignIn;
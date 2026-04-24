import styles from "./maintext.module.css"


const MainText = (() =>{
    return <div className= {styles.maintext2}>
        <div>
            <img className = {styles.logo} src = "../../public/logo.png"></img>
        </div>
        <div className = {styles.sign_up_box}>
            Ready to form the band of your <b>dreams</b>?
            <br>
            </br>
            <br>
            </br>
            <u><b>Sign up now</b></u>
            {/* <img src = "../../public/arrowtext.png" style = {{position: "absolute", width: "10%", paddingTop:"80px", paddingLeft: "50px"}}></img> */}
        </div>
    </div>
})

export default MainText;
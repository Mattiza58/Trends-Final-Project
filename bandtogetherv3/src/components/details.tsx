import styles from "./maintext.module.css"

const Details = (()=> {
    return <div className ={styles.container}>
        <div>
            <img className= {styles.img1} src = "/public/bandgraphic.png" ></img>
        </div>
        <div style = {{padding: "10px", lineHeight: "1.75"}}>
            <b>In need of a band? A jam partner? Or looking to share your music? </b>
            <br>
            </br>
            <br>
            {/* NOTE: I just used dummy text just to see how it would look like */}
            </br>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
    </div>
})

export default Details
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
            </br>
            With BandTogether, create a profile and connect with other musicians. Share what instruments you play and what genres you love! Add upcoming song relseases, tour dates, anything you can imagine. A platform that connects your potential to others, because it takes more than one person to band together.
        </div>
    </div>
})

export default Details
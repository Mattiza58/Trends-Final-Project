import styles from "./maintext.module.css"
import placeholder from "../assets/placeholder2.png"

const CenterDesign = (() =>{

    return <div className={styles.imagecontainer}>
        <a href = "https://www.youtube.com/watch?v=xbhCPt6PZIU&list=RDxbhCPt6PZIU&start_radio=1" target = "_blank">
        <img src = {placeholder} alt = "Led Zeppelin" className = {styles.mainimage}></img>
        </a>
    </div>
})

export default CenterDesign;
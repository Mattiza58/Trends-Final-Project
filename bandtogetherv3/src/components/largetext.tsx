import styles from "./maintext.module.css"

interface textProps {
    link: string;
}

const LargeText = (({link}: textProps) =>{
    return <div className = {styles.large_text}>
        {link}
    </div>
})

export default LargeText
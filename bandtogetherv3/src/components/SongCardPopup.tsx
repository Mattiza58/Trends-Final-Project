import { FC, ReactNode } from "react"
import styles from "./maintext.module.css"

interface SongCardPopupProps {
    onClose: () => void
    children: ReactNode
}

const SongCardPopup: FC<SongCardPopupProps> = ({ onClose, children }) => {
    return (
        <div className={styles.modal_overlay} onMouseDown={onClose}>
            <div className={styles.create_user_box} onMouseDown={e => e.stopPropagation()}>
                <button className={styles.modal_close_button} onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    )
}

export default SongCardPopup

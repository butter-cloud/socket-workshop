import styles from './AnimalCross.module.scss'
import {useState} from "react";

export const AnimalCross = () => {
    const [isMailBoxOpen, setIsMailBoxOpen] = useState(false);

    const openMessageSender = () => {
        window.open("/sse/send", "messageSender", "left=500, top=40, width=430, height=650")
    }

    return(
        <>
            <img className={styles.logo} src={'/leaf.png'}  alt={'leaf-logo'}/>
            <div className={styles.flexBackground}></div>
            <div className={styles.messageCountContainer} onClick={()=>{setIsMailBoxOpen(true)}}>
                <span>3</span>
            </div>

            <div className={styles.messageSender} onClick={openMessageSender}></div>
            {
                isMailBoxOpen &&
                <div className={styles.mailBox}>mailbox
                    <div className={styles.closeButton} onClick={()=>{setIsMailBoxOpen(false)}}>❌</div>
                </div>
            }

        </>
    )
}

export default AnimalCross
import styles from './SseMessageSender.module.scss'
import axios from "axios";
import {useState} from "react";
import {useSelector} from "react-redux";

export const SseMessageSender = () => {
    const [recipient, setRecipient] = useState(null)
    const [message, setMessage] = useState(null)

    const username = useSelector((state) => state.user.username);

    const sendMessage = () => {
        const data = {
            "sender" : "test",
            "recipient": recipient,
            "message": message,
        }
        axios.post(`/sse/send`, data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
            .finally(
                window.close()
            )
    }

    const handleRecipientChange = (e) => {
        setRecipient(e.target.value)
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }

    return (
        <>
            <div className={styles.sseMessageSenderContainer}>
                <span>🏘️ 보내는사람</span>
                <span><strong>{username}</strong></span>
                <span>🏝️ 받는사람</span>
                <input onChange={handleRecipientChange}/>
                <span>메세지</span>
                <textarea onChange={handleMessageChange}/>
                <button onClick={sendMessage}>✉️ 보내기!</button>
            </div>
        </>
    )
}

export default SseMessageSender
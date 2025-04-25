import styles from './AnimalCross.module.scss'
import {useEffect, useState} from "react";

export const AnimalCross = () => {
    const [isMailBoxOpen, setIsMailBoxOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentMessageOrder, setCurrentMessageOrder] = useState(0);
    const username = 'test'

    useEffect(() => {
        console.log("working?")
        const eventSource = new EventSource(`http://localhost:8080/sse/subscribe?username=${username}`)

        eventSource.onopen = () => {
            console.log("🌴🌴🌴🌴🌴🌴🌴 연결되었습니다")
        }

        eventSource.onmessage = (event) => {
            console.log("📩 메세지가 도착했습니다 - ", event.data)
            setMessages((prev) => [...prev, `📩 ${event.data}`])
        }

        eventSource.addEventListener("connect", (event) => {
            console.log("🔔 커넥트 이벤트:", event.data);
        });

        eventSource.addEventListener("stream", (event) => {
            console.log("📈 스트림 메세지가 도착했습니다 - ", event.data)
            setMessages((prev) => [...prev, `📈 ${event.data}`])
        })

        eventSource.onerror = (err) => {
            console.error("❌ SSE 오류 발생:", err);
            eventSource.close();
        };
    }, [])

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
                <div className={styles.mailBox}>
                    <div>{messages[currentMessageOrder]}</div>
                    <div className={styles.buttonContainer}>
                        <span
                            className={currentMessageOrder === 0 ? styles.disabledButton : ''}
                            onClick={()=>{setCurrentMessageOrder((prev) => prev - 1)}}
                        >◀️
                        </span>
                        <span
                            className={currentMessageOrder === messages.length - 1? styles.disabledButton : ''}
                            onClick={()=>{setCurrentMessageOrder((prev) => prev + 1)}}
                        >▶️️
                        </span>
                    </div>

                    <div className={styles.closeButton} onClick={()=>{setIsMailBoxOpen(false)}}>❌</div>
                </div>
            }
        </>
    )
}

export default AnimalCross
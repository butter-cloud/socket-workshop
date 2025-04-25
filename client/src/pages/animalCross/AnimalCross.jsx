import styles from './AnimalCross.module.scss'
import {useEffect, useState} from "react";
import UsernameModal from "../../components/UsernameModal";
import {useSelector} from "react-redux";
import Setting from "../../components/Setting";

export const AnimalCross = () => {
    const [isUsernameOpen, setIsUsernameOpen] = useState(false);
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const [isMailBoxOpen, setIsMailBoxOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentMessageOrder, setCurrentMessageOrder] = useState(0);
    const username = useSelector((state) => state.user.username);

    useEffect(() => {
        if (username.trim().length < 1) {
            setIsUsernameOpen(true)
        } else {
            connectSse(username)
        }
    }, [])

    const connectSse = (emitterKey) => {
        const eventSource = new EventSource(`http://localhost:8080/sse/subscribe?username=${emitterKey}`)

        eventSource.onopen = () => {
            console.log("🌴🌴🌴🌴🌴🌴🌴 연결되었습니다")
        }

        eventSource.onmessage = (event) => {
            console.log("📩 메세지가 도착했습니다 - ", event.data)
            setMessages((prev) => [...prev, `${event.data}`])
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
    }

    const openMessageSender = () => {
        window.open("/sse/send", "messageSender", "left=500, top=40, width=430, height=650")
    }

    const handleCloseMailBox = () => {
        setIsMailBoxOpen(false)
        setCurrentMessageOrder(0)
    }

    return(
        <>
            <img className={styles.logo} src={'/leaf.png'}  alt={'leaf-logo'} onClick={()=>{setIsSettingOpen(true)}}/>
            <div className={styles.flexBackground}></div>
            <div className={`${styles.messageCountContainer} ${messages.length === 0 ? styles.empty : ''}`}
                 onClick={()=>{setIsMailBoxOpen(true)}}
            >
                <span>{messages.length}</span>
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
                            className={currentMessageOrder === messages.length - 1 || messages.length === 0 ? styles.disabledButton : ''}
                            onClick={()=>{setCurrentMessageOrder((prev) => prev + 1)}}
                        >▶️️
                        </span>
                    </div>

                    <div className={styles.closeButton} onClick={handleCloseMailBox}>❌</div>
                </div>
            }
            {isUsernameOpen && <UsernameModal setIsUsernameOpen={setIsUsernameOpen} connectSse={connectSse}/>}
            {isSettingOpen && <Setting setIsSettingOpen={setIsSettingOpen} setIsUsernameOpen={setIsUsernameOpen}/> }
        </>
    )
}

export default AnimalCross
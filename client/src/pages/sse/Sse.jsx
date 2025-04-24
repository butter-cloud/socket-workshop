import {useState} from "react";
import styles from "./Sse.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {setUsername} from "../../redux/userSlice";

export const Sse = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    const dispatch = useDispatch();
    const username = useSelector((state) => state.user.username);

    const subscribeSse = () => {
        const eventSource = new EventSource(`http://localhost:8080/sse/subscribe?username=${username}`)

        eventSource.onopen = () => {
            console.log("🌴🌴🌴🌴🌴🌴🌴 연결되었습니다")
            setIsConnected(true)
        }

        eventSource.onmessage = (event) => {
            console.log("📩 메세지가 도착했습니다 - ", event.data)
            setMessages((prev) => [...prev, event.data])
        }

        eventSource.addEventListener("connect", (event) => {
            console.log("🔔 커넥트 이벤트:", event.data);
        });

        eventSource.onerror = (err) => {
            console.error("❌ SSE 오류 발생:", err);
            eventSource.close();
        };
    }

    const handleUsernameChange = (e) => {
        dispatch(setUsername(e.target.value))
    }

    const openMessageSender = () => {
        window.open("/sse/send", "messageSender", "left=500, top=40, width=390, height=650")
    }

    return (
        <>
            <div className={styles.sseSendContainer}>

                <h2>SSE Messages</h2>
                {isConnected? <span>username: <strong>{username}</strong></span> :
                    <input
                        value={username}
                        onChange={handleUsernameChange}
                    />
                }
                {messages.map((msg, idx) => (
                    <div key={`container_${idx}`}><span key={idx}>📩 {msg}</span><br key={`br_${idx}`}/></div>
                ))}
            </div>
            <button onClick={subscribeSse}>Click to connect!</button>
            <br/>
            <button onClick={openMessageSender}>🌴 메세지 보내기</button>
        </>
    )
}
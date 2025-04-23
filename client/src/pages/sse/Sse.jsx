import {useState} from "react";

export const Sse = () => {
    const [messages, setMessages] = useState([]);

    const subscribeSse = () => {
        const username = "hey"
        const eventSource = new EventSource(`http://localhost:8080/sse/subscribe?username=${username}`)

        eventSource.onopen = () => {
            console.log("🌴🌴🌴🌴🌴🌴🌴 연결되었습니다")
        }

        eventSource.onmessage = (event) => {
            console.log("📩 메세지가 도착했습니다 - ", event.data)

        }

        eventSource.addEventListener("connect", (event) => {
            console.log("🔔 커넥트 이벤트:", event.data);
        });

        eventSource.onerror = (err) => {
            console.error("❌ SSE 오류 발생:", err);
            eventSource.close();
        };
    }
    return (
        <>
            <div>
                <h2>SSE Messages</h2>
                <ul>
                    {messages.map((msg, idx) => (
                        <li key={idx}>{msg}</li>
                    ))}
                </ul>
            </div>
            <button onClick={subscribeSse}>Click to connect!</button>
        </>
    )
}
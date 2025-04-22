import {useEffect, useRef, useState} from "react";

const Chat = () => {
    const roomId = "room1"
    const defaultName = "익명"

    const socketRef = useRef(null);
    const [nickname, setNickname] = useState(defaultName);
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([]);

    const emojis = ["🍎", "🍋‍🟩", "🍒", "🍑", "🍈", "🍍", "🍋", "🍅", "🥑", "🌽", "🥕", "🌴"]
    const phrases = ["반가워", "안녕안녕", "우와", "안녕하세요"]

    useEffect(() => {
        const savedNickname = localStorage.getItem("nickname");
        if (savedNickname) {
            setNickname(savedNickname);
        }

        if (!socketRef.current) {
            const socket = new WebSocket(`ws://192.168.0.3:8080/ws/chat?roomId=${roomId}`);
            socketRef.current = socket;

            socket.onopen = () => {
                const sender = savedNickname.length > 0 ? savedNickname : defaultName
                const data = {
                    sender: sender,          // setNickname 세팅 전이므로
                    content: "안녕! 나 들어왔어"
                }
                socket.send(JSON.stringify(data));
            };

            socket.onmessage = (event) => {
                const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
                console.log(`${randomEmoji} message : ${event.data}`);
                setMessages((prev) => [...prev, randomEmoji + event.data]);
            };

            socket.onclose = () => {
                console.log("❌ 연결 종료");
            };

            return () => {
                // 연결된 socket이 있을때만 close
                if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                    socket.close();
                }
            };
        }
    }, [])

    const sendMessage = () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            const data = {
                sender: nickname,
                content: message
            }
            socketRef.current.send(JSON.stringify(data));
            setMessage("")
        }
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value)
    }

    const closeConnection = () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.close();
        }
        window.close();
    }

    return (
        <>
            <h2>💬 채팅 페이지</h2>
            <h3>{nickname && `${nickname} 님 안녕하세요`}</h3>

            <div>
                {messages.map((msg, i) => (
                    <p key={i}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={handleInputChange}
                placeholder="메세지를 입력하세요"
            />
            <button onClick={sendMessage} disabled={!message.length > 0}>메시지 보내기</button>
            <button onClick={closeConnection}>채팅 종료하기</button>
        </>
    )
}

export default Chat
import {useEffect, useRef, useState} from "react";

const Chat = () => {
    const roomId = "room1"
    const defaultName = "익명"

    const socketRef = useRef(null);
    const [nickname, setNickname] = useState(defaultName);
    const [messages, setMessages] = useState([]);

    const emojis = ["🍎", "🍋‍🟩", "🍒", "🍑", "🍈", "🍍", "🍋", "🍅", "🥑", "🌽", "🥕", "🌴"]
    const phrases = ["반가워", "안녕안녕", "우와", "안녕하세요"]

    useEffect(() => {
        const savedNickname = localStorage.getItem("nickname");
        if (savedNickname) {
            setNickname(savedNickname);
        }

        if (!socketRef.current) {
            const socket = new WebSocket(`ws://localhost:8080/ws/chat?roomId=${roomId}`);
            socketRef.current = socket;

            socket.onopen = () => {
                const sender = savedNickname.length > 0 ? savedNickname : defaultName
                const message = {
                    sender: sender,          // setNickname 세팅 전이므로
                    content: "안녕! 나 들어왔어"
                }
                socket.send(JSON.stringify(message));
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
            const randomPhrases = phrases[Math.floor(Math.random() * phrases.length)]
            const message = {
                sender: nickname,
                content: randomPhrases
            }
            socketRef.current.send(JSON.stringify(message));
        }
    };

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
            <button onClick={sendMessage}>메시지 보내기</button>
            <div>
                {messages.map((msg, i) => (
                    <p key={i}>{msg}</p>
                ))}
            </div>
            <button onClick={closeConnection}>채팅 종료하기</button>
        </>
    )
}

export default Chat
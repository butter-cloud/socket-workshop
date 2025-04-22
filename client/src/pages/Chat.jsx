import {useEffect, useRef, useState} from "react";

const Chat = () => {
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);

    const emojis = ["🍎", "🍋‍🟩", "🍒", "🍑", "🍈", "🍍", "🍋", "🍅", "🥑", "🌽", "🥕", "🌴"]

    useEffect(() => {
        if (!socketRef.current) {
            const roomId = "room1";
            const socket = new WebSocket(`ws://localhost:8080/ws/chat?roomId=${roomId}`);
            socketRef.current = socket;

            socket.onopen = () => {
                socket.send("안녕! 나 들어왔어");
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
            socketRef.current.send("반가워");
        }
    };

    const closeConnection = () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.close();
        }
    }

    return (
        <>
            <h2>💬 채팅 페이지</h2>
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
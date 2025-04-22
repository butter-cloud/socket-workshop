import {useState} from "react";

export const Home = () => {
    const [nickname, setNickname] = useState("");

    const handleInputChange = (e) => {
        setNickname(e.target.value);
    };

    const openChat = () => {
        localStorage.setItem("nickname", nickname);
        setNickname("");
        window.open("/chat", "chatWindow", "left=100, top=10, width=400, height=700")
    }

    return(
        <>
            <p>닉네임을 입력하세요</p><br/>
            <input
                type="text"
                value={nickname}
                onChange={handleInputChange}
                placeholder="닉네임 입력"
            />
            <button onClick={openChat}>채팅 시작하기</button>
        </>
    )
}

export default Home
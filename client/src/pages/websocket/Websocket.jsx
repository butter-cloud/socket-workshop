import {useState} from "react";
import styles from "./Websocket.module.scss";

export const Websocket = () => {
    const [nickname, setNickname] = useState("");

    const handleInputChange = (e) => {
        setNickname(e.target.value);
    };

    const openChat = () => {
        localStorage.setItem("nickname", nickname.trim());
        setNickname("");
        window.open("/websocket/chat", "chatWindow", "left=100, top=10, width=400, height=700")
    }

    return(
        <>
            <div className={styles.container}>
                <p className={styles.title}>🌴 닉네임을 입력해주세요</p>
                <input
                    type="text"
                    value={nickname}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="nickname"
                />
                <button className={styles.button} onClick={openChat}>
                    채팅 시작하기
                </button>
            </div>
        </>
    )
}

export default Websocket
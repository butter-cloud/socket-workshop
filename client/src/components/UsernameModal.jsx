import {useDispatch} from "react-redux";
import styles from './UsernameModal.module.scss'
import {setUsername} from "../redux/userSlice";
import {useState} from "react";

export const UsernameModal = ({setIsUsernameOpen, connectSse}) => {
    const dispatch = useDispatch();
    const [inputUsername, setInputUsername] = useState("")

    const handleConfirm = () => {
        dispatch(setUsername(inputUsername))
        setIsUsernameOpen(false)
        console.log(`${inputUsername} 으로 SSE 연결을 시도합니다.`)
        connectSse(inputUsername)
    }

    return (
        <>
            <div className={styles.usernameContainer}>
                <span>이름을 입력하세요</span>
                <input
                    value={inputUsername}
                    onChange={(e)=>{setInputUsername(e.target.value)}}
                />
                <button onClick={handleConfirm}>확인</button>
                <span
                    className={styles.closeButton}
                    onClick={() => {setIsUsernameOpen(false)}}
                >❌</span>
            </div>
        </>
    )
}

export default UsernameModal
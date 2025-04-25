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
            </div>
        </>
    )
}

export default UsernameModal
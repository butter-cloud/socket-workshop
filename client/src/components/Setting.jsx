import styles from './Setting.module.scss'
import {useSelector} from "react-redux";

export const Setting = ({setIsSettingOpen, setIsUsernameOpen}) => {
    const username = useSelector((state) => state.user.username);

    const handleChangeName = () => {
        setIsSettingOpen(false);
        setIsUsernameOpen(true);
    }

    return (
        <>
            <div className={styles.settingContainer}>
                Setting
                <span>{`이름: ${username}`}</span>
                <span
                    className={styles.closeButton}
                    onClick={() => {setIsSettingOpen(false)}}
                >❌</span>
                <button onClick={handleChangeName}>이름 바꾸기</button>
            </div>
        </>
    )
}

export default Setting
import {Link} from "react-router";
import styles from "./Home.module.scss"

export const Home = () => {

    return(
        <>
            <div className={styles.container}>
                <Link to={"/websocket"} className={styles.websocketChatLink}>websocket chat</Link>
            </div>
        </>
    )
}

export default Home
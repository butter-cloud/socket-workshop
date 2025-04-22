export const Home = () => {
    const openChat = () => {
        window.open("/chat", "chatWindow", "left=100, top=10, width=400, height=700")
    }

    return(
        <>
            <button onClick={openChat}>채팅 시작하기</button>
        </>
    )
}

export default Home
package com.workshop.socket_workshop.handler;

import com.workshop.socket_workshop.model.ChatMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
// TextWebSocketHandler 는 text message를 처리하는 web socket handler
public class ChatHandler extends TextWebSocketHandler {

    private final Map<String, List<WebSocketSession>> chatRooms = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String roomId = getRoomId(session);
        // chatRooms에 없는 경우에 세션 추가
        chatRooms.computeIfAbsent(roomId, k -> new ArrayList<>()).add(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        log.info("메세지 수신: {}", message.getPayload());
        String roomId = getRoomId(session);

        // 해당 roomId chatRooms에 있는 session에게 메세지 전송
        List<WebSocketSession> sessions = chatRooms.get(roomId);
        if (sessions != null) {
            for (WebSocketSession s : sessions) {
                s.sendMessage(new TextMessage("server: " + message.getPayload()));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        String roomId = getRoomId(session);
        chatRooms.getOrDefault(roomId, new ArrayList<>()).remove(session);
    }

    private String getRoomId(WebSocketSession session) {
        return session.getUri().getQuery().replace("roomId=", "");
    }
}

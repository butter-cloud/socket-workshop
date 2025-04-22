package com.workshop.socket_workshop.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
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
    private final ObjectMapper objectMapper;

    public ChatHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("session id : {}" , session.getId());
        String roomId = getRoomId(session);
        // 해당 roomId로 chatRooms 리스트가 없는 경우 만들고 session 추가
        chatRooms.computeIfAbsent(roomId, k -> new ArrayList<>()).add(session);
        session.sendMessage(new TextMessage("입장 완료!"));
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);
        log.info("chatMessage : {}", chatMessage);

        // 해당 roomId chatRooms에 있는 session에게 메세지 전달
        String roomId = getRoomId(session);
        List<WebSocketSession> sessions = chatRooms.get(roomId);
        if (sessions != null) {
            for (WebSocketSession s : sessions) {
                s.sendMessage(new TextMessage(chatMessage.getSender() + ": " + chatMessage.getContent()));
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

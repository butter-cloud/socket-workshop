package com.workshop.socket_workshop.controller;

import com.workshop.socket_workshop.model.ChatMessage;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;

@Controller
public class ChatController {

    public void handleMessage(String roomId, ChatMessage message, List<WebSocketSession> sessions) throws IOException {
        for (WebSocketSession session : sessions) {
            session.sendMessage(new TextMessage(
                    message.getSender() + ": " + message.getContent()
            ));
        }
    }
}

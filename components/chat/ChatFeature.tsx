import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button } from "@gluestack-ui/themed";
import { RecursionIcon } from "../RecursionIcon";
import { useAuth } from "../auth/AuthProvider";
import { ChatService } from "../../services/chat/chat.service";
import { ChatGPTService } from "../../services/chat/chatgpt.service";
import { Database } from "../../services/types/database.types";

type Message = Database["public"]["Tables"]["messages"]["Row"];

export function ChatFeature() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (user) {
      loadMessages();
      const subscription = ChatService.onMessagesUpdate(user.id, setMessages);
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user]);

  const loadMessages = async () => {
    if (!user) return;
    try {
      const loadedMessages = await ChatService.getMessages(user.id);
      setMessages(loadedMessages);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !user || isLoading) return;

    setIsLoading(true);
    try {
      // Save user message
      await ChatService.sendMessage(user.id, input, "user");

      // Get ChatGPT response
      const response = await ChatGPTService.getCompletion(
        [
          ...messages.map((msg) => ({ role: msg.type, content: msg.content })),
          { role: "user", content: input },
        ],
        user.id
      );

      // Save bot response
      if (response.message) {
        await ChatService.sendMessage(user.id, response.message, "bot");
      }

      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Messages Area */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.type === "user"
                ? styles.userMessageWrapper
                : styles.botMessageWrapper,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.type === "user"
                  ? styles.userMessage
                  : styles.botMessage,
              ]}
            >
              {message.type === "bot" && (
                <View style={styles.botHeader}>
                  <RecursionIcon />
                  <Text style={styles.botName}>Creordic AI</Text>
                </View>
              )}
              <Text
                style={[
                  styles.messageText,
                  message.type === "user"
                    ? styles.userMessageText
                    : styles.botMessageText,
                ]}
              >
                {message.content}
              </Text>
              <Text
                style={[
                  styles.timestamp,
                  message.type === "user"
                    ? styles.userTimestamp
                    : styles.botTimestamp,
                ]}
              >
                {formatTime(message.timestamp)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          placeholderTextColor="#666"
          multiline
          maxLength={500}
          editable={!isLoading}
        />
        <Text
          style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
          onPress={handleSend}
        >
          Send
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  userMessageWrapper: {
    alignItems: "flex-end",
  },
  botMessageWrapper: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: "#007AFF",
  },
  botMessage: {
    backgroundColor: "#F0F0F0",
  },
  botHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  botName: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: "#FFFFFF",
  },
  botMessageText: {
    color: "#000000",
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  userTimestamp: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  botTimestamp: {
    color: "rgba(0, 0, 0, 0.7)",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "center",
  },
  sendButtonDisabled: {
    color: "#999",
  },
});

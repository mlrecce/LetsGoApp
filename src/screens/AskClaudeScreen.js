import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { trip } from '../content/active';

/**
 * Ask Claude screen — placeholder for an AI chat interface.
 *
 * In a full implementation this would connect to the Claude API
 * with the destination content as context, allowing travellers to
 * ask natural-language questions about their trip.
 */
const AskClaudeScreen = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hi! I'm your travel assistant for ${trip.destination.name}. Ask me anything about your trip — restaurants, directions, local tips, or what to pack.`,
    },
  ]);

  const handleSend = () => {
    if (!query.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: query },
      { role: 'assistant', text: 'Claude API integration coming soon. This is where answers about your trip will appear.' },
    ]);
    setQuery('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <ScrollView
        style={styles.messages}
        contentContainerStyle={styles.messagesList}
      >
        {messages.map((msg, i) => (
          <View
            key={i}
            style={[
              styles.bubble,
              msg.role === 'user' ? styles.userBubble : styles.assistantBubble,
            ]}
          >
            <Text style={[
              styles.bubbleText,
              msg.role === 'user' ? styles.userText : styles.assistantText,
            ]}>
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Ask about your trip..."
          placeholderTextColor="#999"
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>Ask</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  messages: { flex: 1 },
  messagesList: { padding: 16, paddingBottom: 8 },
  bubble: { borderRadius: 16, padding: 12, marginBottom: 10, maxWidth: '85%' },
  userBubble: { backgroundColor: '#1a73e8', alignSelf: 'flex-end' },
  assistantBubble: { backgroundColor: '#fff', alignSelf: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 },
  bubbleText: { fontSize: 15, lineHeight: 21 },
  userText: { color: '#fff' },
  assistantText: { color: '#1a1a1a' },
  inputRow: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
  input: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, color: '#1a1a1a' },
  sendButton: { backgroundColor: '#1a73e8', borderRadius: 20, paddingHorizontal: 20, justifyContent: 'center', marginLeft: 8 },
  sendText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});

export default AskClaudeScreen;

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  TextInput, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';

const MOCK_MESSAGES = [
  { id: '1', role: 'assistant', text: 'Hello! I am your AuraHealth AI companion. How can I help you today?' },
  { id: '2', role: 'user',      text: 'I have been having irregular cycles lately.' },
  { id: '3', role: 'assistant', text: 'I understand. Irregular cycles can be caused by stress, diet, or hormonal changes. How long has this been happening?' },
  { id: '4', role: 'user',      text: 'About 2 months now.' },
  { id: '5', role: 'assistant', text: 'Thank you for sharing. I recommend logging your symptoms daily and consulting a healthcare provider if this continues. Would you like tips on managing stress?' },
];

export default function ChatScreen() {
  const [messages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    Alert.alert('Coming Soon', 'AI chat will be connected in a future sprint.');
    setInput('');
  };

  const renderItem = ({ item }) => (
    <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.aiBubble]}>
      {item.role === 'assistant' && (
        <View style={styles.avatarRow}>
          <View style={styles.avatar}><Text style={{ fontSize: 12 }}>🌸</Text></View>
          <Text style={styles.aiBubbleName}>AuraAI</Text>
        </View>
      )}
      <Text style={[styles.bubbleText, item.role === 'user' && styles.userBubbleText]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerAvatar}><Text style={{ fontSize: 20 }}>🌸</Text></View>
        <View>
          <Text style={styles.headerTitle}>AuraAI</Text>
          <Text style={styles.headerSub}>AI Health Advocate</Text>
        </View>
        <View style={styles.onlineDot} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={m => m.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messageList}
      />

      {/* Typing indicator */}
      <View style={styles.typingRow}>
        <View style={styles.typingDot} />
        <View style={[styles.typingDot, { opacity: 0.6 }]} />
        <View style={[styles.typingDot, { opacity: 0.3 }]} />
        <Text style={styles.typingText}>AuraAI is available...</Text>
      </View>

      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ask about your health..."
          placeholderTextColor="#bbb"
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendBtnText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: '#FFF5F5' },
  header:          { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 14, paddingTop: 52, gap: 10, borderBottomWidth: 1, borderBottomColor: '#FFE4E9' },
  headerAvatar:    { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFE4E9', justifyContent: 'center', alignItems: 'center' },
  headerTitle:     { fontSize: 16, fontWeight: '700', color: '#C2185B' },
  headerSub:       { fontSize: 12, color: '#aaa' },
  onlineDot:       { width: 8, height: 8, borderRadius: 4, backgroundColor: '#34C759', marginLeft: 'auto' },
  messageList:     { padding: 16, gap: 10 },
  bubble:          { maxWidth: '80%', borderRadius: 16, padding: 12, marginBottom: 4 },
  aiBubble:        { backgroundColor: '#fff', alignSelf: 'flex-start', borderWidth: 1, borderColor: '#FFE4E9' },
  userBubble:      { backgroundColor: '#C2185B', alignSelf: 'flex-end' },
  avatarRow:       { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  avatar:          { width: 20, height: 20, borderRadius: 10, backgroundColor: '#FFE4E9', justifyContent: 'center', alignItems: 'center' },
  aiBubbleName:    { fontSize: 11, color: '#FFB6C1', fontWeight: '600' },
  bubbleText:      { fontSize: 14, color: '#333', lineHeight: 20 },
  userBubbleText:  { color: '#fff' },
  typingRow:       { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 16, paddingBottom: 6 },
  typingDot:       { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFB6C1' },
  typingText:      { fontSize: 12, color: '#ccc', marginLeft: 4 },
  inputRow:        { flexDirection: 'row', padding: 12, gap: 8, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#FFE4E9' },
  input:           { flex: 1, backgroundColor: '#FFF5F5', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, borderWidth: 1, borderColor: '#FFE4E9', color: '#333', maxHeight: 80 },
  sendBtn:         { width: 44, height: 44, borderRadius: 22, backgroundColor: '#C2185B', justifyContent: 'center', alignItems: 'center' },
  sendBtnText:     { color: '#fff', fontSize: 16 },
});

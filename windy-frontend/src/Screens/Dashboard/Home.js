import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axios from 'axios';
import {baseURL} from '../../Utils/API';

export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialMessage = {
      role: 'assistant',
      content:
        'Hello, Windy is here. How can I help you?',
    };

    const secondMessage = {
      role: 'assistant',
      content:
        'Let’s start by identifying what’s worrying you. Can you describe the situation in detail?',
    };

    // Set the first message immediately
    setMessages([initialMessage]);

    // Set the second message after a delay
    const timer = setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, secondMessage]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = { role: 'user', content: message };

      // Add user's message to the conversation
      setMessages((prev) => [...prev, userMessage]);

      // Clear input and show loading indicator
      setMessage('');
      setLoading(true);

      // Add temporary "loading" message
      setMessages((prev) => [...prev, { role: 'assistant', content: '...' }]);

      try {
        const response = await axios.post(`${baseURL}api/chat`, {
          messages: [...messages, userMessage], // Include the full history
        });

        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1] = {
            role: 'assistant',
            content: response.data.reply,
          };
          return updatedMessages;
        });
      } catch (error) {
        console.error('Error fetching response:', error);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Sorry, I am not able to respond now..',
          },
        ]);
        // Remove the "loading" message if there's an error
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setLoading(false);
      }
    } else {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Please give me a message..' },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#084C61" />

      {/* Header */}
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>Chat with Worry Not</Text>
      </View>

      {/* Messages Display */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messagesContainer}
        renderItem={({item}) => (
          <View
            style={[
              styles.messageBubble,
              item.role === 'user' ? styles.userBubble : styles.assistantBubble,
            ]}>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        )}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message"
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          style={[styles.sendButton, loading && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={loading}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  headerBar: {
    backgroundColor: '#084C61',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '75%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1f7c4',
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8e8e8',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingLeft: 15,
    backgroundColor: '#f1f1f1',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#084C61',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginLeft: 10,
  },
  sendButtonDisabled: {
    backgroundColor: '#bbb',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

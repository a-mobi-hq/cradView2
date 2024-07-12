import React, { useState, useEffect, useRef } from 'react';
import API_BASE_URL from './config/apiConfig';
import io from 'socket.io-client';

function QuestionBus() {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [userId, setUserId] = useState('');
    const projectId = '6675678ac8768de3d516dbc1';
    const socket = io('http://localhost:3001');
    useEffect(() => {
        socket.on('message', ({ projectId, content, userId, firstName, lastName }) => {
            setMessages(prevMessages => [...prevMessages, { projectId, content, userId, firstName, lastName }]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    useEffect(() => {
        async function fetchMessages() {
            const response = await fetch(`${API_BASE_URL}/chat/${projectId}`);
            const data = await response.json();
            setMessages(data);
        }

        fetchMessages();
    }, [projectId]);

    const handleSend = () => {
        if (messageInput.trim() && userId.trim()) {
            const message = {
                projectId,
                content: messageInput,
                userId
            };
            socket.emit('message', message);
            setMessageInput('');
        }
    };

    return (
        <div id="chat-container">
            <div id="messages">
                {messages.map((message, index) => (
                    <div key={index}>
                        {message.userId.firstName} {message.userId.lastName}: {message.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                id="user-id"
                placeholder="User ID"
                value={userId}
                onChange={e => setUserId(e.target.value)}
            />
            <input
                type="text"
                id="message-input"
                placeholder="Type a message"
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
            />
            <button id="send-button" onClick={handleSend}>
                Send
            </button>
        </div>
    );
}

export default QuestionBus;
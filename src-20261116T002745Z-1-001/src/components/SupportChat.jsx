import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

// 🔗 ضع رابط الـ Production Webhook الجديد هنا
const N8N_WEBHOOK_URL = 'https://hossamos.app.n8n.cloud/webhook/9b27ce7c-6b8a-4a89-81d0-9e98c0ae5569';

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'أهلاً بك! 👋 أنا مساعدك الذكي في موقع الأفلام. كيف يمكنني مساعدتك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    let currentSession = localStorage.getItem('chat_session_id');
    if (!currentSession) {
      currentSession = 'session_' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('chat_session_id', currentSession);
    }
    setSessionId(currentSession);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(N8N_WEBHOOK_URL, {
        message: userMessage,
        session_id: sessionId,
      });

      const botReply = response.data?.output || response.data?.text || 'عذراً، لم أستطع فهم طلبك حالياً.';
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'حدث خطأ أثناء الاتصال بالسيرفر. يرجى المحاولة لاحقاً.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: '#e50914',
            color: '#fff',
            border: 'none',
            borderRadius: '50px',
            padding: '14px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(229, 9, 20, 0.4)',
          }}
        >
          💬 مساعد الأفلام
        </button>
      )}

      {isOpen && (
        <div
          dir="rtl"
          style={{
            width: '350px',
            height: '500px',
            backgroundColor: '#181818',
            color: '#fff',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '14px', backgroundColor: '#1f1f1f', display: 'flex', justifyContent: 'space-between' }}>
            <span>🎬 مساعد الأفلام الذكي</span>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>✖</button>
          </div>

          <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-start' : 'flex-end',
                  backgroundColor: msg.sender === 'user' ? '#e50914' : '#2f2f2f',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  maxWidth: '80%',
                }}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            {loading && <div style={{ color: '#aaa' }}>جاري البحث عن الأفلام... 🍿</div>}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} style={{ padding: '10px', display: 'flex', gap: '8px', backgroundColor: '#1f1f1f' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اسأل عن أي فيلم..."
              style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', backgroundColor: '#141414', color: '#fff' }}
            />
            <button type="submit" style={{ padding: '8px 14px', backgroundColor: '#e50914', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>إرسال</button>
          </form>
        </div>
      )}
    </div>
  );
}
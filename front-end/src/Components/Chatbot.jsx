import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, X, Bot, User, AlertCircle, Volume2 } from 'lucide-react';

const Chatbot = ({ loans, extraPayment = 0, isSidebar = false }) => {
  const [isOpen, setIsOpen] = useState(isSidebar); // Auto-open if in sidebar mode
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your J&K loan optimization assistant. Ask me anything about your local J&K Bank loans, savings strategies, winter buffers, or government schemes!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Speech helper
  const speak = (messageId, text) => {
    if (!('speechSynthesis' in window)) return;
    
    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }
    
    window.speechSynthesis.cancel();
    setSpeakingMessageId(messageId);
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith('hi') || v.lang.startsWith('ur'));
    if (voice) utterance.voice = voice;
    
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);
    window.speechSynthesis.speak(utterance);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if ((isOpen || isSidebar) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isSidebar]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const apiLoans = loans.map(loan => ({
        loan_id: loan.id,
        amount: loan.total,
        interest_rate: 8.5,
        emi: loan.emi,
        tenure: loan.tenure
      }));

      const response = await fetch('http://localhost:8000/api/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          loans: apiLoans,
          extra_payment: extraPayment
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chatbot');
      }

      const data = await response.json();

      const botMessage = {
        id: messages.length + 2,
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
        details: data.details
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "⚠️ Unable to connect. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // If in sidebar mode, always show the chat interface
  if (isSidebar) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <motion.div 
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Bot size={16} className="text-white drop-shadow-sm" />
            </motion.div>
            <div>
              <h3 className="text-white font-bold text-sm">Loan Assistant</h3>
              <p className="text-white/70 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Ask about your loans
              </p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-transparent to-slate-900/50">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.4,
                delay: index * 0.1,
                type: "spring",
                stiffness: 400
              }}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <Bot size={14} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-sm border flex items-start gap-2 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-purple-400/30'
                    : message.isError
                    ? 'bg-red-500/20 text-red-200 border-red-400/30'
                    : 'bg-white/10 text-white border-white/20'
                }`}
              >
                <div className="flex-1">
                  {message.isError && (
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle size={12} className="text-red-400" />
                      <span className="text-xs text-red-300 font-medium">Connection Error</span>
                    </div>
                  )}
                  {message.text}
                  {message.details && (
                    <div className="mt-2 p-2 bg-white/5 rounded-lg border border-white/10">
                      <div className="text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-purple-300">Optimal order:</span>
                          <span>{message.details.optimal_order?.join(' → ')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-300">Savings:</span>
                          <span>₹{message.details.savings_amount?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-300">Timeline reduction:</span>
                          <span>{message.details.timeline_reduction} months</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {message.sender === 'bot' && !message.isError && (
                  <button
                    type="button"
                    onClick={() => speak(message.id, message.text)}
                    className={`p-1 rounded-md hover:bg-white/10 text-white transition-colors self-end flex-shrink-0 ${speakingMessageId === message.id ? 'text-amber-400' : 'opacity-40 hover:opacity-100'}`}
                    title="Speak answer"
                  >
                    <Volume2 size={13} />
                  </button>
                )}
              </div>
              {message.sender === 'user' && (
                <div className="w-6 h-6 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <User size={14} className="text-white" />
                </div>
              )}
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 justify-start"
            >
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                <Bot size={14} className="text-white" />
              </div>
              <div className="bg-white/10 border border-white/20 px-3 py-2 rounded-2xl shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-white/60 text-xs ml-2">Typing...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-white/10 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
          <div className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full bg-white/10 border border-white/20 rounded-full px-3 py-2 pr-10 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 backdrop-blur-sm text-sm"
                disabled={isLoading}
              />
              {inputMessage && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/40">
                  {inputMessage.length}/500
                </div>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25 border border-white/20"
            >
              <Send size={14} className="drop-shadow-sm" />
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // Floating mode (original behavior)
  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 0 30px rgba(124, 58, 237, 0.6)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 border border-white/20"
        >
          <MessageCircle size={24} className="drop-shadow-sm" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              mass: 0.8
            }}
            className="fixed bottom-24 right-8 w-[380px] h-[580px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Bot size={18} className="text-white drop-shadow-sm" />
                </motion.div>
                <div>
                  <h3 className="text-white font-bold text-base">Loan Assistant</h3>
                  <p className="text-white/70 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Ask about your loans
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-200"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-transparent to-slate-900/50">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 400
                  }}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <Bot size={16} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-sm border flex items-start gap-2 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-purple-400/30'
                        : message.isError
                        ? 'bg-red-500/20 text-red-200 border-red-400/30'
                        : 'bg-white/10 text-white border-white/20'
                    }`}
                  >
                    <div className="flex-1">
                      {message.isError && (
                        <div className="flex items-center gap-2 mb-1">
                          <AlertCircle size={14} className="text-red-400" />
                          <span className="text-xs text-red-300 font-medium">Connection Error</span>
                        </div>
                      )}
                      {message.text}
                      {message.details && (
                        <div className="mt-3 p-2 bg-white/5 rounded-lg border border-white/10">
                          <div className="text-xs space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-purple-300">Optimal order:</span>
                              <span>{message.details.optimal_order?.join(' → ')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-green-300">Savings:</span>
                              <span>₹{message.details.savings_amount?.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-blue-300">Timeline reduction:</span>
                              <span>{message.details.timeline_reduction} months</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {message.sender === 'bot' && !message.isError && (
                      <button
                        type="button"
                        onClick={() => speak(message.id, message.text)}
                        className={`p-1 rounded-md hover:bg-white/10 text-white transition-colors self-end flex-shrink-0 ${speakingMessageId === message.id ? 'text-amber-400 animate-pulse' : 'opacity-40 hover:opacity-100'}`}
                        title="Speak answer"
                      >
                        <Volume2 size={15} />
                      </button>
                    )}
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-white/10 border border-white/20 px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-white/60 text-xs ml-2">Typing...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
              <div className="flex gap-3 items-center">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-3 pr-12 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 backdrop-blur-sm"
                    disabled={isLoading}
                  />
                  {inputMessage && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40">
                      {inputMessage.length}/500
                    </div>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25 border border-white/20"
                >
                  <Send size={16} className="drop-shadow-sm" />
                </motion.button>
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs text-white/40">Press Enter to send • Shift+Enter for new line</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
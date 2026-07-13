import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';

const Layout = ({ children, showChatbot = false }) => {
  const [chatbotProps, setChatbotProps] = useState({ loans: [], extraPayment: 0 });

  // Listen for custom events to update chatbot props
  useEffect(() => {
    const handleChatbotUpdate = (event) => {
      setChatbotProps(event.detail);
    };

    window.addEventListener('chatbot-update', handleChatbotUpdate);
    return () => window.removeEventListener('chatbot-update', handleChatbotUpdate);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070A] antialiased">
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content Area */}
      <div className="min-h-[calc(100vh-80px)]">
        {/* Main Content */}
        <main className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            {children || <Outlet />}
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Floating Chatbot - All Screen Sizes */}
      {showChatbot && (
        <div className="fixed bottom-6 right-6 z-50">
          <Chatbot {...chatbotProps} isSidebar={false} />
        </div>
      )}
    </div>
  );
};

export default Layout;

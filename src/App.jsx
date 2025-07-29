import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FloatButton } from 'antd';
import ChannelList from './pages/ChannelList';
import ChannelDetailEdit from './pages/ChannelDetailEdit';
import ChannelNew from './pages/ChannelNew';
import HomePage from './pages/HomePage'; // 引入 HomePage
import './App.css'; // 保持原有的 CSS 引入

function App() {
  useEffect(() => {
    const handleResize = () => {
      const appElement = document.querySelector('.App');
      if (appElement && appElement.parentElement) {
        const rootElement = appElement.parentElement;
        if (window.innerWidth >= 768) {
          rootElement.setAttribute('id', 'root');
        } else {
          rootElement.removeAttribute('id');
        }
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/channels" element={<ChannelList />} />
        <Route path="/channels/new" element={<ChannelNew />} />
        <Route path="/channels/:channelId" element={<ChannelDetailEdit />} />
        <Route path="/channels/:channelId/edit" element={<ChannelDetailEdit />} />
        {/* 將根路徑指向 HomePage */}
        <Route path="/" element={<HomePage />} />
      </Routes>
      <FloatButton.BackTop />
    </div>
  );
}

export default App

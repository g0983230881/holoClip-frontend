import { Routes, Route } from 'react-router-dom';
import { FloatButton } from 'antd';
import ChannelList from './pages/ChannelList';
import ChannelDetailEdit from './pages/ChannelDetailEdit';
import ChannelNew from './pages/ChannelNew';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/channels" element={<ChannelList />} />
        <Route path="/channels/new" element={<ChannelNew />} />
        <Route path="/channels/:channelId" element={<ChannelDetailEdit />} />
        <Route path="/channels/:channelId/edit" element={<ChannelDetailEdit />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <FloatButton.BackTop />
    </div>
  );
}

export default App;

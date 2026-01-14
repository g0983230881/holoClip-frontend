import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
  console.log('React app mounted successfully');
} catch (error) {
  console.error('Failed to mount React app:', error);
  rootElement.innerHTML = `
    <div style="padding: 20px; color: red;">
      <h1>應用程式載入失敗</h1>
      <p>錯誤: ${error instanceof Error ? error.message : String(error)}</p>
      <p>請檢查瀏覽器控制台以獲取更多資訊</p>
    </div>
  `;
}

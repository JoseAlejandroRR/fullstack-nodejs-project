import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, ThemeConfig } from 'antd'
import App from './App.tsx'

import './index.css'

const config: ThemeConfig = {
  token: {
    colorPrimary: '#00b96b',
  },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={config}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)

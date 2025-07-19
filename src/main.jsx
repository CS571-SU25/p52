import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginProvider } from './LoginContext.jsx';

createRoot(document.getElementById('root')).render(
  <LoginProvider>
    <App />
  </LoginProvider>
);

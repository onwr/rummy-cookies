import '@styles/tailwind.css';
import './i18n'; // i18n konfigürasyonunu import et

import { createRoot } from 'react-dom/client';

import App from './App';

createRoot(document.getElementById('root')).render(
    <App />
);

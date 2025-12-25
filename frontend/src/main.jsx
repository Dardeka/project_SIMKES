import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; 
import './index.css';
import { Toaster } from "@/components/ui/sonner"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster 
    richColors 
    position="top-right" 
    toastOptions={{
      classNames: {
        success: "!bg-green-600 !text-white !border-none [&_*]:text-white",
        warning: "!bg-yellow-600 !text-white !border-none [&_*]:text-white",
        error: "!bg-red-600 !text-white !border-none [&_*]:text-white",
      },
    }}
    />
  </React.StrictMode>,
);
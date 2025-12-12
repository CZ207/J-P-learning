import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Use the provided API Key directly to avoid environment loading issues
  const API_KEY = "sk-ai-v1-b72fd0128a972d8e27eb81c48d711bdb3785addb01f42e98f610ad686e61bf60";
  
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(API_KEY)
    }
  }
})
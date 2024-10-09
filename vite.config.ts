import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// console.log('Proxy: http://localhost:' + import.meta.env?.PORT)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4343'// + import.meta.env.PORT
    }
  }
})

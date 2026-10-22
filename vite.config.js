// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
server:{
 host: true, //para que sea visible en la red local
 proxy: {
   '/api': {
     target: 'http://172.16.2.142:4000' , //ip y puerto del back
     changeOrigin: true,
     secure: false
   }
 }
}
 // plugins: [react()],
})

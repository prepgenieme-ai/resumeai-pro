import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0A0A0F',
            color: '#F5F3EE',
            fontFamily: 'Satoshi, sans-serif',
            borderRadius: '12px',
            border: '1px solid #2a2a2f',
          },
        }}
      />
    </>
  )
}

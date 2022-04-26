import StoreProvider from '../store/store-context'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
    // 5. use provider 
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>


  )
}

export default MyApp

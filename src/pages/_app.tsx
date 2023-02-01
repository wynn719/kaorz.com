import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export async function getStaticProps() {
  console.log('app');

  return {
    props: {}
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

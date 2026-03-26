import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PyodideProvider } from '../contexts/PyodideProvider';
import { LanguageProvider } from '../contexts/LanguageContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <PyodideProvider>
        <Component {...pageProps} />
      </PyodideProvider>
    </LanguageProvider>
  );
}

export default MyApp;

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CssVarsProvider } from '@mui/joy/styles';
import theme from '../utils/theme';
import Header from '../components/Header';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [currentSection, setSection] = useState(0);

  
  return (
    <CssVarsProvider theme={theme}>
      <Header currentSection={currentSection} setSection={setSection}/>
      <Component {...pageProps} currentSection={currentSection} setSection={setSection}/>
    </CssVarsProvider>
  );
}

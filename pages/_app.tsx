import '../styles/globals.css'
import { useEffect } from 'react';
import type { AppProps } from 'next/app'
import { useStore } from '../stores/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function MyApp({ Component, pageProps }: AppProps) {
  const setWorker = useStore(state => state.setWorker);

  // Setup worker
  useEffect(() => {
    const worker = new Worker(new URL('../workers/BrushFileWorker', import.meta.url));
    setWorker(worker);

    return () => {
      setWorker(null);
    };
  }, [setWorker]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Component {...pageProps} />
    </DndProvider>
  );
}

export default MyApp

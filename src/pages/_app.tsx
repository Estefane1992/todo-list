import React from 'react';
import { AppProps } from 'next/app';
import { TaskProvider } from '@/components/taskContext/TaskContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <TaskProvider>
      <Component {...pageProps} />
    </TaskProvider>
  );
};

export default MyApp;

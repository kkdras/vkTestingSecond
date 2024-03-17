import React from 'react';
import { createRoot } from 'react-dom/client';

import { ConfigProvider } from '@vkontakte/vkui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './App';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </QueryClientProvider>
);

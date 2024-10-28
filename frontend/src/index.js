import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import App from './App';
import { store } from './redux/store/store';
import {Provider} from 'react-redux';


//Instance of react query
const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

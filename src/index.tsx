import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { ConfigProvider } from 'antd';
import 'dayjs/locale/ka';
import locale from 'antd/locale/ka_GE';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <ConfigProvider locale={locale} theme={{ hashed: false }}>
      <Provider store={store}>
        {/* <BrowserRouter basename={'/ui'}> */}
          <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  </>
);

reportWebVitals();

import ReactDOM from 'react-dom/client';
import { store } from "./store/index.js";
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import ModalLogin from './components/Modal/ModalLogin.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);

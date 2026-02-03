import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

if (typeof ResizeObserver !== "undefined") {
  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  const OriginalResizeObserver = ResizeObserver;

  window.ResizeObserver = class extends OriginalResizeObserver {
    constructor(callback) {
      super(debounce(callback, 16));
    }
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

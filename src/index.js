import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import updateState from './updateState';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';


// -------------------------------------------------
// ReactDOM
// -------------------------------------------------
const root = document.getElementById('root');

export function render(state) {
  ReactDOM.render(
    App(state),
    root
  );
};

// first render
updateState();

registerServiceWorker();

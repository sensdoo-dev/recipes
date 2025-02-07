import { createRoot } from 'react-dom/client';
import App from './app/App';
import 'bulma/css/bulma.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(<App />);

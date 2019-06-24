import { render } from 'react-dom';

import App from './App';

render(<App data={require('../data.json')} />, document.getElementById('root'));


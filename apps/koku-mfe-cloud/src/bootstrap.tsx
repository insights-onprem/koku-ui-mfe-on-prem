import React from 'react';
import ReactDOM from 'react-dom';

import AppEntry from './appEntry';

const container = document.getElementById('app');
if (container) {
  ReactDOM.render(<AppEntry />, container, () => container.setAttribute('data-ouia-safe', 'true'));
}

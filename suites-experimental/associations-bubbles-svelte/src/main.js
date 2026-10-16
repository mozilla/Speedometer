import { mount } from 'svelte';

import App from './App.svelte';

import 'typeface-inter';
import './index.css';

const app = mount(App, {
  target: document.getElementById('root'),
});

export default app;

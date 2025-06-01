import { loadSectionByHash } from './load.js';

window.addEventListener('DOMContentLoaded', loadSectionByHash);
window.addEventListener('hashchange', loadSectionByHash);

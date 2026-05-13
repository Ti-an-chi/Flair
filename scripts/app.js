import { routes } from './carver/routes'
import { toolboxRender } from 'uiManager';
import { builder } from './builder'

let router = null; 

document.addEventListener('DOMContentLoaded', () => {
  init();
  setupGlobalListeners();
})

async function init() {
  router = new routes();
  const currentTools = await router.get('unmutable/tools');
};

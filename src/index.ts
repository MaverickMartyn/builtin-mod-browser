import { remote } from 'electron';
import { types } from 'vortex-api';
import BrowseView from './BrowseView';


function main(context: types.IExtensionContext) {
  
  context.registerAction('global-icons', 100, 'menu', {}, 'Sample', () => {
    remote.dialog.showMessageBox(remote.getCurrentWindow(), {
      message: 'Hello World',
    });
  });

  context.registerAction('global-icons', 100, 'show', {}, 'Greet', () => { alert('Hello World!'); });
  
  context.registerMainPage('search', 'Browse', BrowseView, {
    group: 'per-game',
    props: () => ({ api: context.api }),
  });

  return true;
}

export default main;
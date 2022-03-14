import { remote } from 'electron';
import { types } from 'vortex-api';
import BrowseView from './BrowseView';


function main(context: types.IExtensionContext) {
  
  context.registerMainPage('search', 'Browse', BrowseView, {
    group: 'per-game',
    props: () => ({ api: context.api }),
  });

  return true;
}

export default main;
import samplePage from './sample-page';
// import editorPage from './editor-page';
// import notesPage from './notes-page';
import notebooksPage from './notebooks-page';
import pages from './pages';
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [samplePage, notebooksPage, pages]
};

export default menuItems;

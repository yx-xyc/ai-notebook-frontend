import samplePage from './sample-page';
import editorPage from './editor-page';
import notesPage from './notes-page';
import pages from './pages';
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [notesPage, editorPage, samplePage, pages]
};

export default menuItems;

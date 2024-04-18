// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome } from '@tabler/icons-react';

// type
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS - EDITOR PAGE ||============================== //

const icons = {
    IconBrandChrome
};
const editorPage: NavItemType = {
    id: 'editor-page',
    title: <FormattedMessage id="editor-page" />,
    icon: icons.IconBrandChrome,
    type: 'group',
    url: '/editor-page'
};

export default editorPage;

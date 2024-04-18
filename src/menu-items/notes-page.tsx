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
    id: 'notes-page',
    title: <FormattedMessage id="notes-page" />,
    icon: icons.IconBrandChrome,
    type: 'group',
    url: '/notes-page'
};

export default editorPage;

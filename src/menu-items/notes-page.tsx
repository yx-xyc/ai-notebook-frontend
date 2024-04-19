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
    url: '/users/f9a6072a-2e06-4f14-a1ff-3fd4096c799f/notebooks/afc457b0-90a9-439d-8591-d4d7264bec0a'
};

export default editorPage;

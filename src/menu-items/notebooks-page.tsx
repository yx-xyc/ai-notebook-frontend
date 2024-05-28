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
const notebooksPage: NavItemType = {
    id: 'notebooks-page',
    title: <FormattedMessage id="notebooks-page" />,
    icon: icons.IconBrandChrome,
    type: 'group',
    url: '/user/123e4567-e89b-12d3-a456-426614174000'
};

export default notebooksPage;

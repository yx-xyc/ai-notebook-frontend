import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const EditorPage = Loadable(lazy(() => import('views/editor-page')));
const NotesPage = Loadable(lazy(() => import('views/notes-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <SamplePage />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/users/:userId/notes/:noteId',
            element: <EditorPage />
        },
        {
            path: '/notes-page',
            element: <NotesPage />
        }
    ]
};

export default MainRoutes;

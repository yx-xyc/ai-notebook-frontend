import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const EditorPage = Loadable(lazy(() => import('views/editor-page')));
const NotesPage = Loadable(lazy(() => import('views/notes-page')));
const NotebooksPage = Loadable(lazy(() => import('views/notebooks-page')));
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
            path: '/user/:userId',
            element: <NotebooksPage />
        },
        {
            path: '/user/:userId/note/:noteId',
            element: <EditorPage />
        },
        {
            path: '/user/:userId/notebook/:notebookId',
            element: <NotesPage />
        }
    ]
};

export default MainRoutes;

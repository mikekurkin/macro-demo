import RootLayout from '@/components/layouts/RootLayout';
import ErrorPage from '@/pages/ErrorPage';
import WorkstationsPage from '@/pages/WorkstationsPage';
import { Navigate, createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to='/workstations' replace />,
      },
      {
        path: 'workstations',
        element: <WorkstationsPage />,
      },
    ],
  },
]);

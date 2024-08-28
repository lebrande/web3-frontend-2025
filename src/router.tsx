import { ErrorPage } from '@/error-page';
import { RootRoute } from '@/routes/root';
import { Vault4626Route } from '@/routes/vault4626';
import { createHashRouter } from 'react-router-dom';

export const router = createHashRouter([
  {
    path: '/',
    element: <RootRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/vault4626',
        element: <Vault4626Route />,
      },
    ],
  },
]);

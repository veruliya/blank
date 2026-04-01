import { createInertiaApp, router } from '@inertiajs/react';
import { Provider, ToastContainer } from '@react-spectrum/s2';

import AppLayout from './layouts/app-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  layout: () => AppLayout,
  title: (title) => (title ? `${title} - ${appName}` : appName),
  progress: {
    color: '#4B5563',
  },
  withApp: (app) => {
    return (
      <Provider
        locale="en-ID"
        router={{
          navigate: (path, routerOptions) => router.visit(path, routerOptions),
        }}
      >
        <ToastContainer placement="bottom end" />
        {app}
      </Provider>
    );
  },
});

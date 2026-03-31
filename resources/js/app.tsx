import { createInertiaApp, router } from '@inertiajs/react';
import { Provider } from '@react-spectrum/s2';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  progress: {
    color: '#4B5563',
  },
  withApp: (app) => {
    return (
      <Provider
        locale="en-US"
        router={{
          navigate: (path, routerOptions) => router.visit(path, routerOptions)
        }}
      >
        {app}
      </Provider>
    )
  }
});

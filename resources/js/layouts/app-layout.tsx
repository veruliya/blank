import { useEffect, type ReactNode } from 'react';

import { usePage } from '@inertiajs/react';

import { ToastQueue } from '@react-spectrum/s2';

import { style } from '@react-spectrum/s2/style' with { type: 'macro' };

export default function AppLayout({ children }: { children: ReactNode }) {
  const { flash } = usePage();

  useEffect(() => {
    if (flash.length > 0) {
      flash.forEach(({ type, message }) => {
        switch (type) {
          case 'positive':
            ToastQueue.positive(message);
            break;
          case 'negative':
            ToastQueue.negative(message);
            break;
          case 'info':
            ToastQueue.info(message);
            break;
          default:
            ToastQueue.neutral(message);
            break;
        }
      });
    }
  }, [flash]);

  return <main className={style({ padding: 16 })}>{children}</main>;
}

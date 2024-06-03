'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useAppDispatch } from '@/session/store';
import { fetchContent } from '@/session/my-state';
import { useEffect } from 'react';

import { persistor, store } from '@/session/store';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchContent());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="">{children}</div>
      </PersistGate>
    </Provider>
  );
}

// Enable edge runtime but you are required to disable the `migrate` function in `src/libs/DB.ts`
// Unfortunately, this also means it will also disable the automatic migration of the database
// And, you will have to manually migrate it with `drizzle-kit push`
// export const runtime = 'edge';

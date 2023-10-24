import { Raleway } from 'next/font/google';

import type { Metadata } from 'next';
import ReduxProvider from './redux/redux-provider';

import '@styles/globals.scss';

const ralewayFont = Raleway({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-raleway',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ICAP Group GmbH',
  description: 'Test task',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={ralewayFont.className}>
        <ReduxProvider>
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}

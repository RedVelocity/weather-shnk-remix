import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/cloudflare';
import stylesheet from '~/styles/globals.css?url';
import Providers from '~/Providers';
import Header from '~/components/header';
import Footer from '~/components/footer';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export default function App() {
  return (
    <Providers>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <Links />
        </head>
        <body>
          <Header hostName="redvelo.site" hostUrl="redvelo.site" />
          <main className="flex-1 min-w-full">
            <Outlet />
          </main>
          <Footer />
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </Providers>
  );
}

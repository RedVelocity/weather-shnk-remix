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

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <Header hostName="redvelo.site" hostUrl="redvelo.site" />
          {children}
          <Footer />
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </Providers>
  );
};

export default function App() {
  return <Outlet />;
}

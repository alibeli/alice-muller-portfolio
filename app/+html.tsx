import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

import { htmlThemeCss } from '@/design-system';
import { siteMeta } from '@/lib/siteMeta';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <title>{siteMeta.pageTitle}</title>
        <meta name="description" content={siteMeta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteMeta.title} />
        <meta property="og:description" content={siteMeta.description} />
        <meta property="og:image" content={siteMeta.imageUrl} />
        <meta property="og:url" content={siteMeta.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteMeta.title} />
        <meta name="twitter:description" content={siteMeta.description} />
        <meta name="twitter:image" content={siteMeta.imageUrl} />
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png?v=2" />
        <ScrollViewStyleReset />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..72,1..1000&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var s = localStorage.getItem('alice-portfolio-color-scheme');
                  if (s === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
                } catch (e) {}
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body, #root {
                height: 100%;
                width: 100%;
                overflow-x: hidden;
              }
              body {
                margin: 0;
                background: ${htmlThemeCss.light.background};
                color: ${htmlThemeCss.light.foreground};
                overflow: hidden !important;
                overscroll-behavior: none;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                font-family: "Google Sans Flex", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              }
              [data-theme="dark"] body {
                background: ${htmlThemeCss.dark.background};
                color: ${htmlThemeCss.dark.foreground};
              }
              #root {
                display: flex;
                flex-direction: column;
                flex: 1;
                min-height: 100%;
                min-height: 100dvh;
                min-height: -webkit-fill-available;
              }
              div, span, p, a, button, input, textarea, [class*="css-text-"] {
                font-family: "Google Sans Flex", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
              }
              ::selection {
                background: ${htmlThemeCss.light.selectionBackground};
                color: ${htmlThemeCss.light.selectionForeground};
              }
              [data-theme="dark"] ::selection {
                background: ${htmlThemeCss.dark.selectionBackground};
                color: ${htmlThemeCss.dark.selectionForeground};
              }
              [data-hide-scrollbar="true"] {
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
              [data-hide-scrollbar="true"]::-webkit-scrollbar {
                display: none;
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

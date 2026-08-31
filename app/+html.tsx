import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Alice Müller, Portfolio</title>
        <meta name="description" content="Former founder, CEO, VP of Product. Building AI, SaaS, marketplaces, Web3, and privacy tech." />
        <ScrollViewStyleReset />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..72,1..1000&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body, #root {
                height: 100%;
                width: 100%;
              }
              body {
                margin: 0;
                background: #FFFFFF;
                overflow: auto !important;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                font-family: "Google Sans Flex", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              }
              #root {
                display: flex;
                flex-direction: column;
                flex: 1;
                min-height: 100%;
              }
              div, span, p, a, button, input, textarea, [class*="css-text-"] {
                font-family: "Google Sans Flex", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
              }
              ::selection {
                background: #0A0A0A;
                color: #FFFFFF;
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

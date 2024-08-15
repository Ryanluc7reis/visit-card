"use client";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * { 
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: "Bebas Neue", system-ui;
  }
`;

export default function RootLayout({ children }) {
  return (
    <html>
      <GlobalStyles />
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}

"use client";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ContextThemeProvider } from "@/context/ContextTheme";
import { ContextPopUpProvider } from "@/context/ContextPopUp";

import { theme } from "../theme";

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
      <ContextPopUpProvider>
        <ContextThemeProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <body suppressHydrationWarning={true}>{children}</body>
          </ThemeProvider>
        </ContextThemeProvider>
      </ContextPopUpProvider>
    </html>
  );
}

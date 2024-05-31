import Navbar from "../shared/Navbar";
import AppThemeProvider from "../layouts/ThemeManager";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Sir. Fourirer",
  description: "Sir Fourirer e i vettori roteanti",
  author: "ImYako!",
  keywords: [
    "Fourier",
    "Serie Fourier",
    "Laboratorio Fourier",
    "Vettori e serie di Fourier",
    "Vettori roteanti",
  ],
  data: "25/04/2024",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        <link
          rel="shortcut icon"
          href="/favicon/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
      </head>
      <body>
        <SpeedInsights />
        <AppThemeProvider>
          <Navbar
            navItems={[
              {
                src: "/",
                title: "Home",
              },
              {
                src: "/lab",
                title: "Lab",
              },
              {
                src: "/fourier",
                title: "Fourier",
              },
              {
                src: "/about",
                title: "About",
              },
            ]}
          >
            {children}
          </Navbar>
        </AppThemeProvider>
      </body>
    </html>
  );
}

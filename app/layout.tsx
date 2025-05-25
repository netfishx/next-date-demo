import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: 'next demo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>{children}</NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}

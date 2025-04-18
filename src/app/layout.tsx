import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Compliance Review</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          {`
            tailwind.config = {
              darkMode: 'media',
              theme: {
                extend: {
                  colors: {
                    background: 'var(--background)',
                    foreground: 'var(--foreground)',
                  },
                  fontFamily: {
                    sans: 'var(--font-sans)',
                    mono: 'var(--font-mono)',
                  },
                  borderWidth: {
                    '1': '1px',
                    '2': '2px',
                    '3': '3px',
                    '4': '4px',
                  }
                }
              }
            }
          `}
        </script>
      </head>

      <body className={`py-20 `}>
        <main className="">{children}</main>
      </body>
    </html>
  );
}

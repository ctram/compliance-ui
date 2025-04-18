import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Compliance Review</title>
      </head>

      <body className={`py-20 `}>
        <main className="">{children}</main>
      </body>
    </html>
  );
}

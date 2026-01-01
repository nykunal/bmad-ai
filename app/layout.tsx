export const runtime = "nodejs";
export const dynamic = "force-dynamic";


import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="h-14 border-b bg-white flex items-center justify-between px-6">
          <h1 className="font-semibold">BMAD AI</h1>
          <a href="/login" className="text-sm underline">
            Login
          </a>
        </header>

        <main className="h-[calc(100vh-56px)] flex">
          {children}
        </main>
      </body>
    </html>
  );
}

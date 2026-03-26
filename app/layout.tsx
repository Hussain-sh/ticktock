import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import SessionProvider from "./components/SessionProvider";
import QueryProvider from "./components/QueryProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en" className={inter.className}>
      <body>
        <SessionProvider session={session}>
          <QueryProvider>{children}</QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

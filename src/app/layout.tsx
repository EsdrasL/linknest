import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import "./globals.css";
import { dependencyContainer } from "@/lib/dependencyContainer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Linknest",
  description: "Grow your audience",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await dependencyContainer.authService.verifySession();

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-background text-foreground">
          <header className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
            <div className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <Image
                width={32}
                height={32}
                src="/linknest-logo.svg"
                alt="Linknest"
              />
              Linknest
            </div>
            <nav className="flex items-center gap-4">
              {!userId ? (
                <>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                  <Link href="/login" className="hover:underline">
                    Login
                  </Link>
                  <Button
                    asChild
                    className="bg-white text-primary hover:bg-muted"
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    className="bg-white text-primary hover:bg-muted"
                  >
                    <Link href="/signup">Logout</Link>
                  </Button>
                </>
              )}
            </nav>
          </header>

          <main className="max-w-7xl m-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}

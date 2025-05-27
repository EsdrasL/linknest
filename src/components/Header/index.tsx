import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { dependencyContainer } from "@/lib/dependencyContainer";

export default async function Header() {
  const userId = await dependencyContainer.authService.verifySession();

  return (
    <header className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
      <div className="text-lg sm:text-xl font-bold flex items-center gap-2">
        <Image width={32} height={32} src="/linknest-logo.svg" alt="Linknest" />
        Linknest
      </div>
      <nav className="flex items-center gap-4">
        {!userId ? (
          <>
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/admin/login" className="hover:underline">
              Login
            </Link>
            <Button asChild className="bg-white text-primary hover:bg-muted">
              <Link href="/admin/signup">Sign Up</Link>
            </Button>
          </>
        ) : (
          <form
            action={async () => {
              "use server";
              await dependencyContainer.authService.deleteSession();
              redirect("/");
            }}
          >
            <Button
              className="bg-white text-primary hover:bg-muted"
              type="submit"
            >
              Logout
            </Button>
          </form>
        )}
      </nav>
    </header>
  );
}

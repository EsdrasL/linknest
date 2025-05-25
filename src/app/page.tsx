import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Homepage</h1>
      <Link href={"/auth/login"}>Login</Link>
      <Link href={"/auth/signup"}>Sign up</Link>
    </div>
  );
}

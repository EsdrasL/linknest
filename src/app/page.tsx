import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-7xl m-auto">
        <section className="py-12 px-4 flex flex-col gap-8 sm:grid sm:grid-cols-2 sm:gap-12 sm:items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Grow your audience.
            </h1>
            <p className="text-muted-foreground mb-6">
              Turn your bio link into a landing page for your entire online
              presence. Share content, grow your audience, and track
              performance—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-[--hover]">
                <Link href="/admin/signup">Create Your Link</Link>
              </Button>
            </div>
          </div>
          <div className="justify-center hidden lg:flex">
            <div className="bg-primary p-8 rounded-2xl">
              <Image
                width={160}
                height={160}
                src="/linknest-logo.svg"
                alt="Linknest"
              />
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col gap-2 p-6">
              <div className="flex items-center gap-2 text-success font-medium">
                <CheckCircle className="w-5 h-5" /> Smart Links
              </div>
              <p className="text-sm text-muted-foreground">
                Drive traffic to your content, store, or socials with
                customizable bio links.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-2 p-6">
              <div className="flex items-center gap-2 text-success font-medium">
                <CheckCircle className="w-5 h-5" /> Real-Time Analytics
              </div>
              <p className="text-sm text-muted-foreground">
                See what&apos;s working. Track link clicks, device types, and user
                behavior in real time.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-2 p-6">
              <div className="flex items-center gap-2 text-success font-medium">
                <CheckCircle className="w-5 h-5" /> Easy Customization
              </div>
              <p className="text-sm text-muted-foreground">
                Match your brand with themes, fonts, and colors that feel like
                you.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

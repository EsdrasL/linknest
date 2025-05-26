import { Card, CardContent } from "@/components/ui/card";
import { getUserAndLinks } from "@/core/usecases/getUserAndLinks";
import { dependencyContainer } from "@/lib/dependencyContainer";
import { notFound } from "next/navigation";

interface UserPage {
  params: Promise<{ username: string }>;
}

export async function generateStaticParams() {
  return [];
}

export default async function UserPage({ params }: UserPage) {
  const { username } = await params;

  const data = await getUserAndLinks(username, dependencyContainer);

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-muted text-muted-foreground font-sans flex flex-col items-center justify-center px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">{username}</h1>
      </div>
      <div className="w-full max-w-md space-y-4">
        {data.links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-medium hover:underline block"
          >
            <Card className="bg-background border border-border hover:shadow-md transition-shadow">
              <CardContent className="text-center">
                {link.title}
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}

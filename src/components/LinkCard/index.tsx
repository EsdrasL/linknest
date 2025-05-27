"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "@/core/models/LinkConfig";
import { UpdateLinkFormState } from "@/core/validation/updateLinkForm";
import { X as XIcon, Pencil, Save, Trash } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

interface LinkCard {
  username: string;
  link: Link;
  onRemoveLink: (username: string, link: Link) => Promise<void>;
  onUpdateLink: (
    state: UpdateLinkFormState,
    formData: FormData
  ) => Promise<UpdateLinkFormState>;
}

export default function LinkCard({
  username,
  link,
  onUpdateLink,
  onRemoveLink,
}: LinkCard) {
  const [state, action, pending] = useActionState(onUpdateLink, null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!state?.errors) {
      setIsEditing(false);
    }
  }, [state]);

  return (
    <Card className="border-border">
      <CardContent className="px-4">
        {isEditing ? (
          <form className="flex flex-col space-y-2 h-32" action={action}>
            <input type="hidden" name="username" defaultValue={username} />
            <input type="hidden" name="id" defaultValue={link.id} />
            <Input
              name="title"
              required
              placeholder="Title"
              defaultValue={link.title}
            />
            <Input
              name="url"
              required
              placeholder="Description"
              defaultValue={link.url}
            />
            <div className="flex justify-end items-end">
              <Button
                aria-label="Stop editing"
                type="reset"
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(false)}
                disabled={pending}
              >
                <XIcon className="w-4 h-4" />
              </Button>
              <Button
                aria-label="Save link"
                type="submit"
                size="icon"
                variant="ghost"
                className="ml-4"
                disabled={pending}
              >
                <Save className="w-4 h-4" />
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col space-y-2 h-32">
            <h3 className="font-semibold text-lg">{link.title}</h3>
            <p className="text-sm text-muted-foreground">{link.url}</p>
            <div className="flex justify-end mt-auto">
              <Button
                aria-label="Remove link"
                type="submit"
                size="icon"
                variant="ghost"
                className="ml-4"
                onClick={() => onRemoveLink(username, link)}
              >
                <Trash className="w-4 h-4" />
              </Button>
              <Button
                aria-label="Edit link"
                type="submit"
                size="icon"
                variant="ghost"
                className="ml-4"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

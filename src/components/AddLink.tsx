"use client";

import { useActionState, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AddLinkFormState } from "@/core/validation/addLinkForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AddLink {
  onAddLink: (
    state: AddLinkFormState,
    formData: FormData
  ) => Promise<AddLinkFormState>;
}

export default function AddLink({ onAddLink }: AddLink) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(onAddLink, null);

  useEffect(() => {
    if (!state?.errors) {
      setOpen(false);
    }
  }, [state]);

  return (
    <>
      <Button className="w-full" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        Add
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="max-w-3xl mx-auto rounded-t-3xl"
          aria-describedby="Enter title and URL"
        >
          <SheetHeader>
            <SheetTitle>Add new link</SheetTitle>
            <SheetDescription>Enter title and URL</SheetDescription>
          </SheetHeader>

          <form action={action} className="px-4 pb-16 space-y-4">
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                type="title"
                placeholder="Title"
                required
                defaultValue={state?.title}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                type="url"
                placeholder="https://yoururl.com"
                required
                defaultValue={state?.url}
              />
            </div>

            <Button disabled={pending} className="w-full" type="submit">
              Add
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}

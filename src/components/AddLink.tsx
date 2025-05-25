"use client";

import { AddLinkFormState } from "@/core/validation/addLinkForm";
import { useState } from "react";

interface AddLink {
  onAddLink: (formData: FormData) => Promise<AddLinkFormState>;
}

export default function AddLink({ onAddLink }: AddLink) {
  const [open, setOpen] = useState(false);

  const handleAddLink = (formData: FormData) => {
    onAddLink(formData);
    setOpen(false);
  };

  return (
    <div>
      {open ? (
        <form action={handleAddLink}>
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" placeholder="Title" />
          </div>

          <div>
            <label htmlFor="url">URL</label>
            <input id="url" name="url" type="url" />
          </div>

          <button type="submit">Add</button>
        </form>
      ) : (
        <button onClick={() => setOpen(true)}>Add</button>
      )}
    </div>
  );
}

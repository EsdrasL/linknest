"use client";

import { Link, LinkConfig } from "@/core/models/LinkConfig";
import { UpdateLinkFormState } from "@/core/validation/updateLinkForm";

interface LinkList {
  links: LinkConfig["links"];
  onRemoveLink: (link: Link) => Promise<void>;
  onUpdateLink: (
    formData: FormData,
    linkId: string
  ) => Promise<UpdateLinkFormState>;
}

export default function LinkList({
  links,
  onUpdateLink,
  onRemoveLink,
}: LinkList) {
  return (
    <div>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <div className="border border-primary rounded">
              <form
                action={(formData: FormData) => {
                  onUpdateLink(formData, link.id);
                }}
              >
                <span className="ml-4">{link.title}</span>
                <input id="title" name="title" placeholder="Title" defaultValue={link.title} />

                <span className="ml-4">{link.url}</span>
                <input id="url" name="url" placeholder="URL" defaultValue={link.url} />
                <button type="submit"></button>
              </form>
              <span className="ml-4" onClick={() => onRemoveLink(link)}>
                Remove
              </span>
            </div>
          </li>
        ))}
      </ul>

      {!links.length && <p>No links</p>}
    </div>
  );
}

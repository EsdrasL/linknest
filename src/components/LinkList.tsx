"use client";

import { Link, LinkConfig } from "@/core/models/LinkConfig";

interface LinkList {
  links: LinkConfig["links"];
  onRemoveLink: (link: Link) => Promise<void>;
}

export default function LinkList({ links, onRemoveLink }: LinkList) {
  return (
    <div>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <a href={link.url} target="_blank">
              {link.title}
            </a>
            <span className="ml-4" onClick={() => onRemoveLink(link)}>
              Remove
            </span>
          </li>
        ))}
      </ul>

      {!links.length && <p>No links</p>}
    </div>
  );
}

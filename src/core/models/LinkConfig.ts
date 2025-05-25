export interface Link {
  id: string;
  type: "link";
  title: string;
  url: string;
  active: boolean;
}

export interface LinkConfig {
  userId: string;
  links: Link[];
}

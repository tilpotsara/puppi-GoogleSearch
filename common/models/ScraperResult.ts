export type SearchResult = {
  headline: string;
  href: string;
};
export type ScrapeQuery = {
  query: string;
  timeStamp?: Date;
  results?: SearchResult[];
};

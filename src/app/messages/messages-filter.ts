export interface MessagesFilter {
  offset: number;
  count: number;
  text?: string;
  author?: number;
  from?: Date;
  to?: Date;
}

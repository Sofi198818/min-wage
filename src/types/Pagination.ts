export type Pagination = {
  total: number;
  current: number;
  pageSize: number;
  showSizeChanger?: boolean;
  pageSizeOptions?: Array<string>;
};

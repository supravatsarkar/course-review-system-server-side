/* eslint-disable @typescript-eslint/no-explicit-any */
export type TResponseObject = {
  success: boolean;
  statusCode: number;
  message: string;
  data: unknown;
  meta?: Record<string, any>;
};

export type TQuery = {
  page: string;
  limit: string;
  sortBy: string;
  sortOrder: number;
  minPrice: string;
  maxPrice: string;
  skip?: number;
  tags?: string;
  startDate?: string;
  endDate?: string;
  language: string;
  provider: string;
  durationInWeeks: string;
  level: string;
};

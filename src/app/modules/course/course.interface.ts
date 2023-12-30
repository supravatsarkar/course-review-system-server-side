import { Types } from 'mongoose';

export type TTag = {
  name: string;
  isDeleted: boolean;
};
export type TDtails = {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
};
export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: TTag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: TDtails;
};

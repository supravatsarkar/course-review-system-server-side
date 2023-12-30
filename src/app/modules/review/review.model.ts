import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>(
  {
    courseId: {
      type: Schema.ObjectId,
      required: true,
      ref: 'Course',
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: Schema.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    versionKey: false,
  },
);

export const ReviewModel = model<TReview>('Review', reviewSchema);

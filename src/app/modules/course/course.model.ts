import { Schema, model } from 'mongoose';
import { TCourse, TDtails, TTag } from './course.interface';

const tagSchema = new Schema<TTag>(
  {
    name: {
      type: String,
      required: [true, 'Tag name must be required'],
      trim: true,
      // unique: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const detailsSchema = new Schema<TDtails>(
  {
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: [
        true,
        '{VALUE} must be within "Beginner", "Intermediate", "Advanced"',
      ],
    },
    description: {
      type: String,
      required: [true, 'Details description is required'],
      trim: true,
    },
  },
  { _id: false, versionKey: false },
);

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Course title must be required'],
      unique: true,
    },
    instructor: {
      type: String,
      trim: true,
      required: [true, 'Course instructor must be required'],
    },
    categoryId: {
      type: Schema.ObjectId,
      required: [true, 'Course categoryId must be required'],
      ref: 'Category',
    },
    price: {
      type: Number,
      required: [true, 'Course price must be required'],
    },
    tags: {
      type: [tagSchema],
      required: [true, 'Course price must be required'],
    },
    startDate: {
      type: String,
      trim: true,
      required: [true, 'Course startDate must be required'],
    },
    endDate: {
      type: String,
      trim: true,
      required: [true, 'Course endDate must be required'],
    },
    language: {
      type: String,
      trim: true,
      required: [true, 'Course language must be required'],
    },
    provider: {
      type: String,
      trim: true,
      required: [true, 'Course provider must be required'],
    },
    durationInWeeks: {
      type: Number,
      required: [true, 'Course durationInWeeks must be required'],
    },
    details: {
      type: detailsSchema,
      required: [true, 'Course details must be required'],
    },
  },
  { timestamps: false, versionKey: false },
);

export const CourseModel = model<TCourse>('Course', courseSchema);

import { AppError } from '../../errors/AppError';
import { CategoryModel } from '../category/category.model';
import { TCourse } from './course.interface';
import { CourseModel } from './course.model';
import httpStatus from 'http-status-codes';
import { SORTBY_FIELDS, SORT_ORDER } from './courser.constance';
import { TQuery } from '../../interface';
import mongoose from 'mongoose';
import { ReviewModel } from '../review/review.model';

const createCourseIntoDB = async (payload: TCourse) => {
  // checking category is exist or not
  const isCategoryExist = await CategoryModel.isCategoryExist(
    payload.categoryId,
  );
  // if not exist throw an error
  if (!isCategoryExist) {
    throw new AppError(
      'Validation Error',
      'Category doest not exist',
      httpStatus.BAD_REQUEST,
    );
  }

  //checking start date and end date
  const startDate = new Date(payload.startDate).getTime();
  const endDate = new Date(payload.endDate).getTime();
  const diff = endDate - startDate;
  // checking date difference
  if (diff <= 0) {
    throw new AppError(
      '',
      'Invalid startDate or endDate or Might be start date and end date difference less then 1',
      httpStatus.BAD_REQUEST,
    );
  }
  const durationInWeeks = diff / (1000 * 60 * 60 * 24) / 7;
  payload.durationInWeeks = Math.ceil(durationInWeeks);

  // save data to db
  const result = await CourseModel.create(payload);
  return result;
};
const updateCoursesIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const payloadObj: Record<string, unknown> & Partial<TCourse> = { ...payload };

  // checking course is exiting
  const course = await CourseModel.findById(id);
  // if not exist throw an error
  if (!course) {
    throw new AppError('', 'Course does not exist!', httpStatus.BAD_GATEWAY);
  }

  // if want to update category then checking new category id is exist or not
  if (payloadObj?.categoryId) {
    const isCategoryExist = await CategoryModel.isCategoryExist(
      payloadObj.categoryId,
    );
    if (!isCategoryExist) {
      throw new AppError(
        'Validation Error',
        'Category doest not exist',
        httpStatus.BAD_REQUEST,
      );
    }
  }

  // if start date or end date are provided then check validation difference
  if (payloadObj?.startDate || payloadObj?.endDate) {
    const startDate = payloadObj.startDate
      ? new Date(payloadObj.startDate).getTime()
      : new Date(course?.startDate).getTime();
    const endDate = payloadObj.endDate
      ? new Date(payloadObj.endDate).getTime()
      : new Date(course.endDate).getTime();
    const diff = endDate - startDate;
    if (diff <= 0) {
      throw new AppError(
        '',
        'Invalid startDate or endDate or Might be start date and end date difference less is then 1',
        httpStatus.BAD_REQUEST,
      );
    }
    payloadObj.durationInWeeks = diff / (1000 * 60 * 60 * 24);
  }

  // checking details are provide or not
  if (payloadObj.details && Object.keys(payloadObj.details).length > 0) {
    Object.entries(payloadObj.details).forEach(([key, data]) => {
      payloadObj[`details.${key}`] = data;
    });
    delete payloadObj.details;
  }
  console.log({ payloadObj });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // checking tags ane validate it
    if (payloadObj?.tags && payloadObj?.tags?.length) {
      const toBeDeleteTags = payloadObj.tags
        .filter(tag => tag.name && tag.isDeleted)
        .map(tag => tag.name);
      console.log({ toBeDeleteTags });

      if (toBeDeleteTags.length) {
        // delete tags
        const deletedTagRes = await CourseModel.findByIdAndUpdate(
          id,
          { $pull: { tags: { name: { $in: [...toBeDeleteTags] } } } },
          { new: true, runValidators: true, session },
        );
        console.log({ deletedTagRes });
      }
      const toBeAddTags = payloadObj.tags.filter(
        tag => tag.name && !tag.isDeleted,
      );
      console.log({ toBeAddTags });
      if (toBeAddTags.length) {
        // add new tags
        const toBeAddTagRes = await CourseModel.findByIdAndUpdate(
          id,
          { $addToSet: { tags: { $each: toBeAddTags } } },
          { new: true, runValidators: true, session },
        );
        console.log({ toBeAddTagRes });
      }

      delete payloadObj.tags;
    }

    // update course
    const result = await CourseModel.findByIdAndUpdate(id, payloadObj, {
      new: true,
      runValidators: true,
      session,
    }).populate({
      path: 'createdBy',
      select: '-createdAt -updatedAt',
    });
    await session.commitTransaction();
    await session.endSession();
    return result?.toJSON();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};
const getCoursesFromDB = async (query: TQuery | Record<string, unknown>) => {
  const queryObj = {
    skip: 0,
    limit: 10,
    page: 1,
    sortBy: SORTBY_FIELDS[3],
    sortOrder: SORT_ORDER.asc,
    minPrice: 0,
    maxPrice: 0,
    tags: '',
    startDate: '',
    endDate: '',
    language: '',
    provider: '',
    durationInWeeks: 0,
    level: '',
  };
  if (Number(query.limit)) {
    queryObj.limit = Number(query.limit);
  }
  if (Number(query.page)) {
    queryObj.page = Number(query.page);
  }
  if (query.sortBy) {
    queryObj.sortBy = query.sortBy as string;
  }
  if (query.sortOrder) {
    queryObj.sortOrder = SORT_ORDER[query.sortOrder as 'asc' | 'desc'];
  }
  if (query.minPrice) {
    queryObj.minPrice = Number(query.minPrice);
  }
  let matches: {
    price?: { $gte: number; $lte?: number };
    'tags.name'?: string;
    startDate?: { $eq: string };
    endDate?: { $eq: string };
    language?: { $eq: string };
    provider?: { $eq: string };
    durationInWeeks?: { $eq: number };
    'details.level'?: string;
  } = {
    price: { $gte: queryObj.minPrice },
  };
  if (query.maxPrice) {
    queryObj.maxPrice = Number(query.maxPrice);
    if (queryObj.maxPrice > 0) {
      // maxPriceMatch = `$lte:${queryObj.maxPrice}`;
      matches = {
        price: { $gte: queryObj.minPrice, $lte: queryObj.maxPrice },
      };
    }
  }
  if (query.tags) {
    queryObj.tags = query.tags as string;
    matches['tags.name'] = queryObj.tags;
  }
  if (query.startDate) {
    queryObj.startDate = query.startDate as string;
    matches.startDate = { $eq: queryObj.startDate };
  }
  if (query.endDate) {
    queryObj.endDate = query.endDate as string;
    matches.endDate = { $eq: queryObj.endDate };
  }
  if (query.language) {
    queryObj.language = query.language as string;
    matches.language = { $eq: queryObj.language };
  }
  if (query.provider) {
    queryObj.provider = query.provider as string;
    matches.provider = { $eq: queryObj.provider };
  }
  if (query.durationInWeeks) {
    queryObj.durationInWeeks = Number(query.durationInWeeks);
    matches.durationInWeeks = { $eq: queryObj.durationInWeeks };
  }
  if (query.level) {
    queryObj.level = query.level as string;
    matches['details.level'] = queryObj.level;
  }
  queryObj.skip = (queryObj.page - 1) * queryObj.limit;
  console.log({ queryObj });
  console.log({ matches });
  // const result = await CourseModel.aggregate([
  //   { $match: matches },
  //   { $sort: { [queryObj.sortBy]: queryObj.sortOrder === 1 ? 1 : -1 } },
  //   { $skip: queryObj.skip },
  //   { $limit: queryObj.limit },
  //   // {
  //   //   $lookup: {
  //   //     from: 'users',
  //   //     localField: 'createdBy',
  //   //     foreignField: '_id',
  //   //     as: 'createdBy',
  //   //   },
  //   // },
  // ]);
  const result = await CourseModel.find(matches)
    .sort({
      [queryObj.sortBy]: queryObj.sortOrder === 1 ? 1 : -1,
    })
    .skip(queryObj.skip)
    .limit(queryObj.limit)
    .populate({
      path: 'createdBy',
      select: '-createdAt -updatedAt',
    });
  const totalCount = await courseCount(matches);
  return {
    data: { courses: result },
    meta: {
      page: queryObj.page,
      limit: queryObj.limit,
      total: totalCount,
    },
  };
};
const getCoursesWithReviewFromDB = async (id: string) => {
  // checking course existing
  const course = await CourseModel.findById(id).populate({
    path: 'createdBy',
    select: '-createdAt -updatedAt',
  });
  if (!course) {
    throw new AppError('', 'Course does not exist!', httpStatus.BAD_GATEWAY);
  }
  const reviews = await ReviewModel.find({ courseId: id }).populate({
    path: 'createdBy',
    select: '-createdAt -updatedAt',
  });
  return { course, reviews };
};
const courseCount = async (filter: Record<string, unknown> = {}) => {
  const totalCount = await CourseModel.countDocuments(filter);
  return totalCount;
};
const getBestCourseWithAverageReviewCountFromDB = async () => {
  type TBestReview = {
    _id: string;
    averageRating: number;
    reviewCount: number;
  };
  // find best review
  const bestReviewArray: TBestReview[] = await ReviewModel.aggregate([
    {
      $group: {
        _id: '$courseId',
        averageRating: { $avg: '$rating' },
        reviewCount: { $count: {} },
      },
    },
    {
      $sort: { averageRating: -1 },
    },
    { $limit: 1 },
  ]);
  const bestReview: Partial<TBestReview> = bestReviewArray[0];
  console.log({ bestReviewArray });

  if (!bestReview?._id) {
    // giving blank result if any review is not found for providing
    return { course: {}, averageRating: 0, reviewCount: 0 };
  }
  // find course by best review
  const course = await CourseModel.findById(bestReview?._id).populate({
    path: 'createdBy',
    select: '-createdAt -updatedAt',
  });
  delete bestReview._id;
  return { course, ...bestReview };
};

export const CourseService = {
  createCourseIntoDB,
  updateCoursesIntoDB,
  getCoursesFromDB,
  courseCount,
  getCoursesWithReviewFromDB,
  getBestCourseWithAverageReviewCountFromDB,
};

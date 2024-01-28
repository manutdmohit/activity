import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import moment from 'moment-timezone';

import Activity from '../models/Activity';

// @desc Add Activity
// @route POST /api/v1/activities
// @access Public
export const addActivity = async (req: Request, res: Response) => {
  const activity = await Activity.create(req.body);

  res.status(StatusCodes.CREATED).json({ activity });
};

// @desc Get All Activities
// @route GET /api/v1/activities
// @access Public
export const getAllActivities = async (req: Request, res: Response) => {
  const count = await Activity.countDocuments({});

  const allActivities = await Activity.aggregate([
    {
      $sort: { createdAt: -1 },
    },
    {
      $addFields: {
        date: {
          $dateToString: {
            format: '%Y-%m-%d %H:%M:%S',
            date: '$createdAt',
            timezone: 'Asia/Kathmandu',
          },
        },
      },
    },
    {
      $project: {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    },
  ]);

  res.status(StatusCodes.OK).json({ count, allActivities });
};

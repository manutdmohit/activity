import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import moment from 'moment-timezone';

import Activity from '../models/Activity';

import { NotFoundError } from '../errors';

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

// @desc Get Activity
// @route GET /api/v1/activities/:id
// @access Public
export const getActivity = async (req: Request, res: Response) => {
  const activityId = req.params.id;

  const getActivity = await Activity.findById(activityId).select(
    '-updatedAt -__v'
  );

  if (!getActivity) {
    throw new NotFoundError(`No activity found with id ${activityId}`);
  }

  const date = moment(getActivity.createdAt)
    .tz('Asia/Kathmandu')
    .format('YYYY-MM-DD HH:mm:ss');

  const activity = {
    _id: getActivity._id,
    description: getActivity.description,
    date: date,
  };

  res.status(StatusCodes.OK).json({ activity });
};
// @desc Update Activity
// @route PATCH /api/v1/activities/:id
// @access Public
export const updateActivity = async (req: Request, res: Response) => {
  const activityId = req.params.id;

  const getActivity = await Activity.findByIdAndUpdate(activityId, req.body, {
    new: true,
    runValidators: true,
  }).select('-updatedAt -__v');

  if (!getActivity) {
    throw new NotFoundError(`No activity found with id ${activityId}`);
  }

  res.status(StatusCodes.OK).json({ msg: 'Activity updated successfully' });
};

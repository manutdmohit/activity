import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Activity from '../models/Activity';

// @desc Add Activity
// @route POST /api/v1/activities
// @access Public
export const addActivity = async (req: Request, res: Response) => {
  const activity = await Activity.create(req.body);

  res.status(StatusCodes.CREATED).json({ activity });
};

// @desc Add Activity
// @route GET /api/v1/activities
// @access Public
export const getAllActivities = async (req: Request, res: Response) => {
  const activities = await Activity.find({});

  res.status(StatusCodes.CREATED).json({ activities });
};

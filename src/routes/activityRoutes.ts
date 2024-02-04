import express, { Router } from 'express';

import {
  addActivity,
  deleteActivity,
  getActivity,
  getAllActivities,
  getTodayActivities,
  updateActivity,
} from '../controllers/activityController';

const router: Router = express.Router();

router.route('/').post(addActivity).get(getAllActivities);

router.get('/today', getTodayActivities);

router
  .route('/:id')
  .get(getActivity)
  .patch(updateActivity)
  .delete(deleteActivity);

export default router;

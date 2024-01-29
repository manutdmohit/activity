import express, { Router } from 'express';

import {
  addActivity,
  getActivity,
  getAllActivities,
  updateActivity,
} from '../controllers/activityController';

const router: Router = express.Router();

router.route('/').post(addActivity).get(getAllActivities);
router.route('/:id').get(getActivity).patch(updateActivity);

export default router;

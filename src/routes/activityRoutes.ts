import express, { Router } from 'express';

import {
  addActivity,
  getActivity,
  getAllActivities,
} from '../controllers/activityController';

const router: Router = express.Router();

router.route('/').post(addActivity).get(getAllActivities);
router.route('/:id').get(getActivity);

export default router;

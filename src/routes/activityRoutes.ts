import express, { Router } from 'express';

import {
  addActivity,
  getAllActivities,
} from '../controllers/activityController';

const router: Router = express.Router();

router.route('/').post(addActivity).get(getAllActivities);

export default router;

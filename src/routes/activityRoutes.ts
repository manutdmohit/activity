import express, { Router } from 'express';

import { addActivity } from '../controllers/activityController';

const router: Router = express.Router();

router.route('/').post(addActivity);

export default router;

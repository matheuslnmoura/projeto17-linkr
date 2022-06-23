/* eslint-disable import/extensions */
import { Router } from 'express';
import { insertFollow, removeFollow } from '../controllers/followController.js';
import verifyToken from '../middlewares/verifyToken.js';

const followsRouter = Router();

followsRouter.post('/follows/:id', verifyToken, insertFollow);
followsRouter.delete('/follows/:id', verifyToken, removeFollow);

export default followsRouter;

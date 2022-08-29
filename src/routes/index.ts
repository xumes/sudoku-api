import { Router } from 'express';
import boardRouter from './board';

const baseRouter = Router();

baseRouter.use('/board', boardRouter);

export default baseRouter;

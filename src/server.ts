import express from 'express';
import morgan from 'morgan';
import productRouter from './product/product.router';
import userRouter from './user/user.router';
import updateRouter from './update/update.router';
import updatePointRouter from './update-points/update-points.router';
import { isAuth } from './middleware/isAuth';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRouter);
app.use('/api', isAuth, productRouter);
app.use('/api', isAuth, updateRouter);
app.use('/api', isAuth, updatePointRouter);

app.use((error, req, res, next) => {
  if (error) {
    console.error(`there was an error: ${error.message}`);
    res.json({ error });
  }
});

export default app;

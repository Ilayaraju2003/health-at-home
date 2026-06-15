import express from 'express';
import cors from 'cors';

import reminderRoutes from './routes/reminderRoutes.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
import authRoutes from './routes/loginRoutes.js';

const app = express();

const port = 5000;

app.use(cors());

app.use(express.json());


app.use('/reminders', reminderRoutes);



// Should be last
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


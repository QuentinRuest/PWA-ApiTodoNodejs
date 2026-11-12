import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import restricted from './middleware/restricted.middleware';

import { createTodoRoutes } from './routes/todo.routes';
import { createHealthRoutes } from './routes/health.routes';
import { errorHandler } from './middleware/error.middleware';
import { createAuthRoutes } from './routes/auth.routes';
import { createUserRoutes } from './routes/user.route';


dotenv.config();

const secret = process.env.COOKIE_SECRET;
if (!secret) {
  throw new Error('COOKIE_SECRET est manquant');
}

export const app = express();
const port = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
const sessionConfig = {
  name: "userAuth", // name of the cookie
  secret, // secrete that makes the cookie
  cookie: {
    maxAge: 1000 * 60 * 60, // time span of the cookie (ms) in the example is 1 hour (3600000 ms)
    secure: false, // for dev set false (http), for prod set true for only https access (https)
    httpOnly: true, // true means no acccess from javascript
  },
  resave: false,
  saveUninitialized: true, // in prod set to false (GDPR laws)
};  

app.use(session(sessionConfig));
app.use('/todo', restricted, createTodoRoutes());
app.use('/auth', createAuthRoutes());
app.use('/user', restricted, createUserRoutes());
app.use('/', createHealthRoutes());


if (process.env.NODE_ENV === 'development') {
  const swaggerDocument = yaml.load(path.resolve('swagger.yml'));
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.get('/ping', (req, res) => {
  res.json({ message: 'pong', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`📚 API Documentation available at http://localhost:${port}/swagger`);
  console.log(`❤️  Health check available at http://localhost:${port}/health`);
  console.log(`🏓 Ping endpoint available at http://localhost:${port}/ping`);
});
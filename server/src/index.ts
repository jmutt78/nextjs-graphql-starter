import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv-safe/config';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import path from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { COOKIE_NAME, __prod__ } from './constants';
import { User } from './entities/User';
import { ErrorMessages } from './entities/errrorlogs'
import { UserResolver } from './resolvers/user';
import { createUserLoader } from './utils/createUserLoader';
import { createSubLoader } from './utils/createSubsLoader'
import cookieParser from 'cookie-parser';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    logging: true,
    synchronize: true,
    url: process.env.DATABASE_URL,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [User, ErrorMessages],
  });

  const app = express();
  app.use(express.static('public'));
  app.use(cookieParser());



  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.set('trust proxy', 1);


  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    }),
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: false,
      }),
      secret: process.env.SESSION_SECRET!,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: false,
        sameSite: 'lax', // csrf   
      },
    }),
  );

  //apollo connection
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      subLoader: createSubLoader(),
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(process.env.PORT!), () => {
    console.log('server started on localhost:3000');
  });
};

main().catch((err) => {
  console.error(err);
});

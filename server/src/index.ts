import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import { typeDefs, resolvers } from './graphql';
import { connectDatabase } from './database/index';

dotenv.config();

const port = process.env.PORT || 9000;

const mount = async (app: Application) => {
  const db = await connectDatabase();

  app.use(cookieParser(process.env.SECRET));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res })
  });
  server.applyMiddleware({ app, path: '/api' });

  app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
  });
};

mount(express());

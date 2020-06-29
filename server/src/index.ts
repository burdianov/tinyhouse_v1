import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import { connectDatabase } from './database/index';

const port = 9000;

const mount = async (app: Application) => {
  const db = await connectDatabase();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db })
  });
  server.applyMiddleware({ app, path: '/api' });

  app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
  });

  const listings = await db.listings.find({}).toArray();
  console.log(listings);
};

mount(express());

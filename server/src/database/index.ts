import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

import { Database, Booking, Listing, User } from '../lib/types';

dotenv.config();

const user = process.env.MONGO_DB_USER_NAME;
const userPassword = process.env.MONGO_DB_USER_PASSWORD;
const cluster = process.env.MONGO_DB_CLUSTER;
const dbName = process.env.MONGO_DB_NAME;

const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = client.db('main');

  return {
    bookings: db.collection<Booking>('bookings'),
    listings: db.collection<Listing>('listings'),
    users: db.collection<User>('users')
  };
};

import BetfairSession from '../lib/session';
import {} from 'dotenv/config';

const appKey = process.env.APP_KEY;

export const session = new BetfairSession(appKey);
import * as dotenv from 'dotenv';

dotenv.config();

const host = process.env.HOST || 'localhost';
const candidateId = process.env.CANDIDATE_ID || 'default';

export {
  host,
  candidateId,
};
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export default {
  email: process.env.EMAIL,
  pass: process.env.PASS,
};

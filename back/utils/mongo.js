import mongoose from 'mongoose';
import logger from './logger.js';


const mongo = async () => {
  const { DB_NAME, DB_PASSWORD, DB_URL, DB_USERNAME } = process.env;
  if (!DB_NAME || !DB_PASSWORD || !DB_URL || !DB_USERNAME) {
    return logger.warn('[DATABASE]: Missing database settings.');
  }
  console.log(DB_NAME, DB_PASSWORD, DB_URL, DB_USERNAME);
  try {
    const mongoURI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@soulconnection.a100j.mongodb.net/?retryWrites=true&w=majority&appName=SoulConnection`;

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(mongoURI);
    logger.info('[DB]: Connected to MongoDB');

    process.on('SIGINT', async () => {
      await mongoose.disconnect();
      logger.info('[DB]: Disconnected from MongoDB');
      process.exit(0);
    });
  } catch (error) {
    logger.error(`[DB]: Connection error: ${error.message}`);
    process.exit(1);
  }
};

export default mongo;

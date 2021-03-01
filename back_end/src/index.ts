import { createConnection } from 'typeorm';

import logger from './config/logger';
import app from './config/express';

const PORT = process.env.PORT || 3000;

createConnection()
  .then(() => {
    logger.info('Database connection successful');
    app.listen(PORT, () => {
      logger.info(`Server running: ${PORT}`);
    });
  })
  .catch((error: Error) => {
    logger.info(`Database connection failed: ${error}`);
  });

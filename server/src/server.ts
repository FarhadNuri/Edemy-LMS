import { env } from './config/env';
import { connectDatabase } from './config/db';
import { app } from './app';

async function startServer() {
  await connectDatabase();
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});

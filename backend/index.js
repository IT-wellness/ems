import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

    const shutdown = async () => {
      console.log('🛑 Shutting down...');
      await mongoose.connection.close();
      server.close(() => {
        console.log('🔌 Server closed. DB disconnected.');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
    });
  } catch(err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
}

startServer();
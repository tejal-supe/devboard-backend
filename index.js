import app from "./app.js";
import { connectDB } from "./src/config/db.js";
import config from "./src/config/environment.js";

const server = app.listen(config.port, () => {
  console.info(
    `Server running in ${process.env.NODE_ENV} mode on port ${config.port}`
  );
});
connectDB();

// process.on('unhandledRejection', (err) => {
//   logger.error('Unhandled Rejection:', err);
//   server.close(() => {
//     process.exit(1);
//   });
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//   logger.error('Uncaught Exception:', err);
//   process.exit(1);
// });

import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

let server: Server;

const connectionOptions = {
  autoIndex: true,
};

async function main() {
  try {
    await mongoose.connect(config.database_url as string, connectionOptions);
    server = app.listen(config.port, () => {
      console.log(
        `Bike Rental Reservation System Server is running on port ${config.port}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  console.log("Shutting down... 💤💤💤💤💤");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception thrown", err);
  console.log("Shutting Down... 💤💤💤💤💤");
  process.exit(1);
});

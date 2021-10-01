import { config } from "./config/vars";
import app from "./config/server";
import mongodb from "./config/mongo";

mongodb
  .on("error", console.error.bind(console, "MongoDB connection error:"));
  

app.listen(config.port, "0.0.0.0", () => {
  console.log(`Server started on port: ${config.port}`);
});

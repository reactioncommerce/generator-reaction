import bunyan from "bunyan";
import bunyanFormat from "bunyan-format";
import { config } from "../../config";

// set logging application name
const appName = config.REACTION_APP_NAME;
let level = config.REACTION_LOG_LEVEL;
const outputMode = config.REACTION_LOG_FORMAT;

// default console config (stdout)
const streams = [
  {
    level,
    stream: bunyanFormat({ outputMode })
  }
];

// create default logger instance
const logger = bunyan.createLogger({
  name: appName,
  streams
});

export default logger;

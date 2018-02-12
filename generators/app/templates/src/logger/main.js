import bunyan from "bunyan";
import bunyanFormat from "bunyan-format";

// set logging application name
const appName = process.env.REACTION_APP_NAME || "Reaction";

// set stdout log level
let level = process.env.REACTION_LOG_LEVEL || "INFO";
level = level.toUpperCase();

// allow overriding the stdout log formatting
// available options: short|long|simple|json|bunyan
// https://www.npmjs.com/package/bunyan-format
const outputMode = process.env.REACTION_LOG_FORMAT || "json";

// configure bunyan logging module for reaction server
// See: https://github.com/trentm/node-bunyan#levels
const levels = ["FATAL", "ERROR", "WARN", "INFO", "DEBUG", "TRACE"];

if (levels.includes(level)) {
  level = "INFO";
}

// default console config (stdout)
const streams = [
  {
    level,
    stream: bunyanFormat({ outputMode })
  }
];

// create default logger instance
const Logger = bunyan.createLogger({
  name: appName,
  streams
});

export default Logger;

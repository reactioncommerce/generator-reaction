import { email, json, port, str, cleanEnv } from "envalid";

// Define the ENV vars for the application.
const schema = {
  PORT: port({
    desc: "The port on which the GraphQL server is bound.",
    example: "4000"
  }),
  REACTION_APP_NAME: str({
    desc: "The application that will be added to logs.",
  }),
  REACTION_LOG_LEVEL: str({
    desc: "The log level.",
    default: "INFO",
    choices: ["FATAL", "ERROR", "WARN", "INFO", "DEBUG", "TRACE"]
  }),
  REACTION_LOG_FORMAT: str({
    desc: "The log output format.",
    default: "json",
    choices: ["long", "json", "inspect", "simple", "short", "bunyan"]
  })
};

export const config = cleanEnv(process.env, schema);

const NODE_ENV = process.env.NODE_ENV;
const isTestingEnvironment = NODE_ENV === "testing";
const isDevelopmentEnvironment = NODE_ENV === "development";

export { isTestingEnvironment, isDevelopmentEnvironment };

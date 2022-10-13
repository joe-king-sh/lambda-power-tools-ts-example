import {
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayProxyEventBase,
  APIGatewayProxyResult,
} from "aws-lambda";
import { TodoRepository } from "src/infrastructures/todo";
import { Tracer, captureLambdaHandler } from "@aws-lambda-powertools/tracer";
import middy from "@middy/core";
import { Logger, injectLambdaContext } from "@aws-lambda-powertools/logger";

const tracer = new Tracer({
  serviceName: "todo-sample-api",
});
const logger = new Logger({
  serviceName: "todo-sample-api",
  logLevel: "debug",
});

const lambdaHandler = async (
  _: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>,
  _context: any
): Promise<APIGatewayProxyResult> => {
  const todoRepository = new TodoRepository();
  const todos = await todoRepository.getTodos();

  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};
export const handler = middy(lambdaHandler)
  .use(captureLambdaHandler(tracer))
  .use(injectLambdaContext(logger));

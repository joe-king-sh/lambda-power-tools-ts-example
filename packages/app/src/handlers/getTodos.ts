import {
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayProxyEventBase,
  APIGatewayProxyResult,
} from "aws-lambda";
import { TodoRepository } from "src/infrastructures/todo";

export async function handler(
  _: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>
): Promise<APIGatewayProxyResult> {
  const todoRepository = new TodoRepository();
  const todos = todoRepository.getTodos();

  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
}

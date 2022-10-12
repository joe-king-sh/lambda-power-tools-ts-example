import {
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayProxyEventBase,
  APIGatewayProxyResult,
} from "aws-lambda";
import { Todo } from "src/domains/todo";
import { TodoRepository } from "src/infrastructures/todo";

export async function handler(
  event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>
): Promise<APIGatewayProxyResult> {
  const todoRepository = new TodoRepository();
  if (event.body == null) throw new Error("body is null");
  const todo: Todo = JSON.parse(event.body);
  await todoRepository.save({ todo });
  return {
    statusCode: 201,
    body: JSON.stringify(todo),
  };
}

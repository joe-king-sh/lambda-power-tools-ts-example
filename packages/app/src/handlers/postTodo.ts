import {
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayProxyEventBase,
  APIGatewayProxyResult,
} from "aws-lambda";
import { TodoRepository } from "src/infrastructures/todo";
import { v4 as uuidv4 } from "uuid";

export async function handler(
  event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>
): Promise<APIGatewayProxyResult> {
  const todoRepository = new TodoRepository();
  if (event.body == null) throw new Error("body is null");
  const postTodoInput = JSON.parse(event.body);
  // TODO: some validations

  const todo = {
    todoId: uuidv4(),
    ...postTodoInput,
  };
  await todoRepository.save({ todo });
  return {
    statusCode: 201,
    body: JSON.stringify(todo),
  };
}

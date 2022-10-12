import {
  GetTodosResponseResponse,
  ITodoRepository,
  Todo,
} from "../domains/todo";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import {
  DynamoDBClient,
  PutItemCommand,
  PutItemInput,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "ap-northeast-1" });

export class TodoRepository implements ITodoRepository {
  save: (options: { todo: Todo }) => Promise<void> = async (options) => {
    const item = marshall(options.todo);
    const input: PutItemInput = {
      TableName: "todos",
      Item: item,
    };
    const command = new PutItemCommand(input);
    await client.send(command);
    return;
  };

  getTodos: () => Promise<GetTodosResponseResponse> = async () => {
    const input: ScanCommandInput = {
      TableName: "todos",
    };

    const command = new ScanCommand(input);
    const response = await client.send(command);
    console.log({ response });

    const todos = response.Items?.map((item) => unmarshall(item)) ?? [];

    console.log({ todos });

    return {
      todos: todos as Todo[],
    };
  };
}

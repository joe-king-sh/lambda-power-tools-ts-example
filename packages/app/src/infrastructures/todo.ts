import {
  GetTodosResponseResponse,
  ITodoRepository,
  Todo,
} from "../domains/todo";
import { marshall } from "@aws-sdk/util-dynamodb";
import {
  DynamoDBClient,
  PutItemCommand,
  PutItemInput,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "ap-northeast-1" });

export class TodoRepository implements ITodoRepository {
  save: (options: { todo: Todo }) => Promise<void> = async (todo) => {
    const input: PutItemInput = {
      TableName: "todos",
      Item: marshall(todo),
    };
    const command = new PutItemCommand(input);
    const response = await client.send(command);
    console.log({ response });
    return;
  };

  getTodos: () => Promise<GetTodosResponseResponse> = async () => {
    const input: ScanCommandInput = {
      TableName: "todos",
    };

    const command = new ScanCommand(input);
    const response = await client.send(command);
    console.log({ response });

    return {
      todos: response.Items as unknown as Todo[],
    };
  };
}

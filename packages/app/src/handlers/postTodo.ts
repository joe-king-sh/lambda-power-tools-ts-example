import {
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayProxyEventBase,
  APIGatewayProxyResult,
} from "aws-lambda";
import { v4 as uuid } from "uuid";

export async function handler(
  event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>
): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 201,
    body: JSON.stringify({
      id: uuid(),
      method: event.httpMethod,
      query: event.queryStringParameters,
    }),
  };
}

import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { ILambdaFunctionsByName } from "./lambdaFunctions";

type ApiGatewayProps = {
  lambdaFunctions: ILambdaFunctionsByName;
};
export class ApiGateway {
  readonly restApi: RestApi;

  constructor(scope: Construct, { lambdaFunctions }: ApiGatewayProps) {
    this.restApi = new apigateway.RestApi(scope, "TodoApi", {
      deployOptions: {
        tracingEnabled: true,
      },
    });
    this.restApi.root.addMethod("any");

    const todosResource = this.restApi.root.addResource("todos");

    const postTodoLambda = lambdaFunctions.postTodo;
    todosResource.addMethod(
      "POST",
      new apigateway.LambdaIntegration(postTodoLambda)
    );
    const getTodoLambda = lambdaFunctions.getTodo;
    todosResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getTodoLambda)
    );
  }
}

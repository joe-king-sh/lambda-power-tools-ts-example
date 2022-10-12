import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { ApiGateway } from "./constructs/apiGateway";
import { DynamoDB } from "./constructs/dynamodb";
import { LambdaFunctions } from "./constructs/lambdaFunctions";

export class ServerlessApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ddb = new DynamoDB(this);

    const { lambdaFunctions } = new LambdaFunctions(this, {
      ddbTable: ddb.todoTable,
    });

    new ApiGateway(this, { lambdaFunctions });
  }
}

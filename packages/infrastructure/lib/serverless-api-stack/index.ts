import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { DynamoDB } from "./constructs/dynamodb";
import { LambdaFunctions } from "./constructs/lambdaFunctions";

export class ServerlessApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ddb = new DynamoDB(this);

    new LambdaFunctions(this, {
      ddbName: ddb.todoTable.tableName,
    });
  }
}

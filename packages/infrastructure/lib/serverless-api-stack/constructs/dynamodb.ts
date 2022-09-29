import { RemovalPolicy } from "aws-cdk-lib";
import { Table, AttributeType, BillingMode } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class DynamoDB {
  todoTable: Table;

  constructor(scope: Construct) {
    this.todoTable = new Table(scope, "todo-ddb", {
      partitionKey: {
        name: "todoId",
        type: AttributeType.STRING,
      },
      tableName: "todos",
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });
  }
}

import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { DynamoDB } from "./constructs/dynamodb";

export class ServerlessApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ddb = new DynamoDB(this);

    /***
     * API Gateway
     */
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
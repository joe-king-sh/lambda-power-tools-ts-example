import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class LambdaFunction extends Construct {
  readonly lambdaFunction: lambda.Function;

  constructor(
    readonly scope: Construct,
    readonly id: string,
    readonly props: Omit<lambda.FunctionProps, "runtime" | "handler"> &
      Partial<lambda.FunctionProps>
  ) {
    super(scope, id);

    this.lambdaFunction = new lambda.Function(scope, "Lambda", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "index.handler",
      ...props,
      tracing: lambda.Tracing.ACTIVE,
    });
  }
}

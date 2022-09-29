import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { LambdaFunction } from "../../utils/lambda";
import * as path from "path";

const distPath = path.join(__dirname, "../../../../app/dist/handlers");

type LambdaFunctionsProps = {
  ddbName: string;
};
export class LambdaFunctions {
  lambdaFunctions: { [key in string]: lambda.Function };

  constructor(readonly scope: Construct, readonly props: LambdaFunctionsProps) {
    new LambdaFunction(scope, "postTodo", {
      code: new lambda.AssetCode(`${distPath}/putTodo`),
      environment: {
        DDB_NAME: props.ddbName,
      },
    });
  }
}

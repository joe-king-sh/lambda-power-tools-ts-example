import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { MyNodejsFunction } from "../../components/nodejsFunction";
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

const distPath = path.join(__dirname, "../../../../app/dist/handlers");

type LambdaFunctionsProps = {
  ddbName: string;
};
export class LambdaFunctions {
  lambdaFunctions: Array<{ [key in string]: NodejsFunction }> = [];

  constructor(readonly scope: Construct, readonly props: LambdaFunctionsProps) {
    const fileNames: string[] = ["postTodo"];

    fileNames.forEach((fileName: string) => {
      const nodeJsFunction = new MyNodejsFunction(scope, fileName, {
        handlerFileName: fileName,
      }).nodeJsFunction;
      this.lambdaFunctions.push({ fileName: nodeJsFunction });
    });
  }
}

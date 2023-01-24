import 'dotenv/config';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateWay from 'aws-cdk-lib/aws-apigateway';

export class AppInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this, "BaseLayer", {
      code: lambda.Code.fromAsset('lambda_base_layer/layer.zip'),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_9]
    });

    // The code that defines your stack goes here
    const apiLambda = new lambda.Function(this, "ApiFunction", {
      runtime: lambda.Runtime.PYTHON_3_9,
      code: lambda.Code.fromAsset('../app/'),
      handler: 'server.handler',
      layers: [layer],
      environment: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? '',
      }
    });

    const serverApi = new apiGateWay.RestApi(this, "RestApi", {
      restApiName: "Server Api Gate"
    });

    serverApi.root.addProxy({
      defaultIntegration: new apiGateWay.LambdaIntegration(apiLambda),
    });
  }
}

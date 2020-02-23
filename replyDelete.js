import * as dynamicDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context){
    const params = {
        TableName: "mlog-reply",
        Key: {
            //userId: event.requestContext.identity.cognitoIdentityId,
            commentId: event.pathParameters.id
        }
    };

    try {
        await dynamicDbLib.call("delete", params);
        return success({ status: true});
    } catch (e) {
        console.log(e);
        return failure({ status: false});
    }
}
import * as dynamicDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context){
    const params = {
        TableName: "mlog-board2",
        Key: {
            //userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.content_id
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
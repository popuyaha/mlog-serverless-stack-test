import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context){
    const data = JSON.parse(event.body);
    const params = {
        TableName: "mlog-reply",
        Key: {
            commentId: event.pathParameters.id
        },
        UpdateExpression: "SET context = :context, updated_at = :updated_at",
        ExpressionAttributeValues: {
            ":context": data.context,
            ":updated_at": Date.now()
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        await dynamoDbLib.call("update", params);
        return success({ status: true});
    } catch (e) {
        console.log(e);
        return failure({ status: false });
    }
}
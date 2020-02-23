import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context){
    const data = JSON.parse(event.body);
    const params ={
        TableName: "mlog-reply",
        FilterExpression: "noteId = :noteId",
        ExpressionAttributeValues: {
            ":noteId": data.noteId
        }
    };

    try {
        const result = await dynamoDbLib.call("scan", params);
        return success(result.Items);
    } catch (e) {
        console.log(e);
        return failure({ status: false});
    }
}
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context){
    const data = JSON.parse(event.body);
    const params = {
        TableName: "mlog-notes",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        },
        UpdateExpression: "SET content = :content, attachment = :attachment, title = :title, updateAt = :updateAt",
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content || null,
            ":title": data.title || null,
            ":updateAt":Date.now()

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
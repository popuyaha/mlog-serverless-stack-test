import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const params ={
        TableName: "mlog-board2",
        Key: {
            noteId: event.pathParameters.content_id
        }
    };

    try {
        const result = await dynamoDbLib.call("get", params);
        if(result.Item){
            return success(result.Item);
        }else{
            return failure({ status: false, error: "Item not found"});
        }
    } catch (e) {
        console.log(e);
        return failure({ status: false});
    }
}
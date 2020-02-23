import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback){
  const data = JSON.parse(event.body);
  const params = {
    TableName: "mlog-board2",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      context: data.context,
      username: data.username,
      title: data.title,
      updated_at: null,
      //atatachment: data.atatachment,
      created_at: Date.now()
    }
  };

  try{
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch(e) {
    console.log(e);
    return failure({ status: false});
  }
}
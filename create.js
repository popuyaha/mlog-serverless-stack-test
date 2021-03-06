import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback){
  const data = JSON.parse(event.body);
  console.log(data,"데이터들은?");
  const params = {
    TableName: "mlog-notes",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      createAt: Date.now(),
      atatachment: data.atatachment,
      title: data.title,
      updateAt: null
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
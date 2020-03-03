import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback){
  const data = JSON.parse(event.body);
  let params = {};
  if(data.flag){    //대댓글
    params = {
      TableName: "mlog-reply",
      Item: {
        userId: event.requestContext.identity.cognitoIdentityId,
        noteId: data.noteId || null,
        commentId: uuid.v1(),
        context: data.context,
        username: data.username,
        updated_at: null,
        created_at: Date.now(),
        name:data.name,
        subcomment_id: uuid.v1() || null,
        key_comment_id: data.key_comment_id || null
      }
    };
  }else{            //댓글
    params = {
      TableName: "mlog-reply",
      Item: {
        userId: event.requestContext.identity.cognitoIdentityId,
        noteId: data.noteId || null,
        commentId: uuid.v1(),
        context: data.context,
        username: data.username,
        updated_at: null,
        created_at: Date.now(),
        name:data.name,
      }
    };
  }
  try{
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch(e) {
    console.log(e);
    return failure({ status: false});
  }
}
import json
import boto3
import time
from boto3.dynamodb.conditions import Key

client = boto3.client('dynamodb')
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table('http-crud-tutorial-items')
tableName = 'http-crud-tutorial-items'


def lambda_handler(event, context):
    print(event)
    body = {}
    statusCode = 200

    try:
        if event['routeKey'] == "DELETE /notes/{user}/{noteid}":
            key={
                'PK': "USER#" + event['pathParameters']['user'],
                'SK': "ID#" + event['pathParameters']['noteid'],
            }
            response = table.delete_item(Key=key,
                ConditionExpression="attribute_exists(PK) AND attribute_exists(SK)"
            )
            print(key)
            print(response)
            body = 'Deleted item ' + event['pathParameters']['noteid']
        elif event['routeKey'] == "POST /user":
            requestJSON = json.loads(event['body'])
            table.put_item(
                Item={
                    'PK': "USER#" + requestJSON['user'],
                    'SK': "USER#" + requestJSON['user'],
                    'user': requestJSON['user'],
                })
            body = 'Post user ' + requestJSON['user']  
        elif event['routeKey'] == "POST /notes/{user}":
            requestJSON = json.loads(event['body'])
            cur_time = str(time.time())
            table.put_item(
                Item={
                    'PK': "USER#" + event['pathParameters']['user'],
                    'SK': "ID#" + cur_time,
                    'user': event['pathParameters']['user'],
                    'id': cur_time,
                    'note': requestJSON['note'],
                })
            body = 'Posted note: ' + requestJSON['note'] + ' for user ' + event['pathParameters']['user']  
        elif event['routeKey'] == "GET /notes/{user}":
            user = "USER#" + event['pathParameters']['user']
            query_kwargs = {
                "KeyConditionExpression": Key("PK").eq(user)
                & Key("SK").begins_with("ID#")
            }
            query = table.query(**query_kwargs)
            responseBody = []
            for items in query["Items"] :
                responseItems = [
                    {'user': items['user'], 'id': items['id'], 'note': items['note']}]
                responseBody.extend(responseItems)
            body = responseBody 
    except KeyError:
        statusCode = 400
        body = 'Unsupported route: ' + event['routeKey']
    except Exception as e:
        print(e)
        statusCode = 500
        body = "Internal Error"
    body = json.dumps(body)
    res = {
        "statusCode": statusCode,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": body
    }
    return res
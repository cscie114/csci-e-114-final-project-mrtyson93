https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html

curl -X "POST" -H "Content-Type: application/json" -d "{\"user\": \"mrtyson\"}" https://rb6iu28mgb.execute-api.us-east-1.amazonaws.com/user      

curl -X "GET" -H "Content-Type: application/json" https://rb6iu28mgb.execute-api.us-east-1.amazonaws.com/notes/mrtyson

curl -X "DELETE" -H "Content-Type: application/json" https://rb6iu28mgb.execute-api.us-east-1.amazonaws.com/notes/mrtyson/1714771951.4769034

curl -X "POST" -H "Content-Type: application/json" -d "{\"note\": \"this is a note\"}" https://rb6iu28mgb.execute-api.us-east-1.amazonaws.com/notes/mrtyson

'use strict';

console.log('Loading function');

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);


const tableName = process.env.TABLE_NAME;

exports.handler = (event, context, callback) => {
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    dynamo.send(new ScanCommand({ TableName: tableName }), done);
};
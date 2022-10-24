import * as dotenv from 'dotenv';
dotenv.config();

import { CosmosClient } from "@azure/cosmos";

const cosmosClient = new CosmosClient({ endpoint, key });

const key = process.env.COSMOS_KEY;
const endpoint = process.env.COSMOS_ENDPOINT;

// Uniqueness for database and container
const timeStamp = + new Date();

// Set Database name and container name with unique timestamp
const databaseName = `contoso_${timeStamp}`;
const containerName = `products_${timeStamp}`;
const partitionKeyPath = ["/categoryName"]

const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseName });
console.log(`${database.id} database ready`);

const { container } = await database.containers.createIfNotExists({
    id: containerName,
    partitionKey: {
        paths: partitionKeyPath
    }
});
console.log(`${container.id} container ready`);


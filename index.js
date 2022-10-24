import * as dotenv from 'dotenv';
dotenv.config();

import { CosmosClient } from "@azure/cosmos";


const key = process.env.COSMOS_KEY;
const endpoint = process.env.COSMOS_ENDPOINT;

// Uniqueness for database and container
const timeStamp = + new Date();

// Set Database name and container name with unique timestamp
const databaseName = `contoso_${timeStamp}`;
const containerName = `products_${timeStamp}`;
const partitionKeyPath = ["/categoryName"]

const cosmosClient = new CosmosClient({ endpoint, key });

const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseName });
console.log(`${database.id} database ready`);

const { container } = await database.containers.createIfNotExists({
    id: containerName,
    partitionKey: {
        paths: partitionKeyPath
    }
});
console.log(`${container.id} container ready`);

// interacting with data for the containers

const cities = [
    { id: "1", name: "Olympia", state: "WA", isCapitol: true },
    { id: "2", name: "Redmond", state: "WA", isCapitol: false },
    { id: "3", name: "Chicago", state: "IL", isCapitol: false }
];

for (const city of cities) {
    container.items.create(city);
}

// examples of how to query the database container

// await container.item("1").read();
// await container.item("1").delete();

const { resources } = await container.items
  .query("SELECT * from c WHERE c.isCapitol = true")
  .fetchAll();
for (const city of resources) {
  console.log(`${city.name}, ${city.state} is a capitol `);
}
require('dotenv').config();

const { CosmosClient } = require("@azure/cosmos")
const axios = require('axios')

const key = process.env.COSMOS_KEY;
const endpoint = process.env.COSMOS_ENDPOINT;

// Uniqueness for database and container
const timeStamp = + new Date();

// Set Database name and container name with unique timestamp
const databaseName = `contoso_${timeStamp}`;
const containerName = `products_${timeStamp}`;
const partitionKeyPath = ["/categoryName"]

const cosmosClient = new CosmosClient({ endpoint, key });

async function saveData(dataApi) {
  console.log("save data", dataApi)

  const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseName });
  console.log(`${database.id} database ready`);
  
  const { container } = await database.containers.createIfNotExists({
      id: containerName,
      partitionKey: {
          paths: partitionKeyPath
      }
  });
  console.log(`${container.id} container ready`);
  
  container.items.create(dataApi)
  .catch(err => {
    console.log("error saving: ", err)
  })

  // examples of how to query the database container
  // container.item("1").read()
  // await container.item("1").delete()
  
  const { resources } = await container.items
  .query("SELECT * from c WHERE c.title = 'delectus aut autem'")
  .fetchAll();
  console.log(` is it complete? ${dataApi.completed}`)
}

function apiCall() {
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
      const data = response.data;
      console.log("data api", data)
      return data
    })
    .then(data => {
      console.log("then data api", data)
      saveData(data)
    })
    .catch(err => {
      console.log('Error: ', err);
    })
}

apiCall()

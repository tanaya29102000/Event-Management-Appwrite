import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your endpoint
  .setProject('670d226f002b0056ba88'); // Replace with your Project ID

const database = new Databases(client);

export { client, database };

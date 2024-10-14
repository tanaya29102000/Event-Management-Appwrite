import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT) // Use environment variable for endpoint
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID); // Use environment variable for Project ID

const database = new Databases(client);

export { client, database };

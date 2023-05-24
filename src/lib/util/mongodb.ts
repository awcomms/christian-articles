import { MONGO_AUTH } from "$env/static/private";
import { MongoClient } from "mongodb";

const uri = `mongodb+srv://${MONGO_AUTH}@call.arg4uux.mongodb.net/?retryWrites=true&w=majority`;

export const client = new MongoClient(uri)

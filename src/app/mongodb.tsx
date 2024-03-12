import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb+srv://vocalbanana:<password>@cluster0.xstryhu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

// if (!process.env.MONGODB_URI) {
//   throw new Error('Add Mongo URI to .env.local')
// }
client = new MongoClient(uri, options)
clientPromise = client.connect()

export default clientPromise
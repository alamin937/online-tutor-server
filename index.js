const express = require('express')
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 5000


// middelware
app.use(cors())
app.use(express.json())


app.get('/', (req,res) =>{
    res.send('Hello World')
})



var uri = `mongodb://${process.env.DB_USER}:${process.env.BD_PASS}@cluster0-shard-00-00.bzphb.mongodb.net:27017,cluster0-shard-00-01.bzphb.mongodb.net:27017,cluster0-shard-00-02.bzphb.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-rs3vfq-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
      await client.connect();
      const database = client.db("Tutor");
      const studentTuitionCollection = database.collection("Student");
      // create a document to insert
      const doc = {
        title: "Record of a Shriveled Datum",
        content: "No bytes, no problem. Just insert a document, in MongoDB",
      }
      const result = await studentTuitionCollection.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);








app.listen(port, () =>{
    console.log('running port', port)
} )
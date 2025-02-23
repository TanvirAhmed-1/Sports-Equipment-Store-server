const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port=process.env.PORT || 5000
const app=express()

// middleWare



// store
// eAocCbuMqN00Tvcv




const uri = "mongodb+srv://store:eAocCbuMqN00Tvcv@cluster0.0p516.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

  const StorCollection=client.db("StoreBD").collection("Product");


//   get product

app.get("/products",async(req,res)=>{
    const cursor=StorCollection.find()
    const result=await cursor.toArray()
    res.send(result)
})
// product add
  app.post("/products",async(req,res)=>{
    const userdata=req.body;
    const result=await StorCollection.insertOne(userdata)
    res.send(result);
  })

//   update product
app.get("/products/:id",async(req, res)=>{
    const id=req.params.id
  const query={_id: new ObjectId (id)}
    const result=await StorCollection.findOne(query)
    res.send(result)
})

app.put("/products/:id",async(req,res)=>{
    const id=req.params.id
    const data=req.body
    console.log(id,data)
    const options = { upsert: true };
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
        $set: {
                image:data.image,
                  itemName:data.itemName,
                  categoryName:data.categoryName,
                  description:data.description,
                  price:data.price,
                  rating:data.rating,
                  customization:data.customization,
                  processingTime:data.processingTime,
                  stockStatus:data.stockStatus,
                  userEmail:data.userEmail,
                  userName:data.userName,
        },
  
      };
    
      const result=await StorCollection.updateOne(filter,updateDoc,options)
      res.send(result)
})


// Product Delete

app.delete("/products/:id",async(req,res)=>{
  const id=req.params.id
  console.log(id)
  const query={_id : new ObjectId(id)}
  const result=await StorCollection.deleteOne(query)
  res.send(result)
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("The CURD is Running")
})

app.listen(port,()=>{
    console.log(`simple curd is running port is: ${port}`)
})

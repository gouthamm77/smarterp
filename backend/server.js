import express from 'express';
import cors from 'cors';
import {MongoClient} from 'mongodb';

const app = express();
app.use(cors());  //Enable Cross Origin
app.use(express.json()); //Enable JSON for transactions

const url = "mongodb+srv://admin:admin@cluster0.a2mda3x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "erp";
const client = new MongoClient(url); //Object for MongoDB

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log('Server running on http://localhost:${PORT}');
});

//Testing Service
app.get("/", async (req, res)=>{
    res.status(200).json("Hello World from Express JS");
});

//SIGN UP OPERATION
app.post("/signup", async (req, res)=>{
    try
    {
        client.connect(); //Establish connection with MongoDB
        const db = client.db(dbName); //Connecting wit the DB

        db.collection("users").insertOne(req.body); //INSERT

        res.status(200).json("Registered Successfully");
    }catch(err)
    {
        console.log(err);
    }finally
    {
        client.close(); // Close the Connection
    }
});

// mongodb+srv://admin:admin@cluster0.tbdmmt7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://admin:<db_password>@cluster0.j4wmui3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
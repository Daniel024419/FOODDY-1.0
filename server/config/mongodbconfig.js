const { MongoClient, ServerApiVersion } = require('mongodb');
///env viriables
const dotenv = require("dotenv");
dotenv.config();

const username = process.env.MongoDbOnlineUsername;
const password = process.env.MongoDbOnlinePass;
const MongoDbOnlineDbname = process.env.MongoDbOnlineDbname;
const clusterName = 'Cluster0';
    // Replace the uri string with your connection string.
    //const uri = "mongodb+srv://"+username+":"+password+"@"+clusterName+".uzkrp1a.mongodb.net/?retryWrites=true&w=majority";
    //offline
    //mongodb://localhost:27017/MongoDbOnlineDbname 
    const uri = "mongodb://localhost:27017/MongoDbOnlineDbname";
    
    // Replace the uri string with your connection string.
       const client = new MongoClient(uri);
    
       const database = client.db(MongoDbOnlineDbname);

        //end
        if(database){
         console.log("mongo Database is connected..")

        }else{
          console.log("mongo db not connected")
        }
        

        
     

module.exports = { database:database };

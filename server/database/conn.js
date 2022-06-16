import { MongoClient } from 'mongodb';
import debug from 'debug';
import dotenv from 'dotenv';

dotenv.config({ path: "./config.env" });
const dbDebug = debug('server:dbConnect');
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString);
const defaultDbName = "budgetory";

let _db;

export const connectToServer = function(callback) {
    client.connect(function (err, db){
        if (db){
            _db = db.db(defaultDbName);
            dbDebug(`Successfully connected to ${defaultDbName} on MongoDB`);
        }
        
        return callback(err);
    });
} 

export const getDb = function() {
    return _db;
}
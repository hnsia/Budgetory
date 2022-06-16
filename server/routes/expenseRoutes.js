import express from 'express';
import debug from 'debug';
import { getDb } from '../database/conn';
import { ObjectId } from 'mongodb';
import moment from 'moment';

const expenseDebug = debug('server:expenseRoutes');
const expenseRoutes = express.Router();

// This section will help you get a list of all the records.
expenseRoutes.route("/").get((req, res) => {
    let db_connect = getDb();

    db_connect
        .collection("expenses")
        .find({})
        .toArray((err, result) => {
            if (err) {
                expenseDebug(`Error getting expenses.`);
                throw err;
            }
            res.json(result);
        });
});

// This section will help you get a single record by id.
expenseRoutes.route("/:id").get((req, res) => {
    let db_connect = getDb();
    let query = { _id: ObjectId( req.params.id )};

    db_connect
        .collection("expenses")
        .findOne(query, (err, result) => {
            if (err) {
                expenseDebug(`Error getting expense with id ${req.params.id}.`);
                throw err;
            }
            res.json(result);
        });
    
});

// This section will help you create a new record.
expenseRoutes.route("/create").post((req, res) => {
    let db_connect = getDb();
    let timestamp = moment().format("DD/MM/YYYY hh:mm A");
    let expenseObj = {
        name: req.body.name,
        expenseType: req.body.expenseType,
        amount: req.body.amount,
        description: req.body.description,
        expenseDate: req.body.expenseDate,
        userId: req.body.userId,
        currencyISO: req.body.currencyISO,
        createdDate: timestamp,
        lastModifiedDate: timestamp
    };

    db_connect
        .collection("expenses")
        .insertOne(expenseObj, (err, result) => {
            if (err) {
                expenseDebug(`Error creating expense.`);
                throw err;
            }
            res.json(result);
        });
    
});

// This section will help you update a record by id.
expenseRoutes.route("/update/:id").post((req, res) => {
    let db_connect = getDb();
    let query = { _id: ObjectId( req.params.id )};
    let timestamp = moment().format("DD/MM/YYYY hh:mm A");
    let expenseObj = {
        $set: {
            name: req.body.name,
            expenseType: req.body.expenseType,
            amount: req.body.amount,
            description: req.body.description,
            expenseDate: req.body.expenseDate,
            userId: req.body.userId,
            currencyISO: req.body.currencyISO,
            lastModifiedDate: timestamp
        }
    };

    db_connect
        .collection("expenses")
        .updateOne(query, expenseObj, (err, result) => {
            if (err) {
                expenseDebug(`Error updating expense `);
                throw err;
            }
            res.json(result);
        });
    
});

// This section will help you delete a record
expenseRoutes.route("/:id").delete((req, res) => {
    let db_connect = getDb();
    let query = { _id: ObjectId( req.params.id )};

    db_connect
        .collection("expenses")
        .deleteOne(query, (err, result) => {
            if (err) {
                expenseDebug(`Error deleting expense with id ${req.params.id}.`);
                throw err;
            }
            res.json(result);
        });
    
});

export default expenseRoutes;
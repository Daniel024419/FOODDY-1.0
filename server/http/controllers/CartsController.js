//multer and upload location
const multer = require("multer");

//file system
const fs = require("fs");
const mongodbconfig= require('../../config/mongodbconfig');
const db_con = mongodbconfig.database;
//path
const path = require("path");
const { MongoClient } = require('mongodb');
//index controllers

carts = async (req, res, next) => {
  const userId = req.query.userId;

  try {
    if (!userId) {
      // Handle missing userId
      res.status(400).json({ error: 'userId is required' });
      console.log("bad request ,cart fetching");

      return;
    }

    const carts = db_con.collection('carts');
    const cartData = await carts.find({ userId }).toArray();

    if (cartData.length === 0) {
      // Handle when no cart data is found for the user
      res.status(404).json({ error: 'No cart data found for the user' });

      console.log("no data")
      return;
    }

    res.json(cartData);
    console.log('Cart data fetched successfully', cartData.length, 'items for userId', userId);

    next();
  } catch (e) {
    console.error('Error fetching cart data:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports={
    carts:carts,
     
}
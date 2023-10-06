
const session = require('express-session');
const express = require('express'); 
const app = express();

AuthMiddleware = async  (req, res, next) => {
   
    const Authenticated = true;

    function isAuthenticated() {
        
        if(Authenticated === true){
        return true;
        }else{
        return false;
        }
    }
     
    // Check if the user is authenticated (using session or any other method)
    if (isAuthenticated()) {
      // User is authenticated, allow access to routes in this group
      next();
     res.status(200);

    } else {
      // User is not authenticated, redirect to login page or send an unauthorized response
      res.status(401).json({message : 'Unauthorized'}); 
      // Or you can send an unauthorized response:
       //res.status(401).send('Unauthorized');
    }
  }

  module.exports={
    AuthMiddleware:AuthMiddleware,
  }
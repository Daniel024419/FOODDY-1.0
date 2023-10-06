const express = require('express'); 
const app = express();
const multer = require("multer");

const mongodbconfig= require('./config/mongodbconfig');
const db_con = mongodbconfig.database;
const cors = require('cors');
// Enable CORS for all routes
app.use(cors());
async function ftech()
{

	    const carts = db_con.collection('carts');
        const cart = await carts.find({}).toArray();

	
			const cartData = {

			userId: "A12sesbdgd",
			amount: "300.00",
			restaurant: "Kisme1",
			sellerId: "aa-dd-ee-cc",
			type: "Kenkey",
			created_at: "2023-10-05",
			image: "pic.jpg"

			}

			// const query = await carts.insertOne(cartData);
			// if(query){
			// 	console.log("data stored ");
			// }else{
			// 	console.log("data not stored");
			// }
			

		  
        //console.log(cart);
} 

ftech();

var bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
///env viriables
const dotenv = require("dotenv");
dotenv.config();
// Configure Multer storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, "uploads/"); // Specify the directory where uploaded files will be stored
	},
	filename: (req, file, cb) => {
	  cb(null, Date.now() + "-" + file.originalname); // Specify file naming scheme
	},
  });
  
  const upload = multer({ storage });
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })
const session = require('express-session');

// Initialization cookie
app.use(cookieParser());
app.use(express.json());
//defined port or 3sfs000
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(urlencodedParser);
// time to live for cookies
const oneDay=100*60*60*24;
app.use(session({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: true,
	resave: true,
    cookie:{maxAge:oneDay},
}));


//middlewares
const Middlewares  = require('./http/middlewares/authMiddleware');

//index conrollers
const  IndexController  = require('./http/controllers/indexController');
//carts
const CartsController  = require('./http/controllers/CartsController');

//auth
const AuthController  = require('./http/controllers/AuthController');

//error_404
const error_404_PNF  = require('./http/controllers/error_404');


// Middleware for authentication
app.use('/auth', Middlewares.AuthMiddleware);

//login
app.post('/login',upload.single('fileInput'),AuthController.auth);
//end
app.get('/',IndexController.foods); 
//carts
app.get('/auth/carts/:userId',CartsController.carts); 



app.listen(PORT, (error) =>{ 
	if(!error)
        console.log("Server is Running on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 

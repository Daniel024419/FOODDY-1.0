
const carts = ["Koko", "Waakye"];
const role = "Admin";
const dbPassword = "";
const password_input="";
const Authenticated = false;
//multer and upload location
const multer = require("multer");
const bcrypt = require('bcryptjs');

const Admin_Session = {
  userId: "",
  user_mail: "",
  role: "",
  tel: "",
  created_at: "",
};

const buyer_Session = {
  userId: "",
  user_mail: "",
  role: "",
  tel: "",
  created_at: "",
};

const seller_Session = {
  userId: "",
  user_mail: "",
  role: "",
  tel: "",
  created_at: "",
};

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

auth = async (req, res, next) => {
  try {
    //fetch user role from db
    var user_input_mail = req.body.user_input_mail;
    var password_input = req.body.password_input;

    

    if (dbPassword != "" && password_input != "") {
      bcrypt.compare(password, dbPassword, async function (err, verified) {
        if (err) {
          console.log(err);
        }
        
        if (verified) {
          //start
          if (role == "Admin") {
            //dashboard
            //save session user
            req.session.Admin = Admin_Session;
            req.session.save();
            const Admin = req.session.Admin;
            console.log(Admin);
            res.status(200).json({
              messsage: "Logged in as " + role,
              data: Admin,
              role: role,
              Authenticated: Authenticated,
            });
          } else if (role == "Seller") {
            //seller
            //food upload
            //save session user
            req.session.Seller = seller_Session;
            req.session.save();
            const Seller = req.session.Seller;
            console.log(Admin);
            res.status(200).json({
              messsage: "Logged in as " + role,
              data: Seller,
              role: role,
              Authenticated: Authenticated,
            });
          } else if (role == "Buyer") {
            //buyer
            //save session user
            req.session.Buyer = buyer_Session;
            req.session.save();
            const Buyer = req.session.Buyer;
            console.log(Buyer);
            res.status(200).json({
              messsage: "Logged in as " + role,
              data: Buyer,
              role: role,
              Authenticated: Authenticated,
            });
          }
        }
        //end

        //Bcrypt
      });
    }
  } catch (e) {
    console.log("auth error", e);
  }
  //end
  next();
};

module.exports = {
  auth: auth,
};

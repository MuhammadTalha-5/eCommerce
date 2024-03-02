const express = require('express');
const con = require('./db/config');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
//const { v4: uuidv4 } = require('uuid');
const upload = require('./upload');
const multer = require('multer');
const path = require("path");

const salt = 10;

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config({path: "./config.env"})
const port = process.env.PORT;


/* Login  */
app.post('/api/login', (req, resp)=>{
    const sql = "SELECT * FROM admin WHERE Email = ?";

    con.query(sql,req.body.email,(err,result)=>{
    
        if(err) return resp.json({status: "Error in connecting to server, please try again later."})
        if(result.length > 0){
            bcrypt.compare(req.body.password.toString(),result[0].Password,(err,response)=>{
                if(err) return resp.json({status: "Password Compare Error"});
                if(response){
                    return resp.json({status: "Login Successfully"})
                }else{
                    return resp.json({status: "Incorrect Password"})
                }
            })
        }
        else{
            resp.json({ status: "Invalid Email Address" });
        }
    })
})
/* --------- Login End ----------  */


/* Adding Category  */
app.post("/api/addcategory",(req,res)=>{
    sqlselect = "SELECT * FROM categories where categoryName = ?";
    con.query(sqlselect, req.body.categoryname, (err, result)=>{
        if(err) return res.json({Status: "504"})

        /*  Check if Category is already present  */
        if(result.length > 0){
            return res.json({Status: "present"})
        }
        /* If not present then add the category */
        else{
            sql = "INSERT INTO categories (categoryName, categoryDescription) VALUES (?, ?)";
            values = [
                categoryname = req.body.categoryname,
                categorydescription = req.body.categorydescription
            ];
            con.query(sql, values, (err) => {
                if (err) return res.json({ Status: "504" });
                return res.json({ Status: "success" })
            });
        }
    })
});
/* --------- Adding Category End ----------  */


/* Reading Categories table */
app.get("/api/getcategories", (req,res)=>{
    sql = "SELECT * FROM categories";
    con.query(sql,(err,data)=>{
        if(err) return res.json({getcatStatus: "504"})
        if(data.length > 0){
            return res.json(data)
        }
        else{
            return res.json({getcatStatus: "404"})
        }
    })
})
/* --------- Reading Categories table Ends ---------- */



/* Delete Category */
app.delete("/api/deletecategory/:categoryId", (req, res)=>{
    let categoryId = req.params.categoryId;

    sql = "DELETE FROM categories where categoryId = ?";
    con.query(sql, categoryId, (err)=>{
        if(err) {
            return res.json({deletecategorystatus: "504"})
        }
        else{
        return res.json({deletecategorystatus: "success"})
        }
    })
});
/* ------ Delete Category End ----- */


/* Update Category  */
app.put("/api/updatecategory/:categoryId",(req,res)=>{
    let categoryId = req.params.categoryId;
    values = [
        categoryName =  req.body.categoryName,
        categoryDescription = req.body.categoryDescription,
        categoryId
    ];
    sql = "UPDATE categories SET categoryName = ?, categoryDescription = ? WHERE categoryId = ?";

    con.query(sql, values, (err)=>{
        if(err){
            return res.json({editStatus: "504"})
        }
        else{
            return res.json({editStatus: "success"})
        }
    });
    
});
/* ------ Update Category End ------  */


/* ADD CUSTOMER  */
app.post("/api/addcustomer", (req,res)=>{
    sqlSelect = "SELECT * FROM customers WHERE email = ?";
    con.query(sqlSelect,req.body.email, (err, result)=>{
        if(err){
            return res.json({addCustStatus: "504"})
        }
        if(result.length > 0){
            return res.json({addCustStatus: "present"})
        }
        else{
            const hash = bcrypt.hashSync(req.body.password,salt);
            sql = "INSERT INTO customers (name, email, password, mobile, shippingaddress, province, city,postcode, country) VALUES (?,?,?,?,?,?,?,?,?)";
            values = [
                custName = req.body.name,
                custEmail = req.body.email,
                custPassword = hash,
                custMobile = req.body.mobile,
                custAddress = req.body.address,
                custProvince = req.body.province,
                custCity = req.body.city,
                custPostcode = req.body.postcode,
                custCountry = req.body.country
            ];
            
            con.query(sql, values, (err)=>{
                if(err){
                    return res.json({addCustStatus: "504"})
                }
                else{
                    return res.json({addCustStatus: "success"})
                }
            })
        }
    })
});
/* ----- ADD CUSTOMER End ----- */



/* Reading data from customers table  */
app.get("/api/getcustomers",(req,res)=>{
    sql = "SELECT * FROM customers";
    con.query(sql,(err,data)=>{
        if(err){
            return res.json({getCustStatus: "504"})
        }
        else if(data.length > 0){
            return res.json(data)
        }
        else{
            return res.json({getCustStatus: "failed"})
        }
    });
});
/* ----- Reading data from customers table End -----  */


/*  Deleting Customer Record */
app.delete("/api/deletecustomer/:customerId",(req,res)=>{
    let customerId = req.params.customerId;
    sql =  "DELETE FROM customers WHERE customerID = ?";

    con.query(sql, customerId, (err)=>{
        if(err){
            return res.json({delCustStatus: "504"})
        }
        else{
            return res.json({delCustStatus: "success"})
        }
    });
});
/* -------- Deleting Customer Record --------  */


/* Update Customer  */
app.put("/api/updatecustomer/:customerId",(req,res)=>{
    const customerId = req.params.customerId;
    
    sqlUpdate = "UPDATE customers SET name = ?, email = ?, mobile = ?, shippingaddress = ?, province = ?, city = ?, postcode = ? WHERE customerID = ?";
                    values = [
                        req.body.name,
                        req.body.email,
                        req.body.mobile,
                        req.body.shippingaddress,
                        req.body.province,
                        req.body.city,
                        req.body.postcode,
                        customerId,
                    ];
                    con.query(sqlUpdate, values, (err)=>{
                        if(err){
                            return res.json({upCustStatus: "504"})
                        }
                        else{
                            return res.json({upCustStatus: "success"})
                        }
                    })
});



/*  ADDING NEW SELLER   */
app.post("/api/addseller", (req,res)=>{
    sql = "SELECT * FROM vendors WHERE email = ?";
    con.query(sql, req.body.email, (err,result)=>{
        if(err){
            return res.json({addSellerStatus: "504"})
        }
        if(result.length > 0){
            return res.json({addSellerStatus: "present"})
        }
        else{
            const hash = bcrypt.hashSync(req.body.password,salt);
            
            sqlInsert = "INSERT INTO vendors (name, email, mobile, address, password, businessName, businessDetails, categoryId) VALUES (?,?,?,?,?,?,?,?)";
            values = [
                req.body.name,
                req.body.email,
                req.body.mobile,
                req.body.address,
                hash, 
                req.body.businessName,
                req.body.businessDetails,
                req.body.selectedCategory,
            ];
            con.query(sqlInsert, values, (err)=>{
                if(err) {
                    return res.json({addSellerStatus: "500"})
                }
                else{
                    return res.json({addSellerStatus: "success"})
                }
            });
        }
    })    
});
/*  ------ ADDING NEW SELLER END ----- */



/* GETTING SELLERS  */
app.get("/api/getsellers",(req,res)=>{
    sql = "SELECT vendors.*, categories.categoryName FROM vendors LEFT JOIN categories ON vendors.categoryId = categories.categoryId";
    con.query(sql, (err,data)=>{
        if(err){
            return res.json({getSellerStatus: "504"})
        }
        else{
            return res.json(data)
        }
    });
});
/* ---- GETTING SELLERS END ----  */



/*  DELETING SELLER  */
app.delete("/api/deleteseller/:sellerId",(req,res)=>{
    let sellerId = req.params.sellerId;

    sql = "DELETE FROM vendors WHERE vendorId = ?";
    con.query(sql, sellerId, (err)=>{
        if(err){
            return res.json({delSellerStatus: "504"})
        }
        else{
            return res.json({delSellerStatus: "success"})
        }
    });
});
/* ---- DELETING SELLER END ----  */



/*  UPDATE SELLER  */
app.put("/api/updateseller/:sellerId", (req,res)=>{
    let sellerId = req.params.sellerId;
    
    sql = "SELECT * FROM vendors WHERE email = ? AND vendorId != ?";
    values = [
        req.body.email,
        sellerId
    ];
    con.query(sql,values,(err,result)=>{
        if(err){
            return res.json({upSellerStatus: "504"})
        }
        else{
            if(result.length > 0){
                return res.json({upSellerStatus: "present"})
            }
            else{
                sql = "UPDATE vendors SET name = ?, email = ?, mobile = ?, address = ?, businessName = ?, businessDetails = ?, categoryId = ? WHERE vendorId = ?";
                values = [
                    req.body.name,
                    req.body.email,
                    req.body.mobile,
                    req.body.address,
                    req.body.businessName,
                    req.body.businessDetails,
                    req.body.selectedCategory,
                    sellerId
                ];
                con.query(sql,values,(err)=>{
                    if(err){
                        return res.json({upSellerStatus: "504"})
                    }
                    else{
                        return res.json({upSellerStatus: "success"})
                    }
                });
            }
        }
    });
});


/*  ADDING PRODUCT  */
app.post("/api/addproducts", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.json({ addProdStatus: "400" });
        }

        let {
            title,
            description,
            quantity,
            weight,
            deliveryDays,
            deliveryFee,
            basePrice,
            discPrice,
            inStock,
            selectedVendor,
            selectedCategory,
            status,
            tags,
            productType,
            bidStartTime,
            bidEndTime,
            minBid,
            bidIncrement,
        } = req.body;

        if (!req.files || typeof req.files[Symbol.iterator] !== 'function') {
            console.log('req.files is not iterable');
            return res.json({ addProdStatus: "400" });
        }
        
        // Convert boolean to 0 or 1 for MySQL
        if (inStock === 'true'){
            inStock = 1;
        }else{
            inStock = 0;
        }
        
        // Insert into products table
        const productInsertQuery =
            "INSERT INTO products (title, description,quantity, weight, deliveryDays, deliveryFee, basePrice, discPrice, inStock, vendorId, categoryId, status, tags, productType) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        const productValues = [
            title,
            description,
            quantity,
            weight,
            deliveryDays,
            deliveryFee,
            basePrice,
            discPrice,
            inStock,
            selectedVendor,
            selectedCategory,
            status,
            tags,
            productType,
        ];
        
        con.query(productInsertQuery, productValues, (err, productResult) => {
            if (err) {
                return res.json({ addProdStatus: "500" });
            }

            const productId = productResult.insertId;

            const files = req.files;
            // Insert into media table
            const mediaInsertQuery =
                "INSERT INTO media (productId, fileType, fileName, filePath) VALUES (?,?,?,?)";

            files.forEach((file) => {
                const mediaValues = [productId, file.mimetype, file.filename, file.path];
                con.query(mediaInsertQuery, mediaValues, (err) => {
                    if (err) {
                        return res.json({ addProdStatus: "500" });
                    }
                });
            });

            // Insert into bids table
            if(productType === "bid"){
                const bidInsertQuery = "INSERT INTO bids (productId, bidStartTime, bidEndTime, minBid, bidIncrement) VALUES (?,?,?,?,?)";
                bidValues = [productId, bidStartTime, bidEndTime, minBid, bidIncrement];
                con.query(bidInsertQuery, bidValues, (err) => {
                    if (err) {
                        return res.json({ addProdStatus: "500" });
                    }
                });
            }
            return res.json({ addProdStatus: "200" });
        });
    });
});
// ----- ADD PRODUCT ENDS ------


// GET / READ NORMAL PRODUCTS
app.get("/api/getproducts/:productType", (req,res)=>{
    let productType = req.params.productType;

    if (productType === "normal"){
        selectProductsQuery = 
    "SELECT products.*, categories.categoryName, vendors.businessName FROM products LEFT JOIN categories ON products.categoryId = categories.categoryId LEFT JOIN vendors on products.vendorId = vendors.vendorId WHERE products.productType = ?";
    }
    else{
        selectProductsQuery = 
    "SELECT products.*, categories.categoryName, vendors.businessName, bids.bidStartTime, bids.bidEndTime, bids.minBid, bids.bidIncrement, bids.currentBid FROM products LEFT JOIN categories ON products.categoryId = categories.categoryId LEFT JOIN vendors on products.vendorId = vendors.vendorId LEFT JOIN bids ON products.productId = bids.productId WHERE products.productType = ?";
    }

    con.query(selectProductsQuery, productType, (err,result)=>{
        if(err){
            return res.json({getProductStatus: "500"})
        }
        else{
            return res.json(result)
        }
    });
});

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Read Data from Admin Table
app.get("/api/getadmin", (req,res)=>{
    sql = `SELECT * FROM Admin`;
    con.query(sql, (err,data)=>{
        if(err){
            return res.status(500).json({ getAdminStatus: "Database Error" });
        }
        else{
            res.status(200).json(data)
        }
    });
});






// Multer storage configuration for admin profile
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/admin/'); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, 'profile_' + Date.now() + ext); // Rename the file with a unique name
    },
  });
  const uploadPicture = multer({ storage: storage });

  app.post("/api/updateprofile", uploadPicture.single("profileImage"), (req, res) => {
    try {
      if (!req.file) {
        // Check if a file was provided in the request
        return res.status(400).json({ picUpload: "No file provided" });
      }
      let {firstName, lastName, email, mobile} = req.body;
  
      const filePath = req.file.path;
      const AdminID = 1;
  
      const sql = "UPDATE admin SET FirstName = ?, LastName = ?, Email = ?, Mobile = ?, Picture = ? WHERE AdminID = ?";
      values = [
        firstName,
        lastName,
        email,
        mobile,
        filePath,
        AdminID,
      ];
      con.query(sql, values, (err, result) => {
        if (err) {
          return res.status(500).json({ profileUpdate: "Database error" });
        }
  
        // Check if the update query affected any rows
        if (result.affectedRows === 1) {
          return res.status(200).json({ profileUpdate: "Success" });
        } else {

          return res.status(500).json({ profileUpdate: "No rows updated" });
        }
      });
    } catch (error) {
      return res.status(500).json({ profileUpdate: "Internal server error" });
    }
  });
  

  app.post("/api/changeadminpassword",(req,res)=>{
    const {oldPassword, newPassword} = req.body;
    const AdminId = 1;

    selectSqlQuery = "SELECT * FROM admin WHERE AdminID = ?";
    con.query(selectSqlQuery,AdminId,(err,result)=>{
        if(err){
            return res.json({ChangePassStatus: "500"})
        }
        else if(result.length > 0){
            bcrypt.compare(oldPassword,result[0].Password, (err,response)=>{
                if(err){
                    return res.json({ChangePassStatus: "501"})
                }
                if(response){
                    const hash = bcrypt.hashSync(newPassword,salt);
                    updateSqlQuery = "UPDATE admin SET Password = ? WHERE AdminID = ?";
                    con.query(updateSqlQuery,[hash,AdminId],(err)=>{
                        if(err){
                            return res.json({ChangePassStatus: "500"});
                        }
                        else{
                            return res.json({ChangePassStatus: "200"})
                        }
                    })
                }
                else{
                    return res.json({ChangePassStatus: "404"})
                }
            });
        }
    });
  });
app.listen(port, ()=>{
    console.log(`Server running on PORT: ${port} in ${process.env.NODE_ENV} mode`)
});
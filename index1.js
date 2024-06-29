import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import db from './dbConfig.js';
import youtubeRoutes from './server/routes/youtubeRoutes.js';

dotenv.config();
const app=express();
const port=process.env.PORT ;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs');
console.log(path.join(__dirname, 'public'));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
let fname,email;
app.get("/",(req,res)=>
{
    if(fname ==undefined)
    res.render("index.ejs");
  else
  {
    res.render("index.ejs",{
        login:fname
    })
  }
})

app.get("/about",(req,res)=>{
    res.send("about page");
})

app.get("/team",(req,res)=>{
    res.send("team page");
})

app.get("/Summarize-video",(req,res)=>{
    if(fname ==undefined)
    res.render("Summarize video.ejs");
  else
  {
    res.render("Summarize video.ejs",{
        login:fname
    })
  }

})


app.get("/loginpage",(req,res)=>{
    res.render("login.ejs")
})
app.get("/registerpage",(req,res)=>{
    res.render("register.ejs")
})
app.get("/logout",(req,res)=>{

    fname=undefined;
    email=undefined;
    res.render("index.ejs");
})
app.get("/profile:uname",(req,res)=>{
    let user=req.params.uname;
    db.query(`SELECT * FROM register WHERE email=$1 `,[email], (err, resu) => {
        if (err) {
          console.error("Error executing query", err.stack);
          res.render("login.ejs",{
            error:"server Error"});
        } else {
        let ans = resu.rowCount; 
         console.log(ans);
            if(ans>0)
            {
                let row=resu.rows[0];
                fname=row.firstname;
                email=row.email;
                let lname=row.lastname;
                let pass=row.pass;
                res.render("profile.ejs",{
                    login:fname,
                    fname:fname,
                    lname:lname,
                    pass:pass
                });
            }
            else
            res.render("login.ejs",{
        error:"Incorrect Password or email"});
                }
            });
})
app.post("/login",(req,res)=>{
    console.log(req.body);
    let uname=req.body.uname_email.trim();
    let pass=req.body.pass.trim();
    db.query(`SELECT * FROM register WHERE email=$1 AND pass=$2`,[uname,pass], (err, resu) => {
        if (err) {
          console.error("Error executing query", err.stack);
          res.render("login.ejs",{
            error:"server Error"});
        } else {
        let ans = resu.rowCount; 
         console.log(ans);
            if(ans>0)
            {
                let row=resu.rows[0];
                fname=row.firstname;
                email=row.email;
                res.render("index.ejs",{
                    login:fname
                });
            }
            else
            res.render("login.ejs",{
        error:"Incorrect Password or email"});
                }
            });
})

app.post("/register",(req,res)=>{
    console.log(req.body);
    let fname=req.body.fname.trim();
    let lname=req.body.lname.trim();
    let email=req.body.email.trim();
    let pass=req.body.pass.trim();
    let ans=-1;
    db.query(`
    INSERT INTO register (firstname, lastname, email, pass)
    VALUES ($1, $2, $3, $4);`,[fname,lname,email,pass], (err, resu) => {
        if (err) {
          console.error("Error executing query", err.stack);
          res.render("register.ejs",{
            error:"Account Already exists"});
        } else {
         ans = resu.rowCount; 
         console.log(ans);
            if(ans>0)
            {
                res.render("login.ejs",{
                    mess:"Registration Succesfully"
                });
            }
            else
            res.render("register.ejs",{
        error:"Account Already exists"});
                }
            });
     
})
app.post("/update",(req,res)=>{
    let fname2=req.body.fname;
    let lname=req.body.lname;
    let pass=req.body.pass;
    fname=fname2;
    db.query('UPDATE register SET firstname=$1, lastname=$2, pass=$3 WHERE email=$4',
    [fname, lname, pass, email]
    , (err, resu) => {
        if (err) {
          console.error("Error executing query", err.stack);
          res.render("profile.ejs",{
            login:fname,
            fname:fname,
            lname:lname,
            pass:pass,
            error:"Server Error"
        });
        } else {
         let ans = resu.rowCount; 
         console.log(ans);
            if(ans>0)
            {
                res.render("index.ejs",{
                    login:fname
                })
            }
            else
            res.render("profile.ejs",{
                login:fname2,
                fname:fname2,
                lname:lname,
                pass:pass,
                error:"Can not Update"
            });
                }
            });
})

app.use('/api', youtubeRoutes);

app.use((req, res, next) => {
  if (res.locals.summary) {
    res.render('Summarize video.ejs', {
        summary:res.locals.summary
    });
  } else {
    next();
  }
});

app.listen(port,()=>{
    console.log("server running on port no. " +port);
})


// Requiring path to so we can use relative routes to our HTML files
const path = require("path");


// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
 

  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });



  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
   console.log(req.user)
   if(req.user.userType==="recruiter"){
     console.log("I am a recruiter")
     res.sendFile(path.join(__dirname, "../public/recruiterView.html"));
   }else {
 res.sendFile(path.join(__dirname, "../public/members.html"));
   }
  });

  // gig route loads gig.html
  app.get("/gig", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/gigform.html"));
  });

  //route to the the recruiterGigs.html to render all gigs specified to the recruiter
  app.get("/recruiterGigs", (req, res)=>{
    if(req.user && req.user.userType === "recruiter"){
      res.sendFile(path.join(__dirname, "../public/recruiterGigs.html"));
    }else{
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  }) 

  //route to find a recruiter
  app.get("/findrecruiter", (req, res)=>{

    if(req.user && req.user.userType !== "recruiter"){
      res.sendFile(path.join(__dirname, "../public/findrecruiter.html"));
    } else{
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
    
});
}


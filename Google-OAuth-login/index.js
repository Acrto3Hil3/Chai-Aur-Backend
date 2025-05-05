import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";



const app = express();
dotenv.config();
app.use(session({
    secret: "secret_key",
    resave: false, // it will stop resaving the session if it is not modified
    saveUninitialized: true, // it will save the session even if it is not modified
}));

//*-*-*-*- Initialize Passport to authenticate users *-*-*-*

// it will initialize passport
app.use(passport.initialize());

// it will use the session to store the user information and integrate with passport-session,as the user information is stored in the session as they logged in
app.use(passport.session());

//*-*-*-*- Configure google OAuth credential *-*-*-*
console.log(process.env.GOOGLE_CLIENT_SECRET);
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => { // This function is called when the user is authenticated
    // The profile object contains the user information returned by Google
    console.log("User Profile: ", profile);

    // Here you can save the user information to your database
    return done(null, profile); //  profile is the user information returned by Google,we can use it to create a new user in our database

}))

//*-*-*-*- Serialize(saving the user data inside the session) and deserialize user(retriving the data from session) *-*-*-*

passport.serializeUser((user, done) => {
    console.log("User serialized: ", user);
    done(null, user);
}) // it will save the user information in the session
passport.deserializeUser((user, done) => done(null, user)); // it will retrieve the user information from the session

//*-*-*-*- Define the routes *-*-*-*
app.get("/", (req, res) => {
    res.send("<a href='/api/auth/google'>Login with Google</a>");
})

// app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }))

app.get("/api/auth/google", (req, res) => {

    const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&scope=profile email&state=${req.query.source || "default"}`;
    res.json({ redirectUrl });
});

; // it will redirect the user to the google login page

app.get("/api/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    console.log("User authenticated successfully");
    res.redirect("/profile");
})

app.get("/profile", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/");
    }
    res.send(`<h1>Hello ${req.user.displayName}</h1> <br> <a href='/logout'>Logout</a>`);
})
app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy(() => {
            console.log("Session destroyed");
            res.clearCookie("connect.sid");
            console.log("Cookie cleared");
            console.log("User logged out");
            res.redirect("/");
        })
    });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

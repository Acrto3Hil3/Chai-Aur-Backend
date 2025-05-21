import express from "express";
import { google } from "googleapis";
const app = express();
import dotenv from "dotenv";
import dayjs from "dayjs";
dotenv.config();

const oauth2client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const calendar = google.calendar({
  version: "v3",
});

const scopes = [
  "profile",
  "email",
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
];

let savedToken = "";

app.ge;
app.get("/", (req, res) => {
  res.send("<h1>Welcome buddy</h1>");
});
app.get("/google", (req, res) => {
  const url = oauth2client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.redirect(url);
});

app.get("/google/redirect_url", async (req, res) => {
  const code = req.query.code; // token from url
  const { tokens } = await oauth2client.getToken(code);
  oauth2client.setCredentials(tokens);
  savedToken = tokens;
  res.send("<h1>Welcome bro on calendar api</h1>");
});

app.get("/schedule_event", async (req, res) => {
  console.log(oauth2client.credentials.access_token);

  //   console.log("savedToken", savedToken);
  oauth2client.setCredentials(savedToken);

  const calendar = google.calendar({
    version: "v3",
    auth: oauth2client,
  }); // ✅ create here with auth

  await calendar.events.insert({
    calendarId: "primary",
    auth: oauth2client,
    requestBody: {
      summary: "Test",
      description: "This is for testing purpose",
      start: {
        dateTime: dayjs(new Date()).add(1, "day").toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: dayjs(new Date()).add(1, "day").add(1, "hour").toISOString(),
        timeZone: "Asia/Kolkata",
      },
      conferenceData: {
        createRequest: {
          requestId: "7qx8j0",
        },
      },

      attendees: [
        {
          email: "subhashyadav.equasar@gmail.com",
        },
        {
          email: "shubootera98146@gmail.com",
        },
      ],
    },
  });
  res.send({
    mess: "done",
  });
});

app.listen(3003, () => {
  console.log("Server starting at localhost:3003");
});

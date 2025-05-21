import axios from "axios";

import base64 from "base-64";

import dotenv from "dotenv";
dotenv.config();

const zoomAccountId = "WH_6Oqq0SC2ts4pZQVOB5A";
const zoomClientId = "tGHG3TaAQdiFq5jBhSdjfQ";
const zoomClientSecret = "NJOoMdOLiByvhWe8hhTthp4ne4EW1ra9";
// const value = process.env.VALUE;

// Debug environment variables to ensure they're loaded properly

const getAuthHeader = () => {
  const encodedCredentials = base64.encode(
    `${zoomClientId}:${zoomClientSecret}`
  );
  return {
    Authorization: `Basic ${encodedCredentials}`,
    "Content-Type": "application/json",
  };
};

const generateToken = async () => {
  try {
    // First debug what we're sending
    const headers = getAuthHeader();
    console.log(
      "Request URL:",
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`
    );

    console.log("Headers being sent:", {
      ...headers,
      Authorization: "Basic [HIDDEN]",
    });

    // Make the request with properly structured parameters
    const response = await axios.post(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`,
      {}, // Empty body - Zoom expects credentials in Authorization header
      { headers } // Headers properly passed as axios config
    );

    const responseData = response.data;

    console.log("Token generated successfully:", {
      access_token: responseData.access_token,
      token_type: responseData.token_type,
      expires_in: responseData.expires_in,
      value: value,
    });
    console.log("Whole response details : ", { ...response });

    return responseData?.access_token;
  } catch (error) {
    console.error("Error generating token from Zoom integration:");
    throw error;
  }
};
/*
const generateMeeting = async () => {
  try {
    const zoomAccessToken = await generateToken();

    const response = await axios.post(
      // `https://api.zoom.us/v2/users/${zoomAccountId}/meetings`,  // for particular user
      `https://api.zoom.us/v2/users/me/meetings`,
      // {
      //   topic: "Test Meeting",
      //   type: 1,
      //   start_time: new Date().toISOString(),
      //   duration: 30,
      //   timezone: "UTC",
      //   agenda: "Test Agenda",
      //   settings: {
      //     host_video: true,
      //     participant_video: true,
      //     mute_upon_entry: true,
      //     waiting_room: false,
      //     join_before_host: true,
      //     approval_type: 0,
      //     registration_type: 1,
      //     audio: "both",
      //     auto_recording: "none",
      //   },
      // },
      {
        topic: "Testing the event",
        default_password: false,
        duration: 30, // or 60 min
        password: "1234",
        // schedule_for: "utkarshsoft@solutions.com",
        // schedule_for: "jchill@example.com",
        settings: {
          allow_multiple_devices: true,
          // alternative_hosts: "shubootera98146@gmail.com",
          alternative_hosts_email_notification: true,
          audio: "both",
          breakout_room: {
            enable: true,
            rooms: [
              {
                name: "Room 1",
                participants: [
                  "shubootera98146@gmail.com",
                  "vikrant.koundal@equasar.com",
                ],
              },
            ],
          },
          calendar_type: 1,
          contact_name: "Utkarsh",
          contact_email: "shubootera98146@gmail.com",
          email_notification: true,
          encryption_type: "enhanced_encryption",
          host_video: true,
          focus_mode: true,
          // global_dial_in_countries: ["IN"],
          global_dial_in_numbers: [
            {
              country_name: "India",
              country_code: "91",
              number: "+91 0000000000",
              type: "toll",
            },
          ],
          host_video: true,
          join_before_host: true, // close meeting means host can join before the meeting starts

          meeting_authentication: false,
          meeting_invitees: [
            {
              email: "test@test.com",
            },
          ],
          mute_upon_entry: true,
          private_meeting: false,
          participant_video: true,
          registrants_email_notification: true,
          waiting_room: false,
          continuous_meeting_chat: {
            enable: true,
            auto_add_meeting_participants: true,
          },
          resources: [
            {
              resource_type: "whiteboard",
              resource_id: "X4Hy02w3QUOdskKofgb9Jg",
              permission_level: "editor",
            },
          ],
        },
        start_time: new Date().toISOString(),
        timezone: "Asia/Kolkata",
        topic: "test zoom api",
        tracking_fields: [{ field: "field1", value: "value1" }],
        type: 2,
      },

      {
        headers: {
          Authorization: `Bearer ${zoomAccessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = response.data;
    console.log("Meeting created successfully:", {
      id: responseData.id,
      topic: responseData.topic,
      start_time: responseData.start_time,
      duration: responseData.duration,
      join_url: responseData.join_url,
    });
    console.log("Whole response details : ", { ...response });
  } catch (error) {
    console.error("Error generating meeting from Zoom integration:");
    throw error;
  }
};


*/
// Execute the meeting generation

// Execute the token generation
const a = generateToken();
console.log("Access Token generated:", a);

// Execute the meeting generation
const generateMeeting = async () => {
  try {
    const zoomAccessToken = await generateToken();

    const response = await axios.post(
      `https://api.zoom.us/v2/users/me/meetings`,
      {
        topic: "Test Zoom API Meeting",
        type: 2, // Scheduled meeting
        start_time: new Date().toISOString(), // ISO 8601 format
        duration: 30, // in minutes
        timezone: "Asia/Kolkata",
        password: "1234",
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: true,
          mute_upon_entry: true,
          waiting_room: false,
          approval_type: 0,
          audio: "both",
          auto_recording: "cloud", // or "local" or "none"
          contact_name: "Utkarsh",
          contact_email: "shubootera98146@gmail.com",
          email_notification: true,
          allow_multiple_devices: true,
          meeting_authentication: false,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${zoomAccessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    console.log("✅ Meeting created successfully:");
    console.log("Meeting ID:", data.id);
    console.log("Join URL:", data.join_url);
    console.log("Password: ", data.password);
    console.log("Start Time:", data.start_time);
    console.log("Duration:", data.duration);
  } catch (error) {
    console.error("❌ Error creating meeting:");
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data || error.message);
  }
};
generateMeeting()
  .then((data) => {
    console.log("Meeting generated successfully");
  })
  .catch((err) => {
    console.error("Meeting generation failed:", err.message);
    console.log(err.response.data || err.message);
  });

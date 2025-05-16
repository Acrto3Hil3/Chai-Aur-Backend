import axios from "axios";

import base64 from "base-64";

import dotenv from "dotenv";
dotenv.config();

const zoomAccountId = "WH_6Oqq0SC2ts4pZQVOB5A";
const zoomClientId = "tGHG3TaAQdiFq5jBhSdjfQ";
const zoomClientSecret = "NJOoMdOLiByvhWe8hhTthp4ne4EW1ra9";
const value = process.env.VALUE;

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

    return responseData.access_token;
  } catch (error) {
    console.error("Error generating token from Zoom integration:");
    throw error;
  }
};

const generateMeeting = async () => {
  try {
  } catch (error) {
    console.error("Error generating meeting from Zoom integration:");
    throw error;
  }
};

// Execute the token generation
const a = generateToken();
console.log("Access Token generated:", a);

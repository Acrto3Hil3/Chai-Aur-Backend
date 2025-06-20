import express from "express";
import QRCode from "qrcode"; // For the QR code generation

import JsBarcode from "jsbarcode"; // For the barcode generation
import { createCanvas } from "canvas"; // For rendering the barcode on a canvas

const app = express();

// For the QR code generation, we will use the 'qrcode' package
app.get("/qr-code", async (req, res) => {
  // the url for which you want to generate the QR code
  const url = "https://github.com/Acrto3Hil3";

  // Convert the URL to dataURL format(QR image format)
  QRCode.toDataURL(url, (err, qrCodeUrl) => {
    if (err) {
      console.error("Error generating QR code:", err);
      return res.status(500).send("Error generating QR code");
    } else {
      // Send the QR code image as a response
      res.send(`
            <html>
            <body>
                <h1>QR Code Generation</h1>
                <p>Scan the QR code below to visit the URL:</p>
                <img src="${qrCodeUrl}" alt="QR Code" />
            </body>
            </html>
        `);
    }
  });
});

// barcode store only the product's text (numeric code) and display it
app.get("/barcode", (req, res) => {
  // the text for which you want to generate the barcode
  const text = "123456789012";

  // Create a canvas to draw the barcode
  const canvas = createCanvas();
  JsBarcode(canvas, text, {
    format: "CODE128", // Barcode format
    width: 2, // Width of the barcode lines
    height: 100, // Height of the barcode
    displayValue: true, // Show the text below the barcode
  });

  // Convert the canvas to a data URL
  const barcodeUrl = canvas.toDataURL("image/jpeg");
  // Send the barcode image as a response
  res.send(`
        <html>
        <body>
            <h1>Barcode Generation</h1>
            <p>Scan the barcode below:</p>
            <img src="${barcodeUrl}" alt="Barcode" />
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

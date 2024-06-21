import QRCode from "qrcode";
import puppeteer from "puppeteer";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import User from "../../models/User.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class EventRegistrationService {
  constructor(user, event) {
    this.user = user;
    this.event = event;
  }

  async generateQRCode() {
    try {
      const qrCodeData = await QRCode.toDataURL(this.user._id.toString());
      await User.findByIdAndUpdate(this.user._id, { qrCode: qrCodeData });
      this.user.qrCode = qrCodeData;
    } catch (error) {
      throw new Error("Failed to generate QR code: " + error.message);
    }
  }

  async generatePDF() {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();

      let transactionIdContent = "-NA-";
      if (
        this.user.paymentData &&
        this.user.paymentData.data &&
        this.user.paymentData.data.transactionId
      ) {
        transactionIdContent = ` ${this.user.paymentData.data.transactionId}`;
      }

      let priceContent = "FREE";
      if (this.user.eventPrice && this.user.eventPrice !== "0") {
        priceContent = ` ${this.user.eventPrice}`;
      }

      const content = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Event Registration PDF</title>
          <style>
            @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");
      
            body {
              font-family: "Poppins", sans-serif; /* Use Poppins font */
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background-color: #f8f8f8;
            }
      
            .container {
              width: 90%;
              max-width: 800px;
              display: flex;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
              background-color: #fff;
            }
      
            .left-column,
            .right-column {
              padding: 40px;
            }
      
            .left-column {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
      
            .right-column {
              flex: 2;
              padding-left: 20px;
              padding-right: 40px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              color: #333;
            }
      
            img {
              max-width: 100%;
              border-radius: 10px;
            }
      
            h1 {
              text-align: center;
              margin-bottom: 20px;
              font-size: 24px;
            }
      
            p {
              margin: 5px 0;
              line-height: 1.6;
              font-size: 18px;
            }
      
            .bold {
              font-weight: bold;
            }
      
            /* Vertical line */
            .vertical-line {
              width: 2px;
              background-color: #ddd;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="left-column">
              <img src="${this.user.qrCode}" alt="QR Code" />
            </div>
            <div class="vertical-line"></div>
            <div class="right-column">
              <p><span class="bold">Name:</span> ${this.user.name}</p>
              <p><span class="bold">College:</span> ${this.user.college}</p>
              <p><span class="bold">Phone Number:</span> ${this.user.phoneNumber}</p>
              <p><span class="bold">Roll Number:</span> ${this.user.rollNumber}</p>
              <p><span class="bold">Event Name:</span> ${this.user.eventName}</p>
              <p><span class="bold">Transaction Id:</span> ${transactionIdContent}</p>
              <p><span class="bold">Event Price:</span> ${priceContent}</p>
            </div>
          </div>
        </body>
      </html>
      
      `;
      await page.setContent(content);
      const pdfPath = path.join(
        __dirname,
        `../../public/pdf/${this.user._id}.pdf`
      );
      await page.pdf({ path: pdfPath, format: "A4" });
      await browser.close();
      this.pdfPath = pdfPath;
    } catch (error) {
      throw new Error("Failed to generate PDF: " + error.message);
    }
  }

  async sendEmail() {
    try {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: this.user.email,
        subject: "Event Registration Confirmation",
        html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Event Registration Confirmation</title>
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

          body {
            font-family: "Poppins", sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            color: #333;
          }

          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          }

          .header {
            text-align: center;
            margin-bottom: 20px;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            background-color: #f0f0f0;
          }

          .header h1 {
            color: #4c51bf; /* Tailwind indigo-600 */
            font-size: 2em;
            margin: 0;
            padding: 0;
          }

          .content {
            padding: 20px;
          }

          .footer {
            padding: 20px;
            text-align: center;
            background-color: #f0f0f0;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            color: #777;
          }

          p {
            margin: 10px 0;
            line-height: 1.6;
          }

          h2 {
            color: #333;
            margin-bottom: 10px;
          }

          a {
            color: #007bff;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      .cta-button {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        background-color: rgb(0, 123, 255);
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
      }

      .cta-button:hover {
        background-color: #005bb5;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>EventAura</h1>
      </div>
      <div class="content">
        <p>Dear ${this.user.name},</p>
        <p>
          Thank you for participating in the event
          <strong>${this.event.eventName}</strong> hosted by
          <strong>${this.event.eventHostedBy}</strong> at
          <strong>${this.event.eventVenue}</strong>. We're delighted to have you
          join us and hope you have a wonderful experience!
        </p>
        <p>${this.event.eventMailDescription}</p>
        <h2>Event Venue</h2>
        <p>
          The event will be held at <strong>${this.event.eventVenue}</strong>.
          For more information about the venue, including directions and
          facilities follow the link:
          <a href="${this.event.eventVenueUrl}">${this.event.eventVenueUrl}</a>.
        </p>
        <h2>Contact Details</h2>
        <p><strong>Email:</strong> ${this.event.eventManagerMail}</p>
        <p><strong>Phone:</strong> ${this.event.eventManagerPhone}</p>
        <p>
          Please find your registration details and QR code in the attached PDF.
        </p>
      </div>
      <div class="footer">
        <p>
          &copy; 2024 EventAura
        </p>
      </div>
    </div>
  </body>
</html>



        
        `,
        attachments: [
          {
            filename: `${this.user._id}.pdf`,
            path: this.pdfPath,
          },
        ],
      };

      await transporter.sendMail(mailOptions);

      if (fs.existsSync(this.pdfPath)) {
        fs.unlinkSync(this.pdfPath);
      }
    } catch (error) {
      throw new Error("Failed to send email: " + error.message);
    }
  }
}

export default EventRegistrationService;

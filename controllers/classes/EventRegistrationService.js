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
      this.user.qrCode = qrCodeData; // Ensure QR code is included in user object for PDF generation
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
      if (this.user.transactionId) {
        transactionIdContent = `<p>Transaction ID: ${this.user.transactionId}</p>`;
      }

      let priceContent = "FREE";
      if (this.user.eventPrice && this.user.eventPrice !== "0") {
        priceContent = `<p>Price: ${this.user.eventPrice}</p>`;
      }

      const content = `
        <html>
          <body>
            <h1>Event Registration</h1>
            <p>Name: ${this.user.name}</p>
            <p>College: ${this.user.college}</p>
            <p>Phone Number: ${this.user.phoneNumber}</p>
            <p>Roll Number: ${this.user.rollNumber}</p>
            <p>Event Name: ${this.user.eventName}</p>
            <p>Transcation Id: ${transactionIdContent}</p>
            <p>Event Price: ${priceContent}</p>
            
            
            <img src="${this.user.qrCode}" alt="QR Code" />
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
          <p>Thank you for registering for the event!</p>
          ${this.event.eventMailDescription}
          <p>Event Contact Details:</p>
          <p>Email: ${this.event.eventManagerMail}</p>
          <p>Phone: ${this.event.eventManagerPhone}</p>
          <p>Please find your registration details and QR code in the attached PDF.</p>
        `,
        attachments: [
          {
            filename: `${this.user._id}.pdf`,
            path: this.pdfPath,
          },
        ],
      };

      await transporter.sendMail(mailOptions);
      // Ensure the PDF is deleted after the email is successfully sent
      if (fs.existsSync(this.pdfPath)) {
        fs.unlinkSync(this.pdfPath);
      }
    } catch (error) {
      throw new Error("Failed to send email: " + error.message);
    }
  }
}

export default EventRegistrationService;

import nodemailer from "nodemailer";
import { htmlforEventManager } from "./index.js";

class EventMailer {
  constructor(id, name, email, hostedBy, upi, password, date) {
    this.id = id;
    this.name = name;
    this.hostedBy = hostedBy;
    this.email = email;
    this.upi = upi;
    this.password = password;
    this.date = date;
  }

  async sendEmail() {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      const formattedPlaceholder = htmlforEventManager
        .replace("{{eventName}}", this.name)
        .replace("{{eventHostedBy}}", this.hostedBy)
        .replace("{{eventPaymentDetails}}", this.upi)
        .replace("{{eventAdminPassword}}", this.password)
        .replace("{{eventDate}}", this.date)
        .replace("{{id}}", this.id)
        .replace("{{Adminid}}", this.id)
        .replace("{{Eventid}}", this.id);

      let mailOptions = {
        from: process.env.EMAIL,
        to: this.email,
        subject: "Successfull Event Creation 🎉",
        html: formattedPlaceholder,
      };
      let info = await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
  }
}

export default EventMailer;

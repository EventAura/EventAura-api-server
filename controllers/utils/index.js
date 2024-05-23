const htmlforEventManager = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Event Creation Notification</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: "Poppins", sans-serif; /* Use Poppins font */
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        line-height: 1.6;
        color: #333;
      }

      .container {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .banner {
        background-color: rgb(63, 81, 181); /* Modern shade of blue */
        color: white;
        padding: 20px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        text-align: left; /* Align Tesseract to the left */
        margin-bottom: 20px;
      }

      .banner h1 {
        margin: 0;
        font-size: 32px;
        font-weight: 700;
      }
      .content {
        font-size: 18px;
        margin-bottom: 20px;
      }
      .content p {
        margin-bottom: 10px;
      }
      .footer {
        text-align: center;
        color: #666;
        font-size: 14px;
        background-color: #f2f2f2; /* Light grey background color for footer */
        padding: 10px 0; /* Add padding to top and bottom */
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="banner">
        <h1>Teseract</h1>
      </div>
      <div class="content">
        <p>Dear Event Manager,</p>
        <p>
          Your event, <strong>{{eventName}}</strong>, hosted by
          <strong>{{eventHostedBy}}</strong>, has been successfully created on
          the Teseract servers. Please review the details below:
        </p>
        <ul>
          <li><strong>Payment Details:</strong>{{eventPaymentDetails}} (To change the payemtn details reach the helpdesk) </li>
          <li><strong>Admin Pannel Username</strong>Admin</li>
          <li><strong>Admin Panel Password:</strong>{{eventAdminPassword}}</li> (This is a secure password, please do not share with anyone)
          <li><strong>Last Date to access Admin Pannel:</strong> {{eventDate}}</li>
        </ul>
        <p>
          Please ensure that all the details are correct. If you need to make
          any changes, please contact the help desk.
        </p>
        <p>
          Note that access to the admin panel will be restricted after the event
          date.
        </p>
        <p>
          Here is the link to the successful event creation:
          <a
            href="https://tesract.vercel.app//secure/v3/Event-On-Boarding/success/{{id}}"
            >Successful Event Creation</a
          >
        </p>
        <p>
          Here is the link to the admin panel:
          <a
            href="https://tesract.vercel.app//secure/v3/dashboard/en/?par=fjkdjg879sdlghlkajsdf97df/{{id}}"
            >Admin Panel</a
          >
        </p>
        <p>
          For the event page, please visit:
          <a href="https://tesract.vercel.app//event/{{id}}">Event Page</a>
        </p>
        <p>
          If you need help, please contact us at +91 9030684781 or email us at
          <a href="mailto:vedasolutionshyderabad@gmail.com">vedasolutionshyderabad@gmail.com</a>.
        </p>
        <p><em>This is a system-generated email. Please do not reply.</em></p>
      </div>
      <div class="footer">
        <p>
          © 2024 Tesseract, registered under Veda Solutions. All rights
          reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`;

export { htmlforEventManager };

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
        text-align: left; /* Align EventAura to the left */
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
        <h1>EventAura</h1>
      </div>
      <div class="content">
        <p>Dear Event Manager,</p>
        <p>
          Your event, <strong>{{eventName}}</strong>, hosted by
          <strong>{{eventHostedBy}}</strong>, has been successfully created on
          the EventAura servers. Please review the details below:
        </p>
        <p>
          Please ensure that all the details are correct. If you need to make
          any changes, please contact Us.
        </p>
        <p>
          Here is the link to the successful event creation:
          <a
            href="https://eventaura.tech/secure/v3/Event-On-Boarding/success/{{id}}"
            >Successful Event Creation</a
          >
        </p>
        <p>
          Here is the link to the admin panel:
          <a
            href="https://admin.eventaura.tech/secure/v3/dasboard/login/{{Adminid}}"
            >Admin Panel</a
          >
        </p>
        <p>
          For the event page, please visit:
          <a href="https://eventaura.tech/event/{{Eventid}}">Event Page</a>
        </p>
        <p>
          If you need help, please contact us at +91 9182663484 or email us at
          <a href="mailto:support@eventaura.tech">support@eventaura.tech</a>.
        </p>
        <p><em>This is a system-generated email. Please do not reply.</em></p>
      </div>
      <div class="footer">
        <p>
          © 2024 EventAura
        </p>
      </div>
    </div>
  </body>
</html>
`;

export { htmlforEventManager };

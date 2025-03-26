![JavaScript Embedded Login Banner](/public/assets/js-banner.png)

# JavaScript Embedded Login Sample

This sample demonstrates how to add authentication to a vanilla JavaScript application using Frontegg's Embedded Login solution.

## Requirements

- [Node.js](https://nodejs.org)
- npm (comes with Node.js)
- A Frontegg account. [Sign up for free](https://portal.frontegg.com/signup).

## Setup

### 1. Configure Frontegg Application

1. Go to [Frontegg Portal](https://portal.frontegg.com/)
2. Configure your application settings
3. Get your Client ID and API key from the Frontegg Portal

### 2. Configuration

This project comes with pre-configured test credentials in `/src/constants/config.js`. These credentials are set up for demonstration purposes, allowing you to test the authentication flow immediately.

When deploying to production, make sure to replace these test credentials with your own Frontegg application credentials in the app.js file:

```javascript
const frontegg = initialize({
  contextOptions: {
    baseUrl: "YOUR_BASE_URL",
    clientId: "YOUR_CLIENT_ID",
  },
  hostedLoginBox: false,
});
```

### 3. Install Dependencies and Run

Run the following commands:

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/app.js` - Main application file with Frontegg initialization
- `src/components/` - UI components for displaying user and tenant information
- `src/styles/globals.css` - Global styling for the application
- `public/index.html` - HTML template 

## Features

- Embedded Login authentication
- User profile display 
- Tenant information and switching
- Self-service portal integration

## Learn More

For more information about Frontegg's authentication solutions:

- [Frontegg Documentation](https://docs.frontegg.com/)
- [Frontegg JavaScript Integration](https://docs.frontegg.com/docs/javascript-tutorial)
- [Frontegg Community on Slack](https://fronteggcommunity.slack.com/)

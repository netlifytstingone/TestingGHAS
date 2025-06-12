// secrets.js - Example file with hardcoded secrets for secret scanning demonstration

// API keys and tokens - should never be hardcoded like this in real apps
const API_KEY = "AIzaSyD-EXAMPLE-KEY-1234567890abcdef";
const STRIPE_SECRET = "sk_test_4eC39HqLyjWDarjtT1zdp7dc";
const DATABASE_PASSWORD = "SuperSecretPass123!";
const JWT_SECRET = "my_jwt_secret_key_!@#";

// Configuration object exposing secrets
const config = {
  apiKey: API_KEY,
  stripeSecret: STRIPE_SECRET,
  dbPassword: DATABASE_PASSWORD,
  jwtSecret: JWT_SECRET,
  endpoint: "https://api.example.com/v1"
};

// Function that uses secrets (mock)
function connectToDatabase() {
  console.log(`Connecting to DB with password: ${config.dbPassword}`);
  // Simulate DB connection here
}

function authenticateUser(token) {
  if (token === config.jwtSecret) {
    console.log("User authenticated");
  } else {
    console.log("Authentication failed");
  }
}

// Expose config for demonstration (do NOT do this in production)
console.log("Loaded config:", config);

module.exports = {
  config,
  connectToDatabase,
  authenticateUser
};

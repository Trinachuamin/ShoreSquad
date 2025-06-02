# Setting up Google Maps API Key

1. **Create/Sign in to Google Cloud Console**
   - Visit https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project**
   - Click on the project dropdown at the top of the page
   - Click "New Project"
   - Name it "ShoreSquad" (or your preferred name)
   - Click "Create"

3. **Enable the Maps Embed API**
   - From the Navigation Menu, go to "APIs & Services" > "Library"
   - Search for "Maps Embed API"
   - Click on it and click "Enable"

4. **Create API Key**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Your new API key will be displayed

5. **Restrict the API Key (Important for security)**
   - After creating the key, click "Edit API Key"
   - Under "Application restrictions", select "HTTP referrers"
   - Add your website domain (for development, add: `localhost*`)
   - Under "API restrictions", select "Restrict key"
   - Select "Maps Embed API" from the dropdown
   - Click "Save"

6. **Using the API Key**
   - Copy your API key
   - Replace `YOUR_API_KEY` in index.html with your actual API key
   - For security, consider storing the key in an environment variable for production

**Important Security Notes:**
- Never commit your API key to version control
- Always restrict your API key to specific domains
- Monitor your API usage in the Google Cloud Console

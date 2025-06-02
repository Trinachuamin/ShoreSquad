# ShoreSquad 🌊

A modern web application for organizing and participating in beach cleanup activities, featuring real-time weather updates and community engagement tools.

## Features

- 📍 Interactive map showing cleanup locations with Pasir Ris Beach focus
- 🌤️ Real-time weather data and 4-day forecast from NEA (Singapore)
- 🌡️ Current conditions including temperature, humidity, and rainfall
- 👥 Community activity tracking
- 📱 Responsive design for all devices

## Getting Started

### Prerequisites

- Modern web browser
- Internet connection

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ShoreSquad.git
cd ShoreSquad
```

2. Set up API keys:
```bash
cp js/config.js.example js/config.js
```
Then edit `js/config.js` and add your API keys.

### API Keys Required

- Google Maps API Key
  - Get it from [Google Cloud Console](https://console.cloud.google.com/)
  - Enable Maps Embed API

### Running the Project

Use any local server. For example, with VS Code:
1. Install "Live Server" extension
2. Right-click on index.html
3. Select "Open with Live Server"

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Google Maps API
- NEA Weather API (data.gov.sg)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

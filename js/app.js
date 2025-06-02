// ShoreSquad Main Application JavaScript

// Main app state
const app = {
    map: null,
    markers: [],
    weather: {},
    activities: []
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    loadWeatherData();
    loadCommunityActivities();
    setupEventListeners();
});

// Map Initialization with Google Maps
async function initializeMap() {
    const mapContainer = document.getElementById('map-container');
    
    // Create the iframe with the API key from config
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = '0';
    iframe.loading = 'lazy';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    
    // Set the source URL with the API key from config
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${mapConfig.GOOGLE_MAPS_API_KEY}`
        + '&q=1.381497,103.955574'
        + '&zoom=15'
        + '&center=1.381497,103.955574'
        + '&query=Next+Cleanup+at+Pasir+Ris';
    
    iframe.src = mapUrl;
    mapContainer.appendChild(iframe);
}

// Weather Data
async function loadWeatherData() {
    const weatherContainer = document.getElementById('weather-container');
    
    try {
        // Get current date in Singapore timezone
        const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' });
        const currentDate = new Date(now);
        
        // Fetch forecast data
        const [forecastRes, tempRes, humidityRes, rainfallRes] = await Promise.all([
            fetch(config.NEA_API_ENDPOINTS.WEATHER_FORECAST),
            fetch(`${config.NEA_API_ENDPOINTS.REALTIME_WEATHER}?date=${currentDate.toISOString().split('T')[0]}`),
            fetch(`${config.NEA_API_ENDPOINTS.RELATIVE_HUMIDITY}?date=${currentDate.toISOString().split('T')[0]}`),
            fetch(`${config.NEA_API_ENDPOINTS.RAINFALL}?date=${currentDate.toISOString().split('T')[0]}`)
        ]);

        if (!forecastRes.ok) throw new Error('Weather forecast fetch failed');

        const forecastData = await forecastRes.json();
        const tempData = await tempRes.json();
        const humidityData = await humidityRes.json();
        const rainfallData = await rainfallRes.json();

        // Get the latest readings
        const latestTemp = tempData.items[tempData.items.length - 1];
        const latestHumidity = humidityData.items[humidityData.items.length - 1];
        const latestRainfall = rainfallData.items[rainfallData.items.length - 1];

        // Create current conditions card
        const currentConditions = `
            <div class="weather-card current-weather">
                <h3>Current Conditions</h3>
                <div class="weather-icon">
                    <i class="fas ${getWeatherIcon(forecastData.items[0].forecasts[0].forecast)}"></i>
                </div>
                <p class="temperature">${Math.round(latestTemp?.readings[0]?.value || 0)}°C</p>
                <p class="condition">${forecastData.items[0].forecasts[0].forecast}</p>
                <p class="humidity">Humidity: ${Math.round(latestHumidity?.readings[0]?.value || 0)}%</p>
                <p class="rainfall">Rainfall: ${latestRainfall?.readings[0]?.value || 0} mm</p>
            </div>
        `;

        // Format the forecasts into cards
        const forecastCards = forecastData.items[0].forecasts.map(forecast => {
            const date = new Date(forecast.date);
            const formattedDate = date.toLocaleDateString('en-SG', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
            });
            
            return `
                <div class="weather-card">
                    <h3>${formattedDate}</h3>
                    <div class="weather-icon">
                        <i class="fas ${getWeatherIcon(forecast.forecast)}"></i>
                    </div>
                    <p class="temperature">${forecast.temperature.low}°C - ${forecast.temperature.high}°C</p>
                    <p class="condition">${forecast.forecast}</p>
                    <p class="humidity">Humidity: ${forecast.relative_humidity.low}% - ${forecast.relative_humidity.high}%</p>
                    <p class="wind">Wind: ${forecast.wind.speed.low} - ${forecast.wind.speed.high} km/h</p>
                </div>
            `;
        }).join('');

        // Combine current conditions with forecast
        weatherContainer.innerHTML = currentConditions + forecastCards;

    } catch (error) {
        console.error('Error loading weather data:', error);
        weatherContainer.innerHTML = '<p class="error">Unable to load weather data. Please try again later.</p>';
    }
}

// Community Activities
async function loadCommunityActivities() {
    const activityContainer = document.getElementById('activity-container');
    
    try {
        // TODO: Implement backend API integration
        const mockActivities = [
            {
                title: 'Weekend Beach Cleanup',
                location: 'Venice Beach',
                date: '2025-06-08',
                participants: 15
            },
            {
                title: 'Youth Environmental Workshop',
                location: 'Santa Monica Pier',
                date: '2025-06-15',
                participants: 25
            },
            {
                title: 'Ocean Conservation Day',
                location: 'Malibu Beach',
                date: '2025-06-22',
                participants: 50
            }
        ];

        activityContainer.innerHTML = mockActivities.map(activity => `
            <div class="activity-card">
                <h3>${activity.title}</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${activity.location}</p>
                <p><i class="far fa-calendar"></i> ${activity.date}</p>
                <p><i class="fas fa-users"></i> ${activity.participants} participants</p>
                <button class="cta-button">Join Activity</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading activities:', error);
    }
}

// Event Listeners
function setupEventListeners() {
    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // CTA button interactions
    document.querySelectorAll('.cta-button, .cta-button-large').forEach(button => {
        button.addEventListener('click', () => {
            // TODO: Implement sign-up/join functionality
            console.log('CTA clicked - implementation pending');
        });
    });
}

// Simple scroll handler for navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Helper function to map weather conditions to Font Awesome icons
function getWeatherIcon(condition) {
    const iconMap = {
        'Partly Cloudy': 'fa-cloud-sun',
        'Cloudy': 'fa-cloud',
        'Light Rain': 'fa-cloud-rain',
        'Moderate Rain': 'fa-cloud-showers-heavy',
        'Heavy Rain': 'fa-cloud-showers-heavy',
        'Showers': 'fa-cloud-rain',
        'Fair': 'fa-sun',
        'Fair & Warm': 'fa-sun',
        'Thundery Showers': 'fa-bolt',
        'Heavy Thundery Showers': 'fa-bolt',
        'Fair (Night)': 'fa-moon',
    };
    
    return iconMap[condition] || 'fa-cloud';
}

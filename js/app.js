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

// Map Initialization (using Leaflet.js - will need to add the library)
async function initializeMap() {
    // Placeholder for map initialization
    // TODO: Implement with Leaflet.js or Google Maps
    console.log('Map initialization pending...');
}

// Weather Data
async function loadWeatherData() {
    const weatherContainer = document.getElementById('weather-container');
    
    try {
        // TODO: Implement weather API integration
        const mockWeather = [
            { location: 'Venice Beach', temp: '75°F', condition: 'Sunny', tide: 'High' },
            { location: 'Santa Monica', temp: '72°F', condition: 'Partly Cloudy', tide: 'Low' },
            { location: 'Malibu', temp: '70°F', condition: 'Clear', tide: 'Medium' }
        ];

        weatherContainer.innerHTML = mockWeather.map(weather => `
            <div class="weather-card">
                <h3>${weather.location}</h3>
                <p class="temperature">${weather.temp}</p>
                <p class="condition">${weather.condition}</p>
                <p class="tide">Tide: ${weather.tide}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading weather data:', error);
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

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

const config = {
    development: {
        // Match backend port used by the API instance (api.js)
        API_BASE_URL: 'http://localhost:5001',
        NODE_ENV: 'development'
    },
    production: {
        API_BASE_URL: 'https://your-production-api.com', 
        NODE_ENV: 'production'
    },
    // staging: {
    //     API_BASE_URL: 'https://your-staging-api.com', 
    //     NODE_ENV: 'staging'
    // }
};

// Determine environment based on hostname
const getEnvironment = () => {
    const hostname = window.location.hostname;
    
    // Development environment
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('localhost')) {
        return 'development';
    }
    
    // Staging environment (optional)
    // if (hostname.includes('staging') || hostname.includes('dev')) {
    //     return 'staging';
    // }
    
    // Production environment
    return 'production';
};

const currentEnvironment = getEnvironment();

// Export the configuration for the current environment
export const API_BASE_URL = config[currentEnvironment].API_BASE_URL;
export const NODE_ENV = config[currentEnvironment].NODE_ENV;
export const ENVIRONMENT = currentEnvironment;

// Export the full config for debugging
export const FULL_CONFIG = config[currentEnvironment];

// Default export
export default config[currentEnvironment];
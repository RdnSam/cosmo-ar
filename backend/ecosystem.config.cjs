module.exports = {
  apps: [{
    name: 'cosmo-ar-backend',
    script: './src/server.js',
    instances: 1,
    exec_mode: 'fork',

    // Environment
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    env_development: {
      NODE_ENV: 'development',
      PORT: 3001
    },

    // Logging
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,

    // Process management
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    restart_delay: 4000,

    // Advanced features
    min_uptime: '10s',
    max_restarts: 10,
    kill_timeout: 5000,
    listen_timeout: 3000,

    // Source map support
    node_args: '--enable-source-maps'
  }]
};

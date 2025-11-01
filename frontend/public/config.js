// Runtime config untuk static files (test.html)
// Otomatis detect berdasarkan hostname

const isProduction = window.location.hostname === 'cosmo.kiraproject.id';

window.APP_RUNTIME_CONFIG = {
  BACKEND_URL: isProduction
    ? 'https://vr.kiraproject.id'
    : `http://${window.location.hostname}:3001`,

  API_BASE_URL: isProduction
    ? 'https://vr.kiraproject.id/api'
    : `http://${window.location.hostname}:3001/api`,

  MODELS_URL: isProduction
    ? 'https://vr.kiraproject.id/models'
    : `http://${window.location.hostname}:3001/models`,
};

console.log('🔧 Runtime Config:', window.APP_RUNTIME_CONFIG);

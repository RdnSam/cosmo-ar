/**
 * Model Controller
 * Handle 3D model management
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { APP_CONFIG } from '../config/app.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get list of available 3D models
export const getAvailableModels = async (req, res, next) => {
  try {
    const modelsPath = path.join(__dirname, '../../', APP_CONFIG.upload.paths.models);

    // Read directory
    const files = fs.readdirSync(modelsPath);

    // Filter only .glb files
    const models = files
      .filter(file => file.endsWith('.glb'))
      .map(file => {
        const stats = fs.statSync(path.join(modelsPath, file));
        return {
          filename: file,
          name: file.replace('.glb', ''),
          size: stats.size,
          sizeFormatted: formatBytes(stats.size),
          url: `${APP_CONFIG.upload.paths.models}/${file}`,
          fullUrl: `${req.protocol}://${req.get('host')}/models/${file}`,
          modifiedAt: stats.mtime
        };
      })
      .sort((a, b) => b.modifiedAt - a.modifiedAt);

    res.json({
      success: true,
      count: models.length,
      data: models
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to format bytes
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

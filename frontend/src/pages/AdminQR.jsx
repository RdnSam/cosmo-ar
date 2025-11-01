/**
 * Admin QR Code Generator Page
 * Generate & download QR codes untuk semua products
 */
import { useState, useEffect } from 'react';
import { productAPI } from '../services/api.js';
import { APP_CONFIG } from '../config/app.config.js';

export default function AdminQR() {
  const [products, setProducts] = useState([]);
  const [availableModels, setAvailableModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
    loadModels();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data || []);
    } catch (error) {
      console.error('Failed to load products:', error);
      setMessage('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const loadModels = async () => {
    try {
      const response = await fetch(`${APP_CONFIG.api.baseUrl}/models`);
      const data = await response.json();
      if (data.success) {
        setAvailableModels(data.data || []);
      }
    } catch (error) {
      console.error('Failed to load models:', error);
    }
  };

  const updateProductModel = async (productId, modelUrl) => {
    try {
      const response = await fetch(`${APP_CONFIG.api.baseUrl}/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelUrl })
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`✅ Model updated successfully!`);
        await loadProducts();
        setEditingProduct(null);
      } else {
        setMessage(`❌ Failed to update model`);
      }
    } catch (error) {
      console.error('Failed to update model:', error);
      setMessage('❌ Failed to update model');
    }
  };

  const generateAllQR = async () => {
    try {
      setGenerating(true);
      setMessage('Generating QR codes...');

      const response = await fetch(`${APP_CONFIG.api.baseUrl}/products/qr/generate-all`, {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`✅ ${data.message}`);
        await loadProducts(); // Reload untuk dapat QR code baru
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error('Failed to generate QR codes:', error);
      setMessage('❌ Failed to generate QR codes');
    } finally {
      setGenerating(false);
    }
  };

  const downloadQR = (qrCode, sku) => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `QR-${sku}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllQR = () => {
    products.forEach((product) => {
      if (product.qrCodeUrl) {
        setTimeout(() => downloadQR(product.qrCodeUrl, product.sku), 500);
      }
    });
    setMessage(`✅ Downloading ${products.filter(p => p.qrCodeUrl).length} QR codes...`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">QR Code Generator</h1>
              <p className="mt-1 text-sm text-gray-600">
                Generate & download QR codes untuk semua products
              </p>
            </div>
            <a
              href="/"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Bulk Actions</h2>
              <p className="text-sm text-gray-600 mt-1">
                Total Products: {products.length} |
                With QR: {products.filter(p => p.qrCodeUrl).length}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={generateAllQR}
                disabled={generating}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {generating ? 'Generating...' : '🔄 Generate All QR Codes'}
              </button>
              <button
                onClick={downloadAllQR}
                disabled={products.filter(p => p.qrCodeUrl).length === 0}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                💾 Download All
              </button>
            </div>
          </div>

          {message && (
            <div className={`mt-4 p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {message}
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.sku} className="bg-white rounded-lg shadow overflow-hidden">
              {/* QR Code */}
              <div className="bg-gray-50 p-8 flex items-center justify-center">
                {product.qrCodeUrl ? (
                  <img
                    src={product.qrCodeUrl}
                    alt={`QR-${product.sku}`}
                    className="w-48 h-48 border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                    No QR Code
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{product.sku}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.name}</p>

                {/* 3D Model Selection */}
                {editingProduct === product.id ? (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select 3D Model:
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2"
                      defaultValue={product.modelUrl || ''}
                      onChange={(e) => updateProductModel(product.id, e.target.value)}
                    >
                      <option value="">-- Select Model --</option>
                      {availableModels.map((model) => (
                        <option key={model.filename} value={model.fullUrl}>
                          {model.name} ({model.sizeFormatted})
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="w-full px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Current Model:</p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.modelUrl ? product.modelUrl.split('/').pop() : 'No model'}
                        </p>
                      </div>
                      <button
                        onClick={() => setEditingProduct(product.id)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Scans:</span>
                    <span className="font-semibold">{product.scanCount || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Views:</span>
                    <span className="font-semibold">{product.viewCount || 0}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => window.open(`${APP_CONFIG.urls.frontend}/ar/${product.sku}`, '_blank')}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                  >
                    👁️ Preview AR
                  </button>
                  {product.qrCodeUrl && (
                    <button
                      onClick={() => downloadQR(product.qrCodeUrl, product.sku)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                    >
                      💾 Download
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

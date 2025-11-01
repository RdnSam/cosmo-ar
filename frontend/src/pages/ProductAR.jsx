import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI, scanAPI } from '../services/api.js';
import { APP_CONFIG } from '../config/app.config.js';
import '@google/model-viewer';

// Generate UUID fallback untuk browser lama
function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback untuk browser yang tidak support crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function ProductAR() {
  const { sku } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [sessionId] = useState(() => generateUUID());

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getBySku(sku);
        const productData = response.data?.data || response.data;

        setProduct(productData);

        // Log scan
        if (productData?.id) {
          await scanAPI.log({
            productId: productData.id,
            sessionId,
            deviceInfo: navigator.userAgent,
            referer: document.referrer || 'direct'
          }).catch(err => console.warn('Scan log failed:', err));
        }

      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (sku) {
      fetchProduct();
    }
  }, [sku, sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AR Experience...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600">SKU: {sku}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md z-10">
        <div>
          <h1 className="text-xl font-bold">COSMO</h1>
          <p className="text-sm opacity-90">Industrial Hygiene Wipes</p>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
        >
          {showInfo ? 'Hide' : 'Info'}
        </button>
      </header>

      {/* 3D Model Viewer */}
      <div className="flex-1 relative bg-gray-50">
        <model-viewer
          src={product.modelUrl ? product.modelUrl.replace('http://192.168.43.250:3001', APP_CONFIG.urls.backend) : `${APP_CONFIG.urls.models}/TissueCosmo.glb`}
          alt={product.name}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          camera-orbit="0deg 75deg 105%"
          auto-rotate
          auto-rotate-delay="0"
          rotation-per-second="30deg"
          touch-action="pan-y"
          environment-image="neutral"
          shadow-intensity="1"
          className="w-full h-full"
        >
          <button
            slot="ar-button"
            className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            📱 View in Your Space
          </button>
        </model-viewer>

        {/* Product Info Overlay */}
        {showInfo && (
          <div className="absolute bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-3xl p-6 max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-sm text-gray-500 mb-4">SKU: {product.sku}</p>

            {product.description && (
              <p className="text-gray-700 mb-4">{product.description}</p>
            )}

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              {product.composition && (
                <div>
                  <p className="font-semibold text-gray-600">Composition</p>
                  <p className="text-gray-800">{product.composition}</p>
                </div>
              )}
              {product.sheetSize && (
                <div>
                  <p className="font-semibold text-gray-600">Sheet Size</p>
                  <p className="text-gray-800">{product.sheetSize}</p>
                </div>
              )}
              {product.rollSize && (
                <div>
                  <p className="font-semibold text-gray-600">Roll Size</p>
                  <p className="text-gray-800">{product.rollSize}</p>
                </div>
              )}
              {product.capacity && (
                <div className="col-span-2">
                  <p className="font-semibold text-gray-600">Capacity</p>
                  <p className="text-gray-800">{product.capacity}</p>
                </div>
              )}
            </div>

            {/* Certifications */}
            {(product.halal || product.lppomMui) && (
              <div className="flex gap-2 mb-4">
                {product.halal && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    ✓ Halal
                  </span>
                )}
                {product.lppomMui && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    ✓ LPPOM MUI
                  </span>
                )}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                🛒 Request Quote
              </button>
              <button className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                📤 Share
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-gray-800 text-white p-4 text-center text-sm">
        💡 Use 2 fingers to rotate & zoom. Tap "View in Your Space" for AR mode!
      </div>
    </div>
  );
}

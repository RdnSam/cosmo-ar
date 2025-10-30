import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function HomePage() {
  const [qrCode, setQrCode] = useState('');
  const [activeTab, setActiveTab] = useState('demo');
  const testUrl = 'http://192.168.43.250:5173/test.html';

  useEffect(() => {
    QRCode.toDataURL(testUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#1e40af',
        light: '#ffffff'
      }
    }).then(setQrCode);
  }, []);

  const products = [
    { sku: 'OA-250', name: 'Oil Absorbent Wipes', icon: '🛢️', color: 'from-orange-400 to-red-500' },
    { sku: 'CA-250', name: 'Chemical Absorbent', icon: '🧪', color: 'from-green-400 to-teal-500' },
    { sku: 'PSW', name: 'General Purpose', icon: '🧽', color: 'from-purple-400 to-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              COSMO AR
            </h1>
            <p className="text-3xl font-semibold text-blue-100 mb-3">Industrial Hygiene Wipes</p>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Experience Our Products in <span className="font-bold text-yellow-300">Augmented Reality</span>
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* QR Code Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <span className="text-4xl">📱</span>
                  Quick AR Demo
                </h2>
                <p className="mt-2 opacity-90">Scan & Experience Instantly</p>
              </div>

              <div className="p-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-6">
                  {qrCode && (
                    <div className="flex justify-center">
                      <div className="bg-white p-4 rounded-2xl shadow-lg">
                        <img src={qrCode} alt="QR Code" className="w-64 h-64" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <a
                    href={testUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:-translate-y-1 transition text-center"
                  >
                    🚀 Launch AR Demo
                  </a>
                  <a
                    href={qrCode}
                    download="cosmo-ar-qr.png"
                    className="block w-full bg-gray-100 text-gray-800 py-4 rounded-xl font-semibold hover:bg-gray-200 transition text-center"
                  >
                    💾 Download QR Code
                  </a>
                </div>
              </div>
            </div>

            {/* Features Card */}
            <div className="space-y-6">
              <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl p-8 border border-white border-opacity-20">
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-4xl">✨</span>
                  AR Features
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: '🎨', title: '360° View', desc: 'Rotate & explore every angle' },
                    { icon: '📏', title: 'True Scale', desc: 'See actual product size' },
                    { icon: '🏠', title: 'Place in Space', desc: 'Visualize in your environment' },
                    { icon: '⚡', title: 'Instant Load', desc: 'No app download needed' }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white bg-opacity-5 rounded-xl p-4">
                      <span className="text-3xl">{feature.icon}</span>
                      <div>
                        <h4 className="font-bold text-white text-lg">{feature.title}</h4>
                        <p className="text-blue-200 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white text-center mb-8">Our Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {products.map((product) => (
                <a
                  key={product.sku}
                  href={`/ar/${product.sku}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                >
                  <div className={`bg-gradient-to-br ${product.color} p-8 text-center`}>
                    <span className="text-7xl block mb-4">{product.icon}</span>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.sku}</h3>
                    <p className="text-gray-600 mb-4">{product.name}</p>
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-semibold inline-block">
                      View in AR →
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* How it Works */}
          <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl p-10 border border-white border-opacity-20">
            <h3 className="text-3xl font-bold text-white text-center mb-8">How It Works</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', icon: '📱', text: 'Scan QR with camera' },
                { step: '2', icon: '🌐', text: 'Browser opens AR view' },
                { step: '3', icon: '🎨', text: 'Interact with 3D model' },
                { step: '4', icon: '📍', text: 'Place in your space' }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                    {item.step}
                  </div>
                  <div className="text-5xl mb-3">{item.icon}</div>
                  <p className="text-white font-semibold">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-blue-200">
            <p className="mb-2">Powered by WebAR Technology</p>
            <p className="text-sm opacity-70">© 2025 PT Omecrom - COSMO Brand</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

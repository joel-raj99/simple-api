"use client"; // Convert to client component for Axios + state management

import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://dummyjson.com/products/1", {
          headers: {
            "Cache-Control": "no-store", // Fresh data
          },
        });
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product. Please try again.");
        console.error("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{error}</h2>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition-all duration-200"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 antialiased">
      {/* Hero Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-slate-800 to-black bg-clip-text text-transparent mb-4 drop-shadow-lg">
          Product Showcase
        </h1>
        <p className="text-xl text-slate-600 max-w-md mx-auto leading-relaxed">
          Discover premium beauty essentials with stunning details and quality you can trust.
        </p>
      </div>

      {/* Modern Product Card */}
      <div className="max-w-2xl mx-auto">
        <div className="group relative bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
          {/* Product Image with Glow Effect */}
          <div className="relative mb-6 overflow-hidden rounded-2xl">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-80 sm:h-96 object-cover group-hover:scale-110 transition-transform duration-700 rounded-2xl shadow-2xl"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            {/* Stock Badge */}
            <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
              In Stock ({product.stock})
            </div>
          </div>

          {/* Product Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors duration-300">
            {product.title}
          </h2>

          {/* Description */}
          <p className="text-slate-600 text-lg leading-relaxed mb-6 max-w-prose line-clamp-3">
            {product.description}
          </p>

          {/* Price & Rating Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl shadow-lg">
                <span className="text-2xl font-bold text-white drop-shadow-md">
                  ${product.price}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl">⭐</span>
                <span className="font-bold text-xl text-slate-900">{product.rating}</span>
              </div>
            </div>

            {/* Brand Badge */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200">
              {product.brand}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200/50">
            <button className="group flex-1 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 text-lg">
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 3.5A2 2 0 005 19h14a2 2 0 001.5-3.5L20 13m-9 0h6" />
              </svg>
              Add to Cart
            </button>
            <button className="px-6 py-4 bg-white/80 hover:bg-white border-2 border-slate-200 hover:border-slate-300 rounded-2xl font-semibold text-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              View Details
            </button>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-slate-200/50 text-sm text-slate-500">
            <span>🚚 Ships in 3-5 days</span>
            <span>📦 Free Shipping</span>
            <span>♻️ 1 Week Warranty</span>
          </div>
        </div>
      </div>
    </main>
  );
}

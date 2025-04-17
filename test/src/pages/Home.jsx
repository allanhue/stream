import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const categories = [
    { title: "Action", image: "/api/placeholder/400/225" },
    { title: "Comedy", image: "/api/placeholder/400/225" },
    { title: "Drama", image: "/api/placeholder/400/225" },
    { title: "Sci-Fi", image: "/api/placeholder/400/225" }
  ];

  const featuredContent = [
    { title: "Cosmic Odyssey", description: "An epic journey through space and time", image: "/api/placeholder/600/350" },
    { title: "Urban Tales", description: "Stories from the heart of the city", image: "/api/placeholder/600/350" },
    { title: "Mystery Island", description: "Uncover the secrets of a forgotten place", image: "/api/placeholder/600/350" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900"></div>
        
        <div className="relative z-20 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Unlimited Movies, TV Shows, and More
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
            Stream anywhere. Cancel anytime. Join millions of viewers enjoying the best content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/services">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded font-medium transition-colors duration-300">
                Get Started
              </button>
            </Link>
            <Link to="/about">
              <button className="bg-transparent border border-green-500 hover:bg-green-900 hover:border-green-400 text-green-400 px-8 py-3 rounded font-medium transition-colors duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 border-l-4 border-green-500 pl-4">Featured Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredContent.map((item, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded overflow-hidden hover:shadow-lg hover:shadow-green-900/20 transition-shadow duration-300">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
                <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors duration-300">
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 border-l-4 border-green-500 pl-4">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="relative rounded overflow-hidden cursor-pointer group">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
              <div className="absolute inset-0 bg-green-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src={category.image} 
                alt={category.title} 
                className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <h3 className="absolute bottom-4 left-4 z-20 text-lg font-bold group-hover:text-green-400 transition-colors duration-300">{category.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose LanPrime?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-800 rounded-lg bg-black hover:border-green-900 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900 mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">HD Streaming</h3>
              <p className="text-gray-400">Enjoy crystal clear video quality with our HD and 4K streaming options.</p>
            </div>
            <div className="text-center p-6 border border-gray-800 rounded-lg bg-black hover:border-green-900 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900 mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Multiple Devices</h3>
              <p className="text-gray-400">Stream on your TV, computer, tablet, and smartphone simultaneously.</p>
            </div>
            <div className="text-center p-6 border border-gray-800 rounded-lg bg-black hover:border-green-900 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900 mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Offline Downloads</h3>
              <p className="text-gray-400">Download content to watch later when you don't have internet access.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-900 to-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Streaming?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join LanPrime today and get access to our entire library of content.
          </p>
          <Link to="/services">
            <button className="bg-black text-green-400 border border-green-500 hover:bg-green-900 hover:text-white px-8 py-3 rounded font-medium transition-colors duration-300">
              Start Your Free Trial
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
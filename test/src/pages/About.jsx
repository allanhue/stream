import React from 'react';

const About = () => {
  const contentFeatures = [
    { 
      title: "Curated Excellence", 
      description: "Our team of entertainment experts hand-selects only the highest quality films and series from around the world",
      icon: "🎬"
    },
    { 
      title: "Global Perspectives", 
      description: "Discover award-winning content from Hollywood blockbusters to international cinema and hidden gems",
      icon: "🌎"
    },
    { 
      title: "Fresh & Timeless", 
      description: "Weekly new releases alongside a permanent collection of beloved classics",
      icon: "🆕"
    },
    { 
      title: "4K HDR Library", 
      description: "The largest collection of ultra-high-definition content available anywhere",
      icon: "📺"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Titles in our library" },
    { value: "50+", label: "Countries represented" },
    { value: "100%", label: "Quality guaranteed" },
    { value: "24/7", label: "New content added" }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Content Promise</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            LanPrime exists to bring you the absolute best in entertainment - no compromises, no filler.
          </p>
        </div>
        
        {/* Accent Divider */}
        <div className="w-24 h-1 bg-green-500 mx-auto mb-16"></div>
        
        {/* Content Philosophy */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Our Library Stands Apart</h2>
          <div className="bg-gray-900 border-l-4 border-green-500 rounded-lg p-8 shadow-lg">
            <p className="text-gray-300 mb-4">
              In an era of endless scrolling through mediocre content, we take a different approach. Every title in our library must pass our rigorous 4-point quality test:
            </p>
            <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
              <li>Exceptional storytelling that stands the test of time</li>
              <li>Production quality that meets our technical standards</li>
              <li>Cultural significance or entertainment value</li>
              <li>Positive reception from both critics and audiences</li>
            </ul>
            <p className="text-gray-300">
              This means you'll never waste time deciding what to watch - everything in our collection is worth your time.
            </p>
          </div>
        </div>
        
        {/* Content Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Premium Content Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contentFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-6 border-b-2 border-green-500 hover:bg-gray-800 transition-colors duration-300">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-green-400">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mb-16 bg-gray-900 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4">
                <div className="text-3xl font-bold text-green-400 mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Content Showcase */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-lg h-64">
              <div className="absolute inset-0 bg-[url('/api/placeholder/600/400')] bg-cover group-hover:scale-105 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-xl font-bold">Award Winners</h3>
                <p className="text-gray-300 text-sm">Oscars, Emmys, and more</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg h-64">
              <div className="absolute inset-0 bg-[url('/api/placeholder/600/400')] bg-cover group-hover:scale-105 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-xl font-bold">Global Cinema</h3>
                <p className="text-gray-300 text-sm">Masterpieces from 50+ countries</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg h-64">
              <div className="absolute inset-0 bg-[url('/api/placeholder/600/400')] bg-cover group-hover:scale-105 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-xl font-bold">4K Classics</h3>
                <p className="text-gray-300 text-sm">Remastered in stunning quality</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center bg-gray-900 p-10 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Experience Content Curated For You</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join LanPrime today and discover entertainment that's truly worth your time.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded font-medium transition-colors duration-300 shadow-lg">
            Start Free Trial
          </button>
        </div>
        
        {/* Footer Section */}
        <div className="mt-16 text-center border-t border-gray-800 pt-8">
          <p className="text-gray-500">© 2023 LanPrime. All rights reserved.</p>
          <p className="text-gray-600 mt-2">Where quality entertainment lives.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
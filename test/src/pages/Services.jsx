import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ title, description, icon, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-xl p-8 transition-all duration-300 hover:scale-[1.02] hover:border-green-600 hover:shadow-lg hover:shadow-green-900/20"
    >
      <div className="flex items-center mb-6">
        <div className="bg-green-600/10 p-3 rounded-lg mr-4">
          <span className="text-green-500 text-2xl">{icon}</span>
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const PricingCard = ({ title, price, features, popular, recommended }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -10 : 0,
        borderColor: isHovered ? '#16a34a' : popular ? '#16a34a' : '#1f2937'
      }}
      className={`relative bg-gradient-to-b from-gray-900 to-gray-800 border-2 rounded-xl overflow-hidden transition-all duration-300 ${popular ? 'border-green-600 shadow-lg shadow-green-900/20' : 'border-gray-800'}`}
    >
      {popular && (
        <div className="bg-green-600 text-white text-center py-2 font-bold text-sm">
          MOST POPULAR
        </div>
      )}
      {recommended && (
        <div className="absolute top-0 right-0 bg-yellow-500 text-gray-900 px-3 py-1 font-bold text-xs rounded-bl-lg">
          RECOMMENDED
        </div>
      )}
      <div className="p-8 text-center">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <div className="text-green-500 text-4xl font-bold mb-6">
          ${price}<span className="text-sm text-gray-400">/month</span>
        </div>
        <ul className="text-gray-400 space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center justify-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 rounded-lg font-medium transition-colors duration-300 ${popular ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'} text-white`}
        >
          Select Plan
        </motion.button>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      title: "HD Streaming",
      description: "Enjoy crystal clear video quality with our HD and 4K streaming options on all your favorite content with adaptive bitrate technology.",
      icon: "📺"
    },
    {
      title: "Multi-Device",
      description: "Stream simultaneously on multiple devices with family sharing. Watch on your TV, phone, tablet, and computer.",
      icon: "📱"
    },
    {
      title: "Offline Viewing",
      description: "Download content to watch later when you're offline. Perfect for commuting, traveling, or areas with poor connectivity.",
      icon: "💾"
    },
    // {
    //   title: "Smart Recommendations",
    //   description: "Our AI-powered recommendation engine learns your preferences to suggest content tailored just for you.",
    //   icon: "🎯"
    // },
    // {
    //   title: "Ad-Free Experience",
    //   description: "Enjoy uninterrupted viewing with absolutely no advertisements, commercials, or sponsored content.",
    //   icon: "🚫"
    // },
    {
      title: "Exclusive Originals",
      description: "Access award-winning original shows, movies, and documentaries you won't find anywhere else.",
      icon: "🌟"
    }
  ];

  const pricingPlans = [
    {
      title: "Basic",
      price: "7.99",
      features: [
        "HD Streaming",
        "1 Device at a time",
        "Basic content library",
        "No downloads",
        "Limited to 720p"
      ],
      popular: false,
      recommended: false
    },
    {
      title: "Standard",
      price: "12.99",
      features: [
        "Full HD Streaming",
        "3 Devices at a time",
        "Full content library",
        "Limited downloads (10 titles)",
        "Parental controls"
      ],
      popular: true,
      recommended: true
    },
    {
      title: "Premium",
      price: "17.99",
      features: [
        "4K Ultra HD & HDR",
        "5 Devices at a time",
        "Full content + exclusives",
        "Unlimited downloads",
        "Dolby Atmos sound"
      ],
      popular: false,
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
            Elevate Your Entertainment
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover the premium features that make <span className="font-semibold text-green-400">LanPrime</span> the ultimate streaming platform for discerning viewers.
          </p>
        </motion.div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={index}
            />
          ))}
        </div>
        
        {/* Pricing Section */}
        <div className="mb-24">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4 text-center"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 text-center max-w-2xl mx-auto mb-12"
          >
            Choose the perfect plan for your needs. Cancel anytime, no questions asked.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                title={plan.title}
                price={plan.price}
                features={plan.features}
                popular={plan.popular}
                recommended={plan.recommended}
              />
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-800 rounded-2xl p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to experience premium streaming?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join millions of satisfied users enjoying unlimited entertainment. Start your free trial today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-medium transition-colors duration-300"
            >
              Start 7-Day Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent hover:bg-gray-800 text-white border border-gray-600 px-8 py-4 rounded-full font-medium transition-colors duration-300"
            >
              Compare Plans
            </motion.button>
          </div>
          <p className="text-sm text-gray-500 mt-4">No credit card required. Cancel anytime.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
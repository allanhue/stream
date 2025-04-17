import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, useState] = {
    name: '',
    email: '',
    message: ''
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">Contact Us</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">We'd love to hear from you. Reach out to our team with any questions or feedback.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info Section */}
          <div className="space-y-8">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 shadow-lg transform transition hover:scale-105">
              <h2 className="text-2xl font-semibold mb-6 text-indigo-300">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-600 p-3 rounded-full">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:support@streamvibe.com" className="text-indigo-300 hover:text-indigo-200">support@streamvibe.com</a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-600 p-3 rounded-full">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-indigo-300">(123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-600 p-3 rounded-full">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Address</p>
                    <p className="text-indigo-300">123 Streaming Street, Digital City</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-300">Office Hours</h2>
              <div className="space-y-2">
                <p className="flex justify-between"><span>Monday - Friday:</span> <span>9:00 AM - 6:00 PM</span></p>
                <p className="flex justify-between"><span>Saturday:</span> <span>10:00 AM - 4:00 PM</span></p>
                <p className="flex justify-between"><span>Sunday:</span> <span>Closed</span></p>
              </div>
            </div>
          </div>
          
          {/* Form Section */}
          <div className="bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-300">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                <input
                  type="email"
                  className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
                <select className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Billing Question</option>
                  <option>Feature Request</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                <textarea
                  className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-3 text-white h-36 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:from-indigo-700 hover:to-indigo-900 transition transform hover:-translate-y-1"
              >
                <span>Send Message</span>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
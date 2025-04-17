import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <div className="text-gray-300">
        <p className="mb-2">Email: support@streamvibe.com</p>
        <p className="mb-2">Phone: (123) 456-7890</p>
        <p className="mb-4">Address: 123 Streaming Street, Digital City</p>
        
        <form className="max-w-md">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full bg-gray-800 rounded px-3 py-2 text-white"
              placeholder="Your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full bg-gray-800 rounded px-3 py-2 text-white"
              placeholder="Your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              className="w-full bg-gray-800 rounded px-3 py-2 text-white h-32"
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
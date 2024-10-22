import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactSupport = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://api.beekeeper.ai/v1/contact-support', formData);
      toast.success('Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
    >
      <h2 className="text-3xl font-bold mb-6">Contact Support</h2>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        <div>
          <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
          <p className="mb-4">
            We're here to help! If you have any questions, concerns, or feedback, please don't hesitate to reach out to us.
          </p>
          <div className="flex items-center mb-2">
            <Phone className="mr-2" size={20} />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center mb-4">
            <Mail className="mr-2" size={20} />
            <span>support@beekeeper.ai</span>
          </div>
          <p>
            Our support team is available Monday through Friday, 9:00 AM to 5:00 PM EST.
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
              />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className={`flex items-center justify-center w-full p-2 rounded ${
                theme === 'dark'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <Send size={20} className="mr-2" />
              Send Message
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactSupport;
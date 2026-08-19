import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, MapPin,  Wrench, Calendar, Clock, MessageSquare, Headset, File, Building, Pen } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Contactpage() {

const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    CompanyName: '',
    productRequired: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.fullName || !formData.mobile || !formData.email || !formData.CompanyName || !formData.productRequired ) {
    toast.error('Please fill in all required fields');
    return;
  }

  try {
    const response = await fetch(`${API}/email/contact`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    fullName: formData.fullName,
    mobile: formData.mobile,
    email: formData.email,
    companyName: formData.CompanyName,
    productRequired: formData.productRequired,
    message: formData.message || "No message",
  }),
});

if (!response.ok) {
  throw new Error("Failed to send contact request");
}

    toast.success('Request submitted successfully! Our team will contact you soon.');
    setFormData({
      fullName: '',
      mobile: '',
      email: '',
      CompanyName: '',
      productRequired: '',
      message: '',
    });

  } catch (error) {
    toast.error('Failed to send. Please try again.');
  }
};

  return (
    <div className="w-full bg-[#010c29]">
      <section className="relative py-8 px-4  pt-30">


        <div className="max-w-7xl mx-auto relative z-10">
          {/* Contact Us Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center px-6 py-2 bg-[rgba(201,141,62,0.27)] text-[#ff5700] rounded-full text-sm font-semibold">
              Contact Us
            </span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#e8f0ff] leading-tight px-4 text-center mb-6">
            Let's Build Something <span className="text-[#ff5700]">Extraordinary</span>
          </h1>
          
          <p className="text-[rgba(180,200,255,0.73)] text-sm sm:text-base font-medium text-center">
            Whether you're evaluating IRIS IoT or need technical support — our team is ready to help.
          </p> 
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-10 px-4 ">
        <div className="max-w-6xl mx-auto ">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Email Us */}
            <div className="bg-gray-100 border border-[rgba(255,136,0,0.23)] hover:border-[#ff5700] rounded-3xl p-8 h-72 hover:shadow-[0px_0px_10px_0px_#ff5700,0px_0px_32px_0px_rgba(0,198,255,0.22)]">
              <div className="flex justify-center mb-6">
                <div className="bg-linear-to-t from-[#d84800] to-[#ff5700] rounded-2xl p-4">
                  <Mail className="w-7 h-7 text-black" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-2 text-center">Email Us</h3>
              <p className="text-base text-black mb-6 text-center font-semibold">team@hyperlinktech.in</p>
              <a
                href="mailto:team@hyperlinktech.in"
                className="block w-full bg-linear-to-r from-[#d84800] to-[#ff5700] hover:opacity-95 hover:-translate-y-1 transition-all duration-300 text-white font-bold py-3 rounded-xl text-center"
              >
                Send Email
              </a>
            </div>

            {/* Call Us */}
            <div className="bg-gray-100 border border-[rgba(255,136,0,0.23)] hover:border-[#ff5700] rounded-3xl p-8 h-72 hover:shadow-[0px_0px_10px_0px_#ff5700,0px_0px_32px_0px_rgba(0,198,255,0.22)]">
              <div className="flex justify-center mb-6">
                <div className="bg-linear-to-t from-[#d84800] to-[#ff5700] rounded-2xl p-4">
                  <Phone className="w-7 h-7 text-black" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-2 text-center">Call Us</h3>
              <p className="text-base text-black mb-6 text-center font-semibold">+91 7904778125</p>

              <a
                href="tel:+917904778125"
                className="block w-full bg-linear-to-r from-[#d84800] to-[#ff5700] hover:opacity-95 hover:-translate-y-1 transition-all duration-300 text-white font-bold py-3 rounded-xl text-center"
              >
                Call Now
              </a>
            </div>

            {/* WhatsApp Us */}
            <div className="bg-gray-100 border border-[rgba(255,136,0,0.23)] hover:border-[#ff5700] rounded-3xl p-8 h-72 hover:shadow-[0px_0px_10px_0px_#ff5700,0px_0px_32px_0px_rgba(0,198,255,0.22)]">
              <div className="flex justify-center mb-6">
                <div className="bg-linear-to-t from-[#d84800] to-[#ff5700] rounded-2xl p-4">
                    <FaWhatsapp className="w-7 h-7 text-black" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-2 text-center">WhatsApp Us</h3>
              <p className="text-base text-black mb-6 text-center font-semibold">+91 7904778125</p>
              
              <a
                href="https://wa.me/+917904778125"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-linear-to-r from-[#d84800] to-[#ff5700] hover:opacity-95 hover:-translate-y-1 transition-all duration-300 text-white font-bold py-3 rounded-xl text-center"
              >
                WhatsApp Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    
      <section className="py-10 px-6 bg-white">  
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-15">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">How it Works</h2>
          
            <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-10 mb-10 flex-wrap">

            {/* Step 1 */}
            <div className="flex items-center gap-2 sm:gap-3">
                
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-[#010c29] to-[#01174f] flex items-center justify-center shrink-0">
                <Pen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>

                <div>
                <p className="text-sm sm:text-lg font-medium text-black leading-tight">
                    Fill Your
                </p>

                <p className="text-sm sm:text-lg font-medium text-black leading-tight">
                    details
                </p>
                </div>

            </div>

            {/* Arrow */}
            <div className="text-xl sm:text-3xl text-gray-400">
                →
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-2 sm:gap-3">

                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-[#010c29] to-[#01174f] flex items-center justify-center shrink-0">
                <File className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>

                <div>
                <p className="text-sm sm:text-lg font-medium text-black leading-tight">
                    Share your
                </p>

                <p className="text-sm sm:text-lg font-medium text-black leading-tight">
                    requirements
                </p>
                </div>

            </div>

            {/* Arrow */}
            <div className="text-xl sm:text-3xl text-gray-400">
                →
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-2 sm:gap-3">

                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-[#010c29] to-[#01174f] flex items-center justify-center shrink-0">
                <Headset className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>

                <div>
                <p className="text-sm sm:text-lg font-medium text-black leading-tight">
                    Our expert
                </p>

                <p className="text-sm sm:text-lg font-medium text-black leading-tight">
                    contacts you
                </p>
                </div>

            </div>

            </div>
          </div>
  
      

      {/* Form Section */}
          <div className="bg-white border border-gray-200 rounded-[40px] shadow-2xl p-8 md:p-12 max-w-4xl mx-auto mb-20">
            <h3 className="text-3xl font-semibold text-black mb-8">Tell Us about your Project</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Mobile */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <div className="absolute left-0 top-0 w-12 h-12 bg-gray-300 bg-opacity-50 rounded-l-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full h-12 pl-16 pr-4 bg-[#f3f8f3] border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff5700]"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-0 top-0 w-12 h-12 bg-gray-300 bg-opacity-50 rounded-l-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-gray-600" />
                  </div>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="w-full h-12 pl-16 pr-4 bg-[#f3f8f3] border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff5700]"
                    required
                  />
                </div>
              </div>

              {/* Email and Location */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <div className="absolute left-0 top-0 w-12 h-12 bg-gray-300 bg-opacity-50 rounded-l-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-gray-600" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full h-12 pl-16 pr-4 bg-[#f3f8f3] border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff5700]"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-0 top-0 w-12 h-12 bg-gray-300 bg-opacity-50 rounded-l-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-gray-600" />
                  </div>
                  <input
                    type="text"
                    name="CompanyName"
                    value={formData.CompanyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="w-full h-12 pl-16 pr-4 bg-[#f3f8f3] border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff5700]"
                    required
                  />
                </div>
              </div>

              
              {/* Product Required */}
              <div className="relative">
                <div className="absolute left-0 top-0 w-12 h-12 bg-gray-300 bg-opacity-50 rounded-l-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-gray-600" />
                </div>
                <select
                  name="productRequired"
                  value={formData.productRequired}
                  onChange={handleChange}
                  className="w-full h-12 pl-16 pr-4 bg-[#f3f8f3] border border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5700] appearance-none cursor-pointer"
                >
                  <option value="">Select a Product</option>
                  <option value="Iris IOT Gateway">Iris IOT Gateway</option>
                </select>
              </div>
              

              {/* Message */}
              <div className="relative">
                <div className="absolute left-0 top-0 w-12 h-24 bg-gray-300 bg-opacity-50 rounded-l-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-gray-600" />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message (Optional)"
                  // rows={3}
                  className="w-full pl-16 pr-4 py-3 h-24 bg-[#f3f8f3] border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff5700] resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-14 bg-linear-to-r from-[#d84800] to-[#ff5700] hover:opacity-95 hover:-translate-y-1 transition-all duration-300 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl cursor-pointer"
              >
                Submit
              </button>

              <p className="text-center text-gray-600 text-sm">
                Our Team will contact you soon.
              </p>
            </form>
          </div>
          </section>

    </div>
  );
}

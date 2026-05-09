import { GitBranch } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#010c29] py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-[#e8f0ff] text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              Iris <span className="text-[#ff5700]">IOT</span>
            </div>
            <p className="text-[rgba(180,200,255,0.73)] text-xs sm:text-sm font-light leading-relaxed">
              IRIS is an advanced Industrial IoT Gateway by Hyperlink Technologies, designed to seamlessly connect machines, sensors, and industrial systems with cloud platforms.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-[#e8f0ff] text-sm sm:text-base font-bold mb-3 sm:mb-4 tracking-wider uppercase">
              Contact Us
            </h3>
            <div className="space-y-2">  
              <p className="text-[rgba(180,200,255,0.73)] text-xs sm:text-sm font-light hover:text-[#ff5700]">
                <a href="tel:+9876543210">+91 7904778125</a>
              </p>
              <p className="text-[rgba(180,200,255,0.73)] text-xs sm:text-sm font-light hover:text-[#ff5700]">
                <a href="mailto:team@hyperlinktech.in">team@hyperlinktech.in</a>
              </p>
            </div>
          </div>

          {/* Docs */}
          <div>
            <h3 className="text-[#e8f0ff] text-sm sm:text-base font-bold mb-3 sm:mb-4 tracking-wider uppercase">
              Docs
            </h3>
            <div className="space-y-2">
              <a href="https://www.hyperlinktech.in/hyperlink-technologies-term-and-conditions" className="block text-[rgba(180,200,255,0.73)] text-xs sm:text-sm font-light hover:text-[#ff5700] transition-colors">
                Terms & Conditions
              </a>
              <a href="https://www.hyperlinktech.in/hyperlink-technologies-privacy-policy" className="block text-[rgba(180,200,255,0.73)] text-xs sm:text-sm font-light hover:text-[#ff5700] transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-[#e8f0ff] text-sm sm:text-base font-bold mb-3 sm:mb-4 tracking-wider uppercase">
              Social
            </h3>
            <div className="flex gap-3 sm:gap-4">
              <a href="https://www.linkedin.com/company/hyperlink-technologies-hlt/" className="text-[rgba(180,200,255,0.73)] hover:text-[#ff5700] transition-colors">
                <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://www.instagram.com/hyperlinktech/" className="text-[rgba(180,200,255,0.73)] hover:text-[#ff5700] transition-colors">
                <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://www.facebook.com/people/HyperLink-Technologies/61562372639876/" className="text-[rgba(180,200,255,0.73)] hover:text-[#ff5700] transition-colors">
                <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://www.youtube.com/@hyperlinktech" className="text-[rgba(180,200,255,0.73)] hover:text-[#ff5700] transition-colors">
                <FaYoutube className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[rgba(255,136,0,0.23)] pt-6 sm:pt-8">
          <p className="text-[#ff5700] text-xs font-light text-center">
            © 2035 Iris IoT Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

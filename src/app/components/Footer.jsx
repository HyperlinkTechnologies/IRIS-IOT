// import { Linkedin, Instagram, Youtube, Twitter } from 'lucide-react';
import { GitBranch } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#010c29] py-16 px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="text-[#e8f0ff] text-xl font-bold mb-4">
              Iris <span className="text-[#ff5700]">IOT</span>
            </div>
            <p className="text-[rgba(180,200,255,0.73)] text-sm font-light leading-relaxed">
              IRIS is an advanced Industrial IoT Gateway by Hyperlink Technologies, designed to seamlessly connect machines, sensors, and industrial systems with cloud platforms.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-[#e8f0ff] text-base font-bold mb-4 tracking-wider uppercase">
              Contact Us
            </h3>
            <div className="space-y-2">
              <p className="text-[rgba(180,200,255,0.73)] text-sm font-light">
                +91 7904778125
              </p>
              <p className="text-[rgba(180,200,255,0.73)] text-sm font-light">
                team@hyperlinktech.in
              </p>
            </div>
          </div>

          {/* Docs */}
          <div>
            <h3 className="text-[#e8f0ff] text-base font-bold mb-4 tracking-wider uppercase">
              Docs
            </h3>
            <div className="space-y-2">
              <a href="#" className="block text-[rgba(180,200,255,0.73)] text-sm font-light hover:text-[#ff5700] transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="block text-[rgba(180,200,255,0.73)] text-sm font-light hover:text-[#ff5700] transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-[#e8f0ff] text-base font-bold mb-4 tracking-wider uppercase">
              Social
            </h3>
            <div className="flex gap-4">
              <a href="#" className="text-[rgba(180,200,255,0.73)] hover:text-[#ff5700] transition-colors">
                {/* <Linkedin className="w-6 h-6" /> */}
              </a>
              <a href="#" className="text-[rgba(180,200,255,0.73)] hover:text-[#ff5700] transition-colors">
                {/* <Instagram className="w-6 h-6" /> */}
              </a>
              {/* <a href="#" className="text-[rgba(180,200,255,0.73)] hover:text-[#ff5700] transition-colors">
                <Facebook className="w-6 h-6" />
              </a> */}
              <a href="#" className="text-[rgba(180,200,255,0.73)] hover:text-[#ff5700] transition-colors">
                {/* <Youtube className="w-6 h-6" /> */}
              </a>
              <a href="#" className="text-[rgba(180,200,255,0.73)] hover:text-[#ff5700] transition-colors">
                {/* <Twitter className="w-6 h-6" /> */}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[rgba(255,136,0,0.23)] pt-8">
          <p className="text-[#ff5700] text-xs font-light text-center">
            © 2035 Iris IoT Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

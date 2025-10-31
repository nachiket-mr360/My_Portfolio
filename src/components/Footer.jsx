import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiInstagram, FiTwitter, FiHeart } from 'react-icons/fi';
import aboutData from '../data/about.json';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: FiGithub, url: aboutData.social.github, label: 'GitHub' },
    { icon: FiLinkedin, url: aboutData.social.linkedin, label: 'LinkedIn' },
    { icon: FiInstagram, url: aboutData.social.instagram, label: 'Instagram' },
    { icon: FiTwitter, url: aboutData.social.twitter, label: 'Twitter' },
  ];

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-purple-400">
                {aboutData.nickname}
              </span>
            </h3>
            <p className="text-gray-400 mb-4">
              {aboutData.tagline}
            </p>
            <p className="text-gray-500 text-sm">
              Building the web, one pixel at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-lg hover:bg-primary-600 transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              © {currentYear} {aboutData.nickname}. All rights reserved.
              <span className="flex items-center gap-1">
                Made with <FiHeart className="text-red-500 animate-pulse" /> and ☕
              </span>
            </p>
            <p className="text-gray-500 text-sm">
              Designed & Built by {aboutData.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

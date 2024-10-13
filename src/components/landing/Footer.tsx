import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary py-4">
      <div className="max-w-7xl mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Beam. All rights reserved.</p>
        <ul className="flex justify-center space-x-4 mt-2">
          <li>
            <a href="/privacy-policy" className="hover:underline text-light-text-primary dark:text-dark-text-primary">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms-of-service" className="hover:underline text-light-text-primary dark:text-dark-text-primary">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline text-light-text-primary dark:text-dark-text-primary">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

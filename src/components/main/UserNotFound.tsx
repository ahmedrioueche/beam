import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const UserNotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary">
      <h1 className="text-5xl font-f1 font-semibold mb-4">404</h1>
      <h2 className="text-2xl font-f1 font-medium mb-4">We couldn't find the user you're looking for.</h2>
      <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-8">
        The user may have been deleted, or the URL may be incorrect.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-light-primary text-white dark:bg-dark-primary rounded-lg shadow-md hover:bg-light-secondary dark:hover:bg-dark-secondary transition-all"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default UserNotFound;

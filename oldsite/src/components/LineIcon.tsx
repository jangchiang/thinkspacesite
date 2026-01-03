// src/components/LineIcon.tsx
import React from 'react';

const LineIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    fill="currentColor"
    {...props}
  >
    {/* SVG path data for the LINE icon */}
    <path d="M25 1C11.9 1 1 10.3 1 21.9c0 9 7.1 16.6 17 19.3v6.7c0 .8.9 1.3 1.6.9L32 41.9c10-2.6 17-10.3 17-19.9C49 10.3 38.1 1 25 1zm-6 25h-4v-9h4v9zm6 0h-4v-9h4v9zm6 0h-4v-9h4v9zm6 0h-4v-9h4v9z" />
  </svg>
);

export default LineIcon;

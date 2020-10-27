import React from 'react';
import { Link } from 'react-router-dom';
export const Welcome = () => (
  <div>
    Hello, <Link to="/classrooms">Go to classroom</Link>
  </div>
);

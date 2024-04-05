import React from 'react';
import { Link } from 'react-router-dom';

export default function InternalServerErrorLayout() {
  return (
    <div className="error">
      <h2 className="error__title">500</h2>
      <h3 className="error__description">Internal Server Error</h3>
      <Link className="error__link" to="/">Home</Link>
    </div>
  );
}

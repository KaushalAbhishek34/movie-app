import React from 'react';
import './component.css';

const Shimmer = ({ width = '100%', height = '100px', borderRadius = 4 }) => {
  return (
    <div className="shimmer" style={{ width, height, borderRadius }}>
      <div className="shimmer-content"></div>
    </div>
  );
};

export default Shimmer;

import React from 'react';

const ResultBlock = ({ result }) => {
  return (
    <div className="resultBlock">
      <span data-testid="displayResult">{result}</span>
    </div>
  )
};

export default ResultBlock;
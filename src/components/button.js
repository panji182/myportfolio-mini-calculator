import React, { memo } from 'react';

const isComponentNotUpdate = (prevProps, nextProps) => {
  // prevent rerender unclicked buttons
  let setNotUpdated = true;
  const { currentInput } = nextProps.calc;
  const { value } = nextProps
  if (currentInput === value) {
    setNotUpdated = JSON.stringify(prevProps.calc) === JSON.stringify(nextProps.calc);
  }
  return setNotUpdated;
}

const Button = memo(({
  value,
  onHandleClick
}) => <div className="button" onClick={() => onHandleClick(value)} data-testid="button">{value}</div>, isComponentNotUpdate);

export default Button;
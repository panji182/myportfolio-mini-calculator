import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import ResultBlock from "./components/resultBlock";
import Button from "./components/button";

export const initCalc = {
  num1 : 0,
  num2 : 0,
  operator: '',
  currentInput: undefined,
  result: undefined,
  inputState: 'num1'
};

function App () {
  const [displayResult, setDisplayResult] = useState('0');
  const [calc, setCalc] = useState(initCalc);

  const onCalculate = (num1, num2, operator) => {
    let result = 0; 
    switch (operator) {
      case '+':
        result = Number(num1) + Number(num2);
        break;
      case '-':
        result = Number(num1) - Number(num2);
        break;
      case 'x':
        result = Number(num1) * Number(num2);
        break;
      case '/':
        result = Number(num1) / Number(num2);
        break;
      default:
        result = Number(num1) + Number(num2);
    }
    return result;
  };

  const setDisplay = (display) => {
    return display || '';
  }

  const setOperator = (display, operator) => {
    const operators = ['+', '-', 'x', '/'];
    let disp = display;
    disp = (disp || '').split("");
    if (disp.length > 0) {
      const lastChar = disp[disp.length - 1];
      if (operators.includes(lastChar)) {
        disp[disp.length - 1] = operator;
      } else {
        disp.push(operator);
      }
    }
    return disp.join("");
  }

  const onHandleClick = (value) => {
    if (isFinite(value)) {
      setCalc((prevState) => {
        const { num1, num2, result, inputState } = prevState;
        let setUpCalc = {}, setNum1 = {}, setNum2 = {};
        if (result && inputState === 'finished') {
          setUpCalc = {
            result: undefined,
            inputState: 'num1',
            currentInput: value
          };
        }
        switch (inputState) {
          case 'num1' :
            setNum1 = {
              num1: !num1 ? value.toString() : num1.toString()+value.toString(),
              currentInput: value
            };
            setDisplayResult((prevState) => prevState !== '0'
              ? prevState+value
              : setDisplay(setNum1['num1'])
            );
            break;
          case 'num2' :
            setNum2 = {
              num2: !num2 ? value.toString() : num2.toString()+value.toString(),
              currentInput: value
            };
            setDisplayResult((prevState) => prevState+value);
            break;
          default:
            setNum1 = {
              num1: !num1 ? value.toString() : num1.toString()+value.toString(),
              currentInput: value
            };
            setDisplayResult((prevState) => prevState !== '0'
              ? prevState+value
              : setDisplay(setNum1['num1'])
            );
        }
        return {
          ...prevState,
          ...setUpCalc,
          ...setNum1,
          ...setNum2
        };
      });
    } else {
      setCalc((prevState) => {
        const {
          num1,
          num2,
          operator,
          result,
          inputState
        } = prevState;
        let setUpCalc = {}, resultTmp;
        if (value !== 'C' && value !== '=') {
          setUpCalc = {
            operator: value,
            inputState: 'num2',
            currentInput: value
          };
          if (inputState === 'finished' && result !== undefined) {
            setUpCalc = {
              ...setUpCalc,
              num1 : result,
              num2 : 0
            };
            setDisplayResult((prevState) => `${prevState}${result}${value}`);
          } else if (num1 && num2) {
            resultTmp = onCalculate(num1, num2, operator);
            setUpCalc = {
              ...setUpCalc,
              num1 : resultTmp.toString(),
              num2 : 0,
              operator: value,
              inputState: 'num2'
            };
            setDisplayResult((prevState) => `${prevState}=${resultTmp}, ${resultTmp}${value}`);
          } else {
            setDisplayResult((prevState) => setOperator(prevState, value));
          }
        } else if (value === 'C') {
          setUpCalc = {
            ...initCalc,
            currentInput: value
          };
          setDisplayResult('0');
        } else if (value === '=') {
          resultTmp = onCalculate(num1, num2, operator);
          setUpCalc = {
            num1 : 0,
            num2 : 0,
            operator: '',
            result: resultTmp,
            inputState: 'finished',
            currentInput: value
          };
          setDisplayResult((prevState) => `${prevState}${value}${resultTmp}, `);
        }
        return {
          ...prevState,
          ...setUpCalc
        };
      });
    }
  }

  const sendedProps = {
    calc,
    onHandleClick
  };

  return (
    <div className="wrapper">
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>React Calculator</h3>
        </header>
        <ResultBlock result={displayResult} />
        <div className="inputsBlock">
          <div className="row">
            <Button {...sendedProps} value={1} />
            <Button {...sendedProps} value={2} />
            <Button {...sendedProps} value={3} />
            <Button {...sendedProps} value={"C"} />
          </div>
          <div className="row">
            <Button {...sendedProps} value={4} />
            <Button {...sendedProps} value={5} />
            <Button {...sendedProps} value={6} />
            <Button {...sendedProps} value={"+"} />
          </div>
          <div className="row">
            <Button {...sendedProps} value={7} />
            <Button {...sendedProps} value={8} />
            <Button {...sendedProps} value={9} />
            <Button {...sendedProps} value={"-"} />
          </div>
          <div className="row">
            <Button {...sendedProps} value={0} />
            <Button {...sendedProps} value={"x"} />
            <Button {...sendedProps} value={"/"} />
            <Button {...sendedProps} value={"="} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

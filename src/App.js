import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';

let num = {
  num1 : "",
  num2 : "",
  result: ""
};

let setNum = "num1", addedStr = "";
let opr = "+", oprAdd = true;

function App (props) {
  const [result,setResult] = useState("0");

  function clickBtnNum (ev,value) {
    updateView(value);
    if (setNum === "num1") {
      num.num1 += value;
    } else {
      num.num2 += value;
    }
    oprAdd = true;
  }

  function clickBtnOpr (ev,value) {
    if (value !== "=") {
      if (num.num1 !== "" && num.num2 !== "") {
        calculate();
        num.num1 = num.result;
        num.num2 = "";
        setNum = "num2";
        opr = value;
        if (oprAdd) {
          updateView("=" + num.result + opr);
          oprAdd = !oprAdd;
        }
      } else {
        if (num.result !== "") {
          num.num1 = num.result;
          num.num2 = "";
          setNum = "num2";
        }
        if (oprAdd) opr = value;
        if (setNum === "num1" && num.num1 === "") {
          num.num1 = "0";
          if (oprAdd) {
            updateView(num.num1 + opr);
            oprAdd = !oprAdd;
          }
        } else {
          if (oprAdd) {
            updateView(opr);
            oprAdd = !oprAdd;
          }
        }
      }
      if (setNum === "num1") {
        setNum = "num2";
      }
    } else {
      if (num.num1 === "") {
        num.num1 = "0";
      }
      if (num.num2 === "") {
        num.num2 = "0";
      }
      calculate();
      if (num.num1 === "0" && num.num2 === "0") {
        updateView(num.num1 + opr + num.num2 + "=" + num.result + ", ");
      } else {
        updateView("=" + num.result + ", ");
      }
      num.num1 = "";
      num.num2 = "";
      num.result = "";
      setNum = "num1";
      oprAdd = true;
    }
  }

  function clickBtnClear () {
    num.num1 = "";
    num.num2 = "";
    num.result = "";
    setNum = "num1"
    addedStr = "";
    opr = "+";
    oprAdd = true;
    setResult("0");
  }

  function checkNumber(strNum) {
    return (strNum===""?0:
      (isNaN(strNum)?0:parseFloat(strNum))
    );
  }

  function calculate() {
    let num1 = checkNumber(num.num1);
    let num2 = checkNumber(num.num2);
    switch(opr) {
      case "+" : num.result = (num1 + num2).toString(); break;
      case "-" : num.result = (num1 - num2).toString(); break;
      case "x" : num.result = (num1 * num2).toString(); break;
      case "/" : num.result = (num1 / num2).toString(); break;
      default : num.result = (num1 + num2).toString();
    }
  }

  useEffect(() => { //cdu
    if (result === "") {
      setResult(result + addedStr);
    }
  },[result])

  function updateView(strAdd) {
    if (result === "0") {
      addedStr = strAdd;
      setResult("");
    } else {
      setResult(result + strAdd);
    }
  }

  return (
    <div className="wrapper">
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>React Calculator</h3>
        </header>
        <div className="resultBlock">
          <span>{result}</span>
        </div>
        <div className="inputsBlock">
          <div className="row">
            <div className="button" onClick={ (ev) => clickBtnNum(ev,1) }>1</div>
            <div className="button" onClick={ (ev) => clickBtnNum(ev,2) }>2</div>
            <div className="button" onClick={ (ev) => clickBtnNum(ev,3) }>3</div>
            <div className="button" onClick={ () => clickBtnClear() }>C</div>
          </div>
          <div className="row">
            <div className="button" onClick={ (ev) => clickBtnNum(ev,4) }>4</div>
            <div className="button" onClick={ (ev) => clickBtnNum(ev,5) }>5</div>
            <div className="button" onClick={ (ev) => clickBtnNum(ev,6) }>6</div>
            <div className="button" onClick={ (ev) => clickBtnOpr(ev,"+") }>+</div>
          </div>
          <div className="row">
            <div className="button" onClick={ (ev) => clickBtnNum(ev,7) }>7</div>
            <div className="button" onClick={ (ev) => clickBtnNum(ev,8) }>8</div>
            <div className="button" onClick={ (ev) => clickBtnNum(ev,9) }>9</div>
            <div className="button" onClick={ (ev) => clickBtnOpr(ev,"-") }>-</div>
          </div>
          <div className="row">
            <div className="button" onClick={ (ev) => clickBtnNum(ev,0) }>0</div>
            <div className="button" onClick={ (ev) => clickBtnOpr(ev,"x") }>X</div>
            <div className="button" onClick={ (ev) => clickBtnOpr(ev,"/") }>/</div>
            <div className="button" onClick={ (ev) => clickBtnOpr(ev,"=") }>=</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

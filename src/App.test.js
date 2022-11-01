import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react'
import App from './App';

const buttonIndex = {
  '1': 0,
  '2': 1,
  '3': 2,
  'C': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '+': 7,
  '7': 8,
  '8': 9,
  '9': 10,
  '-': 11,
  '0': 12,
  'x': 13,
  '/': 14,
  '=': 15
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('<App /> Component Testing', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<App />);
  })

  it('should render Logo and Title correctly', () => {
    const { getByTestId, getByText } = wrapper;
    const logo = getByTestId('reactLogo');
    const title = getByText('React Calculator');
    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  })

  it.each([
    ['1','1',buttonIndex['1']],
    ['2','2',buttonIndex['2']],
    ['3','3',buttonIndex['3']],
    ['4','4',buttonIndex['4']],
    ['5','5',buttonIndex['5']],
    ['6','6',buttonIndex['6']],
    ['7','7',buttonIndex['7']],
    ['8','8',buttonIndex['8']],
    ['9','9',buttonIndex['9']],
  ])('should show %s in Result Display when press %s Button', (label, pressed, buttonIndex) => {
    const { getAllByTestId, getByTestId } = wrapper;
    const buttons = getAllByTestId('button');
    fireEvent.click(buttons[buttonIndex]);
    const display = getByTestId('displayResult');
    expect(display).toHaveTextContent(pressed);
  })

  it('should clear the Result display when already pressed some number', () => {
    const { getAllByTestId, getByTestId } = wrapper;
    const buttons = getAllByTestId('button');
    fireEvent.click(buttons[buttonIndex['1']]);
    const display = getByTestId('displayResult');
    expect(display).toHaveTextContent('1');
    fireEvent.click(buttons[buttonIndex['C']]);
    expect(display).toHaveTextContent('0');
  })

  it('should Addition calculation run correctly', () => {
    const { getAllByTestId, getByTestId, debug } = wrapper;
    const buttons = getAllByTestId('button');
    fireEvent.click(buttons[buttonIndex['1']]);
    fireEvent.click(buttons[buttonIndex['+']]);
    fireEvent.click(buttons[buttonIndex['1']]);
    fireEvent.click(buttons[buttonIndex['=']]);
    const display = getByTestId('displayResult');
    expect(display.textContent).toContain('1+1=2,');
  })

  it('should Subtraction calculation run correctly', () => {
    const { getAllByTestId, getByTestId } = wrapper;
    const buttons = getAllByTestId('button');
    fireEvent.click(buttons[buttonIndex['1']]);
    fireEvent.click(buttons[buttonIndex['-']]);
    fireEvent.click(buttons[buttonIndex['1']]);
    fireEvent.click(buttons[buttonIndex['=']]);
    const display = getByTestId('displayResult');
    expect(display.textContent).toContain('1-1=0,');
  })

  it('should Multiplication calculation run correctly', () => {
    const { getAllByTestId, getByTestId } = wrapper;
    const buttons = getAllByTestId('button');
    fireEvent.click(buttons[buttonIndex['2']]);
    fireEvent.click(buttons[buttonIndex['x']]);
    fireEvent.click(buttons[buttonIndex['2']]);
    fireEvent.click(buttons[buttonIndex['=']]);
    const display = getByTestId('displayResult');
    expect(display.textContent).toContain('2x2=4,');
  })

  it('should Division calculation run correctly', () => {
    const { getAllByTestId, getByTestId } = wrapper;
    const buttons = getAllByTestId('button');
    fireEvent.click(buttons[buttonIndex['4']]);
    fireEvent.click(buttons[buttonIndex['/']]);
    fireEvent.click(buttons[buttonIndex['2']]);
    fireEvent.click(buttons[buttonIndex['=']]);
    const display = getByTestId('displayResult');
    expect(display.textContent).toContain('4/2=2,');
  })

  it('should have a sustainable calculation', () => {
    const { getAllByTestId, getByTestId } = wrapper;
    const buttons = getAllByTestId('button');
    fireEvent.click(buttons[buttonIndex['2']]);
    fireEvent.click(buttons[buttonIndex['+']]);
    fireEvent.click(buttons[buttonIndex['2']]);
    fireEvent.click(buttons[buttonIndex['-']]);
    fireEvent.click(buttons[buttonIndex['3']]);
    fireEvent.click(buttons[buttonIndex['=']]);
    const display = getByTestId('displayResult');
    expect(display.textContent).toContain('2+2=4, 4-3=1,');
  })

  it('should sustainable calculation still valid when calculation process finished', () => {
    const { getAllByTestId, getByTestId } = wrapper;
    const buttons = getAllByTestId('button');
    fireEvent.click(buttons[buttonIndex['2']]);
    fireEvent.click(buttons[buttonIndex['+']]);
    fireEvent.click(buttons[buttonIndex['2']]);
    fireEvent.click(buttons[buttonIndex['=']]);
    fireEvent.click(buttons[buttonIndex['x']]);
    fireEvent.click(buttons[buttonIndex['2']]);
    fireEvent.click(buttons[buttonIndex['=']]);
    const display = getByTestId('displayResult');
    expect(display.textContent).toContain('2+2=4, 4x2=8,');
  })

  it('should create new calculation process when calculation start over again', () => {
    const { getAllByTestId, getByTestId } = wrapper;
    const buttons = getAllByTestId('button');
    fireEvent.click(buttons[buttonIndex['2']]);
    fireEvent.click(buttons[buttonIndex['+']]);
    fireEvent.click(buttons[buttonIndex['2']]);
    fireEvent.click(buttons[buttonIndex['=']]);
    fireEvent.click(buttons[buttonIndex['3']]);
    fireEvent.click(buttons[buttonIndex['x']]);
    fireEvent.click(buttons[buttonIndex['4']]);
    fireEvent.click(buttons[buttonIndex['=']]);
    const display = getByTestId('displayResult');
    expect(display.textContent).toContain('2+2=4, 3x4=12,');
  })

  it('should change the calculation operator on sustainable calculation', () => {
    const { getAllByTestId, getByTestId } = wrapper;
    const buttons = getAllByTestId('button');
    fireEvent.click(buttons[buttonIndex['2']]);
    fireEvent.click(buttons[buttonIndex['+']]);
    fireEvent.click(buttons[buttonIndex['2']]);
    fireEvent.click(buttons[buttonIndex['x']]);
    fireEvent.click(buttons[buttonIndex['-']]);
    fireEvent.click(buttons[buttonIndex['2']]);
    fireEvent.click(buttons[buttonIndex['=']]);
    const display = getByTestId('displayResult');
    expect(display.textContent).toContain('2+2=4, 4-2=2,');
  })
})

import React from 'react';
import Square from './Square'
import styled from 'styled-components';
import './index.css';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Header = styled.div`
  padding: 16px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Footer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Button = styled.button`
  display: block;
  padding: 8px 16px;
  border: 2px solid black;
  border-radius: 8px;
`

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const initialState = {
    winner: undefined,
    squares: Array(9).fill(null),
    xIsNext: true,
    handCount: 0,
}

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState
  }

  get statusMessage() {
    const { winner, handCount } = this.state
    if (winner) {
      return 'Winner: ' + winner;
    }
    if(handCount === 9){
      return "draw"
    }
    return "processing"
  }

  handleClick = (i) => {
    const squares = this.state.squares.slice();
    if (this.state.winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? '○' : 'X';
    const winner = calculateWinner(squares)
    this.setState({
      squares,
      winner,
      xIsNext: !this.state.xIsNext,
      handCount: this.state.handCount +1,
    });
  }

  renderSquare = (i) => {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  onRestart = () => {
    this.setState({...initialState})
  }

  render() {
    return (
      <Container>
      <div>
        <Header><Title>Tic Tac Toe</Title>
        <div className="turn">
          <div className={`
            ${this.state.xIsNext ? 'active': '' }
            `}
            >O</div>
          <div className={`
            ${!this.state.xIsNext ? 'active': '' }
            `}
            >X</div>
        </div>
        </Header>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <Footer>
          <div className="status">{this.statusMessage}</div>
          <Button onClick={this.onRestart}>
            RESTART
          </Button>
        </Footer>
      </div>
      </Container>
    );
  }
}


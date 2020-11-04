import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      handCount: 0,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? '○' : 'X';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      handCount: this.state.handCount +1,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if(this.state.handCount === 9){
      status = "draw"
    } else{
      status = "processing"
    }
    
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

    // console.log(this.state)
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
          <div className="status">{status}</div>
        </Footer>
      </div>
      </Container>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

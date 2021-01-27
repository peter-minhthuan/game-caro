
import React, { Component } from 'react'
import './caro.scss'
import 'bootstrap/dist/css/bootstrap.css'
import classnames from 'classnames'

const init = {
   matrix: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
   ],
   player: true,
   isEnd: false,
   isBlock: false,
   winner: '',
   prevX: -1,
   prevY: -1
}

class Caro extends Component {

   state = {

   };

   UNSAFE_componentWillMount() {
      if (localStorage.getItem('caro')) {
         const datas = localStorage.getItem('caro');
         this.setState(JSON.parse(datas));
      }
      else {
         this.setState(init);
      }
   }

   checkX = (a, b, c, d, e) => {
      if (a.concat(b, c, d, e) === 'XXXXX') return true;
      return false;
   }

   checkO = (a, b, c, d, e) => {
      if (a.concat(b, c, d, e) === 'OOOOO') return true;
      return false;
   }

   checkRowBlock = (row, key) => {
      for (let i = 0; i < this.state.matrix[0].length; i++) {
         if (this.state.matrix[row][i] !== key && this.state.matrix[row][i] !== ' ') return true;
      }
      return false;
   }

   checkColBlock = (col, key) => {
      for (let i = 0; i < this.state.matrix.length; i++) {
         if (this.state.matrix[i][col] !== key && this.state.matrix[i][col] !== ' ') return true;
      }
      return false;
   }

   checkDiagonalLeftBlock = (row, col, key) => {
      var expect = false, indexRow = row - 1, indexCol = col + 1;
      // check top
      while (indexCol !== this.state.matrix[0].length && indexRow !== -1) {
         if (this.state.matrix[indexRow][indexCol] !== key && this.state.matrix[indexRow][indexCol] !== ' ') expect = true;
         indexRow--;
         indexCol++;
      };
      indexRow = row + 1; indexCol = col - 1; // reset Index
      // check bottom
      while (indexCol !== -1 && indexRow !== this.state.matrix.length) {
         if (this.state.matrix[indexRow][indexCol] !== key && this.state.matrix[indexRow][indexCol] !== ' ') expect = true;
         indexRow++;
         indexCol--;
      };
      return expect;
   }

   checkDiagonalRightBlock = (row, col, key) => {
      var expect = false, indexRow = row - 1, indexCol = col - 1;
      // check top
      while (indexCol !== -1 && indexRow !== -1) {
         if (this.state.matrix[indexRow][indexCol] !== key && this.state.matrix[indexRow][indexCol] !== ' ') expect = true;
         indexRow--;
         indexCol--;
      };
      indexRow = row + 1; indexCol = col + 1; // reset Index

      // check bottom
      while (indexCol !== this.state.matrix[0].length && indexRow !== this.state.matrix.length) {
         if (this.state.matrix[indexRow][indexCol] !== key && this.state.matrix[indexRow][indexCol] !== ' ') expect = true;
         indexRow++;
         indexCol++;
      };
      return expect;
   }

   setIndexsWinner = (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5) => {
      let newArr = this.state.matrix;
      newArr[x1][y1] = 'win';
      newArr[x2][y2] = 'win';
      newArr[x3][y3] = 'win';
      newArr[x4][y4] = 'win';
      newArr[x5][y5] = 'win';
      this.setState({
         matrix: newArr
      })
   }

   solveBlock = () => {
      const val = Array.from(this.state.matrix);

      for (let i = 0; i < this.state.matrix.length; i++) {
         for (let j = 0; j < this.state.matrix[i].length; j++) {
            // check row
            if (j < val[i].length - 4) {
               if (!this.checkRowBlock(i, 'X') && this.checkX(val[i][j], val[i][j + 1], val[i][j + 2], val[i][j + 3], val[i][j + 4])) {
                  this.setIndexsWinner(i, j, i, j + 1, i, j + 2, i, j + 3, i, j + 4);
                  this.setState({
                     winner: 'X',
                     isEnd: true,
                  }); return "x";
               }
               else if (!this.checkRowBlock(i, 'O') && this.checkO(val[i][j], val[i][j + 1], val[i][j + 2], val[i][j + 3], val[i][j + 4])) {
                  this.setIndexsWinner(i, j, i, j + 1, i, j + 2, i, j + 3, i, j + 4);
                  this.setState({
                     winner: 'O',
                     isEnd: true,
                  }); return "O";
               }
            }

            if (i < val.length - 4) {
               // check colum
               if (!this.checkColBlock(j, 'O') && this.checkO(val[i][j], val[i + 1][j], val[i + 2][j], val[i + 3][j], val[i + 4][j])) {
                  this.setIndexsWinner(i, j, i + 1, j, i + 2, j, i + 3, j, i + 4, j);
                  this.setState({
                     winner: 'O',
                     isEnd: true
                  }); return "O";
               }
               else if (!this.checkColBlock(j, 'X') && this.checkX(val[i][j], val[i + 1][j], val[i + 2][j], val[i + 3][j], val[i + 4][j])) {
                  this.setIndexsWinner(i, j, i + 1, j, i + 2, j, i + 3, j, i + 4, j);
                  this.setState({
                     winner: 'X',
                     isEnd: true
                  }); return "X";
               }

               // check diagonal right
               if (j < val[i].length - 4) {
                  if (!this.checkDiagonalRightBlock(i, j, 'X') && this.checkX(val[i][j], val[i + 1][j + 1], val[i + 2][j + 2], val[i + 3][j + 3], val[i + 4][j + 4])) {
                     this.setIndexsWinner(i, j, i + 1, j + 1, i + 2, j + 2, i + 3, j + 3, i + 4, j + 4);
                     this.setState({
                        winner: 'X',
                        isEnd: true
                     }); return "X";
                  }
               }

               if (j < val[i].length - 4) {
                  if (!this.checkDiagonalRightBlock(i, j, 'O') && this.checkO(val[i][j], val[i + 1][j + 1], val[i + 2][j + 2], val[i + 3][j + 3], val[i + 4][j + 4])) {
                     this.setIndexsWinner(i, j, i + 1, j + 1, i + 2, j + 2, i + 3, j + 3, i + 4, j + 4);
                     this.setState({
                        winner: 'O',
                        isEnd: true
                     }); return "O";
                  }
               }

               // check diagonal left
               if (j >= 4) {
                  if (!this.checkDiagonalLeftBlock(i, j, 'O') && this.checkO(val[i][j], val[i + 1][j - 1], val[i + 2][j - 2], val[i + 3][j - 3], val[i + 4][j - 4])) {
                     this.setIndexsWinner(i, j, i + 1, j - 1, i + 2, j - 2, i + 3, j - 3, i + 4, j - 4);
                     this.setState({
                        winner: 'O',
                        isEnd: true
                     }); return "O";
                  }
               }
               if (j >= 4) {
                  if (!this.checkDiagonalLeftBlock(i, j, 'X') && this.checkX(val[i][j], val[i + 1][j - 1], val[i + 2][j - 2], val[i + 3][j - 3], val[i + 4][j - 4])) {
                     this.setIndexsWinner(i, j, i + 1, j - 1, i + 2, j - 2, i + 3, j - 3, i + 4, j - 4);
                     this.setState({
                        winner: 'X',
                        isEnd: true
                     }); return "X";
                  }
               }
            }
         }
      }
   }

   handleLocalStorage = () => {
      localStorage.setItem('caro', JSON.stringify(this.state))
   }

   solve = () => {
      const val = Array.from(this.state.matrix);

      for (let i = 0; i < this.state.matrix.length; i++) {
         for (let j = 0; j < this.state.matrix[i].length; j++) {
            // check row
            if (j < val[i].length - 4) {
               if (this.checkX(val[i][j], val[i][j + 1], val[i][j + 2], val[i][j + 3], val[i][j + 4])) {
                  this.setIndexsWinner(i, j, i, j + 1, i, j + 2, i, j + 3, i, j + 4);
                  this.setState({
                     winner: 'X',
                     isEnd: true
                  }, () => {
                     this.handleLocalStorage();
                  }); return;
               }
               else if (this.checkO(val[i][j], val[i][j + 1], val[i][j + 2], val[i][j + 3], val[i][j + 4])) {
                  this.setIndexsWinner(i, j, i, j + 1, i, j + 2, i, j + 3, i, j + 4);
                  this.setState({
                     winner: 'O',
                     isEnd: true
                  }, () => {
                     this.handleLocalStorage();
                  }); return;
               }
            }

            if (i < val.length - 4) {
               // check colum
               if (this.checkO(val[i][j], val[i + 1][j], val[i + 2][j], val[i + 3][j], val[i + 4][j])) {
                  this.setIndexsWinner(i, j, i + 1, j, i + 2, j, i + 3, j, i + 4, j);
                  this.setState({
                     winner: 'O',
                     isEnd: true
                  }, () => {
                     this.handleLocalStorage();
                  }); return;
               }
               else if (this.checkX(val[i][j], val[i + 1][j], val[i + 2][j], val[i + 3][j], val[i + 4][j])) {
                  this.setIndexsWinner(i, j, i + 1, j, i + 2, j, i + 3, j, i + 4, j);
                  this.setState({
                     winner: 'X',
                     isEnd: true
                  }, () => {
                     this.handleLocalStorage();
                  }); return;
               }

               // check diagonal right
               if (j < val[i].length - 4) {
                  if (this.checkO(val[i][j], val[i + 1][j + 1], val[i + 2][j + 2], val[i + 3][j + 3], val[i + 4][j + 4])) {
                     this.setIndexsWinner(i, j, i + 1, j + 1, i + 2, j + 2, i + 3, j + 3, i + 4, j + 4);
                     this.setState({
                        winner: 'O',
                        isEnd: true
                     }, () => {
                        this.handleLocalStorage();
                     }); return;
                  }
                  else if (this.checkX(val[i][j], val[i + 1][j + 1], val[i + 2][j + 2], val[i + 3][j + 3], val[i + 4][j + 4])) {
                     this.setIndexsWinner(i, j, i + 1, j + 1, i + 2, j + 2, i + 3, j + 3, i + 4, j + 4);
                     this.setState({
                        winner: 'X',
                        isEnd: true
                     }, () => {
                        this.handleLocalStorage();
                     }); return;
                  }
               }

               // check diagonal left
               if (j >= 4) {
                  if (this.checkO(val[i][j], val[i + 1][j - 1], val[i + 2][j - 2], val[i + 3][j - 3], val[i + 4][j - 4])) {
                     this.setIndexsWinner(i, j, i + 1, j - 1, i + 2, j - 2, i + 3, j - 3, i + 4, j - 4);
                     this.setState({
                        winner: 'O',
                        isEnd: true
                     }, () => {
                        this.handleLocalStorage();
                     }); return;
                  }
                  else if (this.checkX(val[i][j], val[i + 1][j - 1], val[i + 2][j - 2], val[i + 3][j - 3], val[i + 4][j - 4])) {
                     this.setIndexsWinner(i, j, i + 1, j - 1, i + 2, j - 2, i + 3, j - 3, i + 4, j - 4);
                     this.setState({
                        winner: 'X',
                        isEnd: true
                     }, () => {
                        this.handleLocalStorage();
                     }); return;
                  }
               }
            }
         }
      }
   }

   winner = (row, col) => {
      if (!this.state.isEnd) {
         const val = Array.from(this.state.matrix);
         let newArr = Array.from(val);

         if (val[row][col] === ' ') {
            val[row][col] = this.state.player ? 'X' : 'O';
            this.setState({
               matrix: newArr,
               player: !this.state.player,
               prevX: row,
               prevY: col
            })
         }
         // check winner
         this.state.isBlock ? this.solveBlock() : this.solve();
         localStorage.setItem('caro', JSON.stringify(this.state));
      }
   }

   handleRestart = () => {
      let newArr = this.state.matrix;
      for (let i = 0; i < newArr.length; i++) {
         for (let j = 0; j < newArr[0].length; j++) {
            newArr[i][j] = ' ';
         }
      }
      this.setState({
         matrix: newArr,
         player: true,
         isEnd: false,
         isBlock: false,
         winner: '',
         prevX: -1,
         prevY: -1
      })
      localStorage.clear();
   }

   render() {
      const { matrix, player, winner, isBlock, prevX, prevY } = this.state;

      return (
         <div className='caro'>
            <div>
               <div className='d-flex justify-content-between mt-3'>
                  <h4 className={classnames('player1', {
                     'display': player
                  })}>Player 1</h4>

                  <div className=' d-flex center'>
                     <p style={{
                        fontSize: '18px'
                     }}>Block rule:
                      <input disabled={isBlock} checked={isBlock} onChange={() => this.setState({ isBlock: !isBlock })}
                           style={{
                              cursor: 'pointer',
                              transform: 'translateY(5px)'
                           }} type='checkbox' ></input></p>
                  </div>

                  <h4 className={classnames('player2', {
                     'display': !player
                  })}>Player 2</h4>
               </div>

               {
                  matrix.map((val, row) => (
                     <div className='d-flex' key={row}>
                        {
                           val.map((val, col) => (
                              <div className='rows' key={col + 1}>
                                 {
                                    matrix[row][col] !== 'win' ? <button style={{
                                       width: '30px',
                                       height: '30px',
                                       marginRight: '2px',
                                       marginBottom: '2px'
                                    }} onClick={() => this.winner(row, col)}>
                                       {
                                          val === 'X'
                                             ? <p className={
                                                classnames({
                                                   'prevX': (prevX === row && prevY === col && prevX !== -1),
                                                   'player1-play': true
                                                })
                                             }>{val}</p>

                                             : <p className={
                                                classnames({
                                                   'prevY': (prevX === row && prevY === col),
                                                   'player2-play': true
                                                })
                                             }>{val}</p>
                                       }
                                    </button>
                                       : <button className={winner === 'X' ? 'prevX' : 'prevY'} style={{
                                          width: '30px',
                                          height: '30px',
                                          marginRight: '2px',
                                          marginBottom: '2px'
                                       }} >
                                          <p className={winner === 'X' ? 'player1-play' : 'player2-play'}>{winner}</p>
                                       </button>
                                 }
                              </div>
                           ))
                        }
                     </div>
                  ))
               }

               <div className='d-flex justify-content-between footer'>
                  <h2 className='text-center'>
                     Winner: {winner === 'X' ? <span style={{
                        color: 'red',
                        fontSize: '45px'
                     }}>{winner}</span> : <span style={{
                        color: 'blue',
                        fontSize: '45px'
                     }}>{winner}</span>}
                  </h2>
                  <button onClick={this.handleRestart} className='btn btn-danger'>New Game</button>
               </div>
            </div>
         </div>
      )
   }
}

export default Caro
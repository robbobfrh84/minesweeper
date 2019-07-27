import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './App.css'

const BOARD_SIZE = 7
const RESET_BUTTON_TEXT = 'New game'
const WINNER_MESSAGE = '🎈 ...YOU ...ARE ...A \n\n WINNER! 🎈'
const LOSER_MESSAGE = " 💥 OH NO! 💥 A MINE! ... that's ok, try again 👍"
const BORDER_CELLS = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]

class App extends Component {

  static propTypes = {
    boardRowsCount: PropTypes.number.isRequired,
    boardColsCount: PropTypes.number.isRequired,
  }

  static defaultProps = {
    boardRowsCount: BOARD_SIZE,
    boardColsCount: BOARD_SIZE,
    classInitial: "cellContents--initial",
    classIsCleared: "cellContents--isCleared",
  }

  state = {
    message: "",
    gameOver: false,
    totalMines: 0,
    totalCleared: 0,
    board: [],
  }

  componentDidMount(){
    this.setState({ board: this.newBoard() })
  }

  componentDidUpdate(){
    // Check to see if all the cells have been cleared, minus the total mines
    if (this.state.totalCleared === (this.props.boardRowsCount * this.props.boardColsCount - this.state.totalMines )){
      this.setState({
        totalCleared: 0,
        gameOver: true,
        message: WINNER_MESSAGE
      })
      this.revealAll()
    }
  }

  render() {

    return (
      <div className="App">

        <div> {this.state.message} </div>

        <button className="resetButton" onClick={this.resetBoard}>
          {RESET_BUTTON_TEXT}
        </button>

        <main className="board">{this.renderRows()}</main>

        <span style={{marginTop: -50}}>
          {this.state.totalMines} 🚩
          <button className="resetButton" onClick={this.showMines}>
            Cheat
          </button>
        </span>

      </div>
    )
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                      ... Render Methods ...
  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  renderRows() {
    return this.state.board.map((row, index) => {
      return (
        <div className="row" key={index}>
          {this.renderRow(index)}
        </div>
      )
    })
  }

  renderRow(rowIndex) {
    return this.state.board[rowIndex].map((cell) => {
      return this.renderCell(cell)
    })
  }

  renderCell({ status, row, col, cleared, content }) {

    const display = cleared ? content : ""

    const initialContents = (
      <span
        className={status}
        onClick={()=>this.clearCell({ status, row, col })}
      >{display}</span>
    )

    return (
      <span className="cell" key={col+"-"+row}>
        {initialContents}
      </span>
    )
  }

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                    !!! HANDLE USER EVENTS !!!
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

clearCell({ col, row }) { // AKA, when a player clicks a cell (AKA, when they HOPE it's not a mine!)

  const board = this.state.board

  // First, make sure this cell hasn't already been cleared...
  // ... && the mine isn't shown for testing
  // ... && and the game isn't over
  if ((board[row][col].cleared && !board[row][col].isMine) || this.state.gameOver) {
    return
  }

  // Check to see if the player has clicked on a mine.
  else if (board[row][col].isMine) {
    board[row][col].cleared = true
    this.revealAll()
    this.setState({
      gameOver: true,
      totalCleared: 0,
      message: this.state.message === "" && LOSER_MESSAGE
    })
  }

  // No winner & no mines means "continue game play..."
  else {
    board[row][col].status = this.props.classIsCleared
    board[row][col].content = this.adjacentCells( col, row )
    board[row][col].cleared = true

    this.setState((prevState, props) => ({
      board,
      totalCleared: prevState.totalCleared + 1
    }));

    // If this cell dosn't border any Mines, reveal all border cells
    if (!board[row][col].content) {
      this.recursiveReveal(col, row)
    }
  }

}

resetBoard = () => {
  this.setState({
    board: this.newBoard(),
    gameOver: false,
    message: "",
    totalCleared: 0,
  })
}

showMines = () => {
  const board = this.state.board
  this.state.board.forEach((row) => row.forEach((cell) => {
    if (cell.isMine) {
      board[cell.row][cell.col].cleared = true
      this.setState({ board })
    }
  }))
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                  ... GAME LOGIC ...
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  adjacentCells(col, row) {
    let mines = this.adjacentMinesCount(col, row)
    if (mines) {
      return mines
    }
  }

  adjacentMinesCount(col, row) {
    let mines = 0
    BORDER_CELLS.forEach( ([ adjCol, adjRow ]) => {
      mines += this.isMine( col+adjCol, row+adjRow )
    })
    return mines
  }

  recursiveReveal = (col, row) => {
    BORDER_CELLS.forEach( ([ c, r ]) => {
      // If the cell exists and isn't already shown, THEN clear the cell.
      if (
        this.isCell(row + r, col + c )
        && !this.state.board[row + r][col + c].cleared
      ) {
        this.clearCell({ col: col + c, row: row + r })
      }
    })
  }

  isMine( col, row ) {
    // First, if cell exists, AND Then, check if it's a mine...
    if (this.isCell( row, col ) && this.state.board[row][col].isMine) {
      return 1
    }
    return 0
  }

  isCell(row, col) {
    return this.state.board[row] && this.state.board[row][col]
  }

  revealAll() {
    this.state.board.forEach((row) => row.forEach((cell) => {
      this.recursiveReveal(cell.col, cell.row)
    }))
  }

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                 ###  VIRTUAL GAME DATA  ###
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  newBoard() {
    const { boardRowsCount, boardColsCount } = this.props

    const newBoard = []
    let totalMines = 0

    for (let r = 0; r < boardRowsCount; r++) {
      const row = []
      for (let c = 0; c < boardColsCount; c++) {
        const isMine = Math.floor(Math.random() * 8) === 0
        const cell = {
          isMine,
          col: c,
          row: r,
          cleared: false, // isMine ? true : false, // for testing ... // isMine ? true : false,
          content: isMine ? "💣" : "",
          status: "cellContents--initial"
        }
        row.push(cell)
        if (cell.isMine) {
          totalMines++
        }
      }
      newBoard.push(row)
    }

    this.setState({ totalMines: totalMines })
    return newBoard
  }

}

export default App

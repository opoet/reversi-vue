import { PieceState } from '../types'
import { FlipPiece } from './flipPiece'

function InitBoard(size: number, board: PieceState[][]): PieceState[][] {
  board = []

  let initArr: PieceState[] = []

  for (let i = 0; i < size; i++) {
    initArr.push(PieceState.Unkown)
  }

  initArr.forEach(() => {
    board.push([...initArr])
  })

  FlipPiece(
    {
      wanTo: PieceState.White,
      sites: [
        [size / 2 - 1, size / 2 - 1],
        [size / 2, size / 2],
      ],
    },
    board,
  )

  FlipPiece(
    {
      wanTo: PieceState.Black,
      sites: [
        [size / 2 - 1, size / 2],
        [size / 2, size / 2 - 1],
      ],
    },
    board,
  )

  return board
}

export { InitBoard }

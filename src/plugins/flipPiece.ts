import { PieceFlipInfo, PieceState } from '../types'

// @param
function FlipPiece(pfi: PieceFlipInfo, board: PieceState[][]) {
  for (let site of pfi.sites) {
    board[site[0]][site[1]] = pfi.wanTo
  }
}

export { FlipPiece }

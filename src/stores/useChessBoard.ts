import { defineStore } from 'pinia'
import { PieceCount, PieceState } from '../types'

export const useChessBoard = defineStore({
  id: 'chessBoard',
  state: () => ({
    cb: <PieceState[][]>[],
    count: <PieceCount>{
      [PieceState.Unkown]: 0,
      [PieceState.White]: 0,
      [PieceState.Black]: 0,
    },
  }),
})

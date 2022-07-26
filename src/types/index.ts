export interface PieceFlipInfo {
  wanTo: PieceState
  sites: number[][]
}

export enum PieceState {
  Unkown,
  White,
  Black,
}

export interface PieceCount {
  [PieceState.Unkown]: number
  [PieceState.White]: number
  [PieceState.Black]: number
}

export interface CheckSiteRes {
  pass: boolean
  pfi: PieceFlipInfo | undefined
}

export enum SurAngle {
  U, // up
  UR, // up right
  R, // right
  RD, // right down
  D, // down
  DL, // down left
  L, // left
  LU, // left up
}

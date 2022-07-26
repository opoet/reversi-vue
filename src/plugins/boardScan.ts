import { PieceState } from '../types'

function RoughScan(
  offSetSites: number[][],
  wanTo: PieceState,
  board: PieceState[][],
): {
  pass: boolean
  res: number[]
} {
  const res: number[] = offSetSites.map((item: number[]) =>
    item[0] >= 0 &&
    item[0] <= board.length - 1 &&
    item[1] >= 0 &&
    item[1] <= board.length - 1 &&
    board[item[0]][item[1]] != PieceState.Unkown &&
    board[item[0]][item[1]] != wanTo
      ? 1
      : 0,
  )

  if (res.findIndex((item) => item == 1) >= 0) {
    return {
      pass: true,
      res,
    }
  } else {
    return {
      pass: false,
      res,
    }
  }
}

function DeepScan(
  offSet: number[],
  target: number[],
  wanTo: PieceState,
  board: PieceState[][],
): Promise<number[][]> {
  return new Promise((resolve) => {
    let current: number[] = [target[0] + offSet[0], target[1] + offSet[1]]
    let res: number[][] = []
    while (
      current[0] >= 0 &&
      current[0] <= board.length - 1 &&
      current[1] >= 0 &&
      current[1] <= board.length - 1
    ) {
      res.push(current)
      if (
        board[current[0]][current[1]] == wanTo ||
        board[current[0]][current[1]] == PieceState.Unkown
      )
        break
      current = [current[0] + offSet[0], current[1] + offSet[1]]
    }

    let last: number[] = res.pop() || []

    if (board[last[0]][last[1]] != wanTo) res = []

    resolve(res)
  })
}

export { RoughScan, DeepScan }

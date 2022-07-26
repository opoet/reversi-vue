import { CheckSiteRes, PieceState, SurAngle } from '../types'
import { DeepScan, RoughScan } from './boardScan'

// @param 位置坐标、想要变成、棋盘数据
async function CheckSite(
  site: number[],
  wanTo: PieceState,
  board: PieceState[][],
): Promise<CheckSiteRes> {
  return new Promise(async (resolve) => {
    if (board[site[0]][site[1]] != PieceState.Unkown)
      resolve({ pass: false, pfi: undefined })

    const offSet: number[][] = Angels.map((i) => GetOffSet(i))

    const offSetSites: number[][] = offSet.map((i) => [
      site[0] + i[0],
      site[1] + i[1],
    ])

    // 获取目标坐标周围的棋子状态
    const roughScanRes: { pass: boolean; res: number[] } = RoughScan(
      offSetSites,
      wanTo,
      board,
    )

    if (!roughScanRes.pass) resolve({ pass: false, pfi: undefined })

    const deepScanList: Promise<number[][]>[] = roughScanRes.res.reduce(
      (pre: Promise<number[][]>[], item: number, index: number) =>
        item == 1
          ? [...pre, DeepScan(GetOffSet(Angels[index]), site, wanTo, board)]
          : pre,
      [],
    )

    const allSites: number[][] = (await Promise.all(deepScanList)).reduce(
      (pre: number[][], item: number[][]) => [...pre, ...item],
      [],
    )

    if (allSites.length == 0) {
      resolve({ pass: false, pfi: undefined })
    } else {
      allSites.push(site)
      resolve({
        pass: true,
        pfi: {
          wanTo,
          sites: allSites,
        },
      })
    }
  })
}

const Angels: SurAngle[] = [
  SurAngle.U,
  SurAngle.UR,
  SurAngle.R,
  SurAngle.RD,
  SurAngle.D,
  SurAngle.DL,
  SurAngle.L,
  SurAngle.LU,
]

function GetOffSet(sur: SurAngle) {
  let offSet: number[] = []
  switch (sur) {
    case SurAngle.U:
      offSet = [-1, 0]
      break
    case SurAngle.UR:
      offSet = [-1, 1]
      break
    case SurAngle.R:
      offSet = [0, 1]
      break
    case SurAngle.RD:
      offSet = [1, 1]
      break
    case SurAngle.D:
      offSet = [1, 0]
      break
    case SurAngle.DL:
      offSet = [1, -1]
      break
    case SurAngle.L:
      offSet = [0, -1]
      break
    case SurAngle.LU:
      offSet = [-1, -1]
      break
    default:
      offSet = [0, 0]
      break
  }
  return offSet
}

export { CheckSite }

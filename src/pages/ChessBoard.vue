<template>
  <div v-for="(a, x) of chessBoard.cb" class="flex justify-center items-center">
    <div v-for="(b, y) of a">
      <PieceChess :pieceState="b" :site="[x, y]" @change-piece="changePiece" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { InitBoard } from '../plugins/initBoard'
  import { useChessBoard } from '../stores'
  import PieceChess from '../components/PieceChess.vue'
  import { ref } from 'vue'
  import { CheckSite } from '../plugins/checkSite'
  import { CheckSiteRes, PieceState } from '../types'
  import { useWindowSize } from '@vueuse/core'
  import { FlipPiece } from '../plugins/flipPiece'

  const chessBoard = useChessBoard()

  chessBoard.cb = InitBoard(6, chessBoard.cb)

  const cur = ref<boolean>(true)

  let changePiece = async (site: number[]) => {
    let checkRes: CheckSiteRes = cur.value
      ? await CheckSite(site, PieceState.White, chessBoard.cb)
      : await CheckSite(site, PieceState.Black, chessBoard.cb)
    if (checkRes.pass && checkRes.pfi != undefined) {
      cur.value = !cur.value
      FlipPiece(checkRes.pfi, chessBoard.cb)
    }
    console.log(checkRes)
    // let aaa = chessBoard.cb.reduce((pre: PieceState[], item: PieceState[]) => {
    //   return [
    //     ...pre,
    //     ...item.reduce(
    //       (p: PieceState[], i: PieceState) =>
    //         i == PieceState.White ? [...p, i] : p,
    //       [],
    //     ),
    //   ]
    // }, []).length
    // console.log(aaa)
  }

  const { width, height } = useWindowSize()

  console.log(`width:${width.value},height:${height.value}`)
</script>

<style scoped></style>

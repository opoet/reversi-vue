<template>
  <div
    class="w-7 h-7 text-dark-500 flex justify-center items-center"
    :class="{
      'bg-red-600': pieceState == 1,
      'bg-blue-600': pieceState == 2,
      'bg-light-600': pieceState == 0,
    }"
    @click="abc(site)">
    {{ pieceState }}
  </div>
</template>

<script setup lang="ts">
  defineProps<{ pieceState: number; site: number[] }>()

  let emits = defineEmits(['change-piece'])

  const abc = (site: number[]) => {
    emits('change-piece', site)
    console.log(site)
  }
</script>

<style scoped></style>

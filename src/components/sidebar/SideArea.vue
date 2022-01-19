<template>
  <div class="left-siding">
      <slot></slot>
  </div>
</template>

<style scoped>
.left-siding {
  position: fixed;
  background-color: bisque;
  top:3.6rem;
  bottom: 0;
  height: 100%;
  width: 20rem;
  left:0
}
</style>

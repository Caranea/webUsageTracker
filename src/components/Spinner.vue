<template>
  <div class="spinner-container">
    <div ref="spinner" class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    off() {
      this.$refs.spinner.styles.display = 'none'
    }
  }
}
</script>

<style scoped>
.spinner-container {
  position: absolute;
  height: 450px;
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: #fafafa;
  z-index: 2;
}
.lds-ripple {
  display: inline-block;
  width: 64px;
  height: 64px;
  position: absolute;
  bottom: 50%;
  left: calc(50% - 32px);
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #1976d2;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}
</style>

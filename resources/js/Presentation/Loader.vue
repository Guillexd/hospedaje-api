<template>
  <div class="bg-gradient-to-r from-blue-500 to-green-500 w-screen h-screen flex justify-center items-center">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.loader {
  position: relative;
  width: 200px;
  height: 260px;
  background: #fff;
  border-radius: 4px;
}

.loader:before {
  content: '';
  position: absolute;
  width: 108px;
  height: 50px;
  left: 50%;
  top: 0;
  background-image:
    radial-gradient(ellipse at center, #0000 24%, #de3500 25%, #de3500 64%, #0000 65%),
    linear-gradient(to bottom, #0000 34%, #de3500 35%);
  background-size: 12px 12px, 100% auto;
  background-repeat: no-repeat;
  background-position: center top;
  transform: translate(-50%, -65%);
  box-shadow: 0 -3px rgba(0, 0, 0, 0.25) inset;
}

.loader:after {
  content: '';
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
  width: 76%;
  height: 100%;
  background: linear-gradient(to bottom, #f79577 30%, #0000 31%);
  background-size: 100% 20px;
  animation: writeDown 2s ease-out infinite;
}

@keyframes writeDown {
  0% {
    height: 0%;
    opacity: 0;
  }

  20% {
    height: 0%;
    opacity: 1;
  }

  80% {
    height: 65%;
    opacity: 1;
  }

  100% {
    height: 65%;
    opacity: 0;
  }
}
</style>

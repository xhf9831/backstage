<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import './style/common';
@import "./style/animate";
@import "./style/introjs";
.box{
  display: flex;
}
.space{
  &-between{
    justify-content: space-between;
  }
  &-arround{
    justify-content: space-around;
  }
  &-center{
    justify-content: center;
  }
}
.a-center {
  align-items: center;
}
.t-center{
  text-align: center;
}
</style>

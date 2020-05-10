<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import './style/common';
@import "./style/animate";
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
}
.a-center {
  text-align: center;
}
</style>

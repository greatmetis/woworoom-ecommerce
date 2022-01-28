<template>
  <router-view>
  </router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.fade-enter-active, .fade-leave-active{
  transition: all 1s ease;
}
.fade-enter{
  opacity: 0;
}
.fade-leave-to{
  opacity: 1;
}

</style>

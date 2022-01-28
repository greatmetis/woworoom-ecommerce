<template>
  <div class="loading">
    <span></span>
    <h3>Loading ...</h3>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.loading{
    top: 0;
    left:0;
    z-index:101;
    height:100%;
    width:100%;
    background-color: rgba(black,0.5);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loading span{
    display:block;
    width:60px;
    height:60px;
    margin: 0, auto;
    border: 3px solid transparent;
    border-top-color:#6a33f8;
    border-bottom-color:#6a33f8;
    border-radius: 50%;
    animation: spin ease 1000ms infinite;
}
.loading h3{
  font-size: 1.5em;
  margin-left: 16px;
}

@keyframes spin{
  to{
      transform:rotateZ(360deg)
  }
}

</style>
<template>
  <li class="productCard">
    <h4 class="productType">新品</h4>
    <img :src="product.images" alt="image">
    <button class="addCardBtn" @click="add">加入購物車 Add</button>
    <h3>{{product.title}}</h3>
    <del class="originPrice">NT${{product.origin_price}}</del>
    <p class="nowPrice">NT${{product.price}}</p>
  </li>
</template>

<script>

export default {
  props:{
    product:Object
  },
  methods:{
    add(){
      this.$emit('addToCart')
    }
  }
}
</script>

<style>

</style>
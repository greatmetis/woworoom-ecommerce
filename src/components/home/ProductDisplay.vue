<template>
  <section class="wrap productDisplay" id="product-display" ref="productDisplay">
      <select name="" class="productSelect" @change="filterCatagories" v-model="filter">
          <option value="全部" selected>全部 All</option>
          <option value="床架">床架 Bed Frames</option>
          <option value="收納">收納 Storage</option>
          <option value="窗簾">窗簾 Curtains</option>
      </select>
      <span class="product-result-info">{{countFilterResults}} products found</span>
      <ul class="productWrap"  @click="handleClick">
        <products v-for="(product,index) in filteredProducts" :key="index" :product="product" @addToCart="addToCart(product)"/>
      </ul>
  </section>  
</template>

<script>
import {mapState,mapActions} from 'vuex'
import Products from '../home/Products.vue'
export default {
  components:{
    Products
  },
  emits:['componentOffset','popInfo'],
  data(){
    return{
      filter:'全部'
    }
  },
  computed:{
    ...mapState(['products','cart']),
    filteredProducts(){
      return this.filter == '全部' ? this.products.products : this.products.products.filter((p)=>p.category==this.filter)
    },
    countFilterResults(){
      return this.filteredProducts.length
    },
  },
  methods:{
    ...mapActions(['fetch_product','add_cart']),
    async addToCart(p){
      const checker = this.cart.carts.filter(item=>item.product.title==p.title)
      if(checker.length > 0){
        this.$emit('popInfo','商品已在購物車 😅 This product is in the cart')
      }else{
        this.add_cart({
          data:{
            productId:p.id,
            quantity:1
          }
        })
        await this.$emit('popInfo','商品已經加入購物車 ✓ The product is added')
      }
    },
    componentOffset(){
      let offsetVal = this.$refs.productDisplay.offsetTop
      this.$emit('componentOffset',offsetVal)
    } 
  },
  created(){
    this.fetch_product()
  },
  mounted(){
    this.componentOffset()
  }
}
</script>

<style>
.productDisplay {
  padding: 30px 15px;
}

.productSelect {
  border: 1px solid #b9b9b9;
  color: #797979;
  min-height: 38px;
  min-width: 255px;
  border-radius: 5px;
  text-indent: 10px;
  margin-bottom: 30px;
  margin-right: 1%;
}

.product-result-info{
  font-weight: 400;
  color: #797979;
}
.productWrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.productCard {
  position: relative;
  margin-right: 2%;
  width: 23%;
  margin-bottom: 30px;
}

.productCard img {
  min-height: 300px;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}

.productCard .addCardBtn {
  width: 100%;
  background-color: #000000;
  color: #ffffff;
  padding: 10px 0;
  text-align: center;
  border: none;
  margin-bottom: 8px;
  cursor: pointer;
}

.productCard .addCardBtn:hover {
  background-color: #301e5f;
}

.productCard .addCardBtn,
.productCard h3 {
  font-size: 1.25rem;
}

@media (max-width: 900px) {
  .productCard {
    width: 48%;
  }
}

@media (max-width: 540px) {
  .productCard {
    width: 100%;
  }
}

.productType {
  position: absolute;
  top: 13px;
  right: -5px;
  background-color: #000000;
  color: #ffffff;
  padding: 8px 24px;
}

.originPrice {
  font-size: 1.25rem;
}

.nowPrice {
  font-size: 1.75rem;
}
</style>
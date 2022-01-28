<template>
    <section class="shoppingCart">
        <div class="wrap">
            <h3 class="section-title">我的購物車</h3>
            <div class="overflowWrap">
                <table class="shoppingCart-table" v-if="isCartLoaded">
                  <tr  class="shoppingCart-header">
                    <th width="40%">品項</th>
                    <th width="15%">單價</th>
                    <th width="15%">數量</th>
                    <th width="15%">金額</th>
                    <th width="15%"></th>
                  </tr>
                  <tr v-for="(item,index) in currentCart" :key="index">
                    <new-item :product="item" @deleteProduct="deleteCart(item.id)" @editCart="editCart" @popInfo="popInfo"/>
                  </tr>
                  <tr>
                    <td>
                        <button class="discardAllBtn" @click="delAllCart">刪除所有品項</button>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                        <p>總金額</p>
                    </td>
                    <td class="shoppingCart-total">NT${{total}}</td>
                  </tr>
                </table>
                <div v-else class="shoppingCart-empty">
                    <h4>購物車怎麼還是空的...</h4>
                    <h6>Your cart is currently empty</h6>
                    <a class="shopNowBtn" @click="headTo">Shop Now</a>
                </div>                
            </div>
        </div>
    </section>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import NewItem from './NewItem.vue'
export default {
  components: {NewItem},
  emits:['headTo','popInfo','alertInfo'],
  created(){
    this.fetch_cart()
  },
  computed:{
    ...mapState(['cart']),
    isCartLoaded(){
      return this.currentCart.length
    },
    currentCart(){
      return this.cart.carts
    },
    total(){
      return this.cart.total
    }
  },
  methods:{
    ...mapActions(['fetch_cart','delete_cart','edit_cart']),
    headTo(){
      this.$emit('headTo')
    },
    deleteCart(id){
      this.delete_cart(id)
    },
    delAllCart(){
      this.$emit('alertInfo','⚠️您確定要刪除所有品項？')
    },
    async editCart(id,value){
      value = Number(value)
      await this.edit_cart({
        "data": {
          "id": id,
          "quantity": value
        },
      })
      this.popInfo('商品數量已更改!! ✏️Your cart has been edited successfully')
    },
    popInfo(content){
      this.$emit('popInfo',content)
    }
  },

}
</script>

<style>
.shoppingCart {
  background-color: #f8f8f8;
  padding: 60px 0;
}

.shoppingCart-table {
  margin: 0 auto;
  border-collapse: collapse;
  font-size: 1.25rem;
}

.shoppingCart-table th,
.shoppingCart-table td {
  padding: 15px;
  vertical-align: middle;
}

.shoppingCart-table th {
  text-align: left;
}

.shoppingCart-table tr {
  border-bottom: 1px solid #b9b9b9;
}

.shoppingCart-table tr:first-child,
.shoppingCart-table tr:last-child {
  border-bottom: 0;
}

.shoppingCart-empty {
  font-size:1.25rem;
  text-align:center;
  color: #747474;
}
.shoppingCart-empty h6{
  color: #6a33f8;
  opacity: 0.5;
}



/* Chrome, Safari, Edge, Opera */
.shoppingCart-table .product-qty input::-webkit-outer-spin-button,
.shoppingCart-table .product-qty input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.shoppingCart-table .product-qty input[type="number"] {
  -moz-appearance: textfield;
}

@media (max-width: 767px) {
  .shoppingCart-table {
    width: 700px;
  }
}

.cardItem-title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.cardItem-title img {
  margin-right: 15px;
  max-width: 80px;
}

.discardAllBtn,.shopNowBtn {
  display: inline-block;
  padding: 5px 15px;
  background-color: transparent;
  color: #000000;
  border: 1.3px solid #000000;
  border-radius: 5px;
  font-size: 1.25rem;
  cursor: pointer;
}

.discardAllBtn:hover, .shopNowBtn:hover {
  background-color: #000000;
  color: #ffffff;
}
.shopNowBtn{
  margin-top: 1.25rem;
}

.shoppingCart-total{
  text-align:right;
}
</style>
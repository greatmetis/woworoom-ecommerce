<template>
  <td>
    <div class="cardItem-title">
        <img :src="product.product.images" alt="">
        <p>{{product.product.title}}</p>
    </div>
  </td>
  <td>NT${{product.product.price}}</td>
  <td class="product-qty">
    <input ref="productQty" readonly type="number" :placeholder="product.quantity" :value="product.quantity" @keyup.enter="submitEdit(product.id)"/>
  </td>
  <td>NT${{subtotal}}</td>
  <td class="cartBtn">
      <button class="editBtn material-icons" @click="editCart(product.id)" >
          edit
      </button>
      <button class="discardBtn material-icons" @click="deleteProduct">
      clear
      </button>
  </td>
</template>

<script>
export default {
  data(){
    return{
      editMode: false
    }
  },
  emits:['deleteProduct','editCart','popInfo'],
  props:{
    product:Object
  },
  computed:{
    subtotal(){
      return this.product.product.price * this.product.quantity
    },
    isEditing(){
      return this.editMode ? this.submitEdit : ''
    }
  },
  methods:{
    deleteProduct(){
      this.$emit('deleteProduct')
    },
    editCart(id){
      this.editMode = !this.editMode
      if(this.editMode){
        this.$refs.productQty.classList.add('editing')
        this.$refs.productQty.removeAttribute('readonly')
        this.$refs.productQty.focus()
      }else{
        this.submitEdit(id)
      }
    },
    submitEdit(id){
      this.editMode = false
      this.$refs.productQty.classList.remove('editing')
      this.$refs.productQty.setAttribute('readonly','')
      this.$refs.productQty.blur()
      let inputVal = parseInt(this.$refs.productQty.value)
      if(inputVal <= 0){
        this.$emit('popInfo','商品數量不能小於 1')
        this.$refs.productQty.value = 1    
        return
      }
      if(this.$refs.productQty.value == this.$refs.productQty.placeholder){
        return 
      }
      this.$emit('editCart',id,inputVal)
    }
  }
}
</script>

<style>
.shoppingCart-table .product-qty input.editing {
  border: 1px dashed #6933ff90;
  outline: none;
}

.shoppingCart-table .product-qty input {
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 1.25rem;
  padding: 4px;
  margin: 0;
  width: 50%;
}
.cartBtn {
  text-align: right;
}

.cartBtn button {
  text-decoration: none;
  display: inline-block;
  padding: 10px;
  font-size: 2rem;
  color: #000000;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.cartBtn button:hover {
  color: #6a33f8;
  -webkit-transform: scale(1.3);
  transform: scale(1.3);
}
.editBtn.editing {
  color: #6a33f8;
}
</style>
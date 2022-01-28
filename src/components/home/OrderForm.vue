<template>
    <section class="orderInfo wrap" id="orderInfo">
      <div class="section-title">
        <h3>填寫預訂資料</h3>
        <h3 class="section-title-eng">Order Form</h3>
      </div>
        <form class="orderInfo-form">
            <div class="orderInfo-formGroup">
                <label for="customerName" class="orderInfo-label">姓名 <span class="orderInfo-label-eng">Name</span></label>
                <div class="orderInfo-inputWrap">
                    <input v-model="name" type="text" class="orderInfo-input" id="customerName" placeholder="請輸入姓名" name="姓名">
                    <p ref="nameError" class="order-error-message"></p>
                </div>
            </div>
            <div class="orderInfo-formGroup">
                <label for="customerPhone" class="orderInfo-label">電話
                  <span class="orderInfo-label-eng">Phone</span>
                </label>
                <div class="orderInfo-inputWrap">
                    <input v-model="phone" type="tel" class="orderInfo-input" id="customerPhone" placeholder="請輸入電話" name="電話">
                    <p ref="phoneError" class="order-error-message"></p>
                </div>
            </div>
            <div class="orderInfo-formGroup">
                <label for="customerEmail" class="orderInfo-label">Email
                  <span class="orderInfo-label-eng">Email</span>
                </label>
                <div class="orderInfo-inputWrap">
                    <input v-model="email" type="email" class="orderInfo-input" id="customerEmail" placeholder="請輸入 Email" name="Email">
                    <p ref="emailError" class="order-error-message"></p>
                </div>
            </div>
            <div class="orderInfo-formGroup">
                <label for="customerAddress" class="orderInfo-label">寄送地址
                  <span class="orderInfo-label-eng">Address</span>
                </label>
                <div class="orderInfo-inputWrap">
                    <input v-model="address" type="text" class="orderInfo-input" id="customerAddress" placeholder="請輸入寄送地址" name="寄送地址">
                    <p ref="addressError" class="order-error-message"></p>
                </div>
            </div>
            <div class="orderInfo-formGroup">
                <label for="tradeWay" class="orderInfo-label">交易方式
                  <span class="orderInfo-label-eng">Payment Methods</span>
                </label>
                <div class="orderInfo-inputWrap">
                    <select v-model="paymentType" id="tradeWay" class="orderInfo-input" name="交易方式">
                        <option value="ATM" selected>ATM</option>
                        <option value="信用卡">信用卡</option>
                        <option value="超商付款">超商付款 </option>
                    </select>
                </div>
            </div>
            <input @click.prevent="submitForm" type="submit" value="送出預訂資料" :disabled="isCartEmpty" :class="['orderInfo-btn',{'disabled-btn' : isCartEmpty}]">
        </form>
    </section>  
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  emits:['togglePopInfo'],
  data(){
    return{
      name:null,
      phone:null,
      email:null,
      address:null,
      paymentType:'信用卡',
      formValid:false,
    }
  },
  methods:{
    ...mapActions(['submit_cart','fetch_cart']),
    async checkValue(){
      if(!this.name){
        this.$refs.nameError.textContent = 'Name is required'
      }else{
        this.$refs.nameError.textContent = ''
      }
      if(!this.phone){
        this.$refs.phoneError.textContent = 'Phone number is required'
      }else if(!this.phoneValidation(this.phone)){
        this.$refs.phoneError.textContent = 'The number is invalid'
      }else{
        this.$refs.phoneError.textContent = ''
      }
      if(!this.email){
        this.$refs.emailError.textContent = 'Email is required'
      }else if(!this.emailValidation(this.email)){
        this.$refs.emailError.textContent = 'Email is invalid'
      }else{
        this.$refs.emailError.textContent = ''
      }
      if(!this.address){
        this.$refs.addressError.textContent = 'Address is required'
      }else{
        this.$refs.addressError.textContent = ''
      }
      if(this.name && this.phoneValidation(this.phone) && this.emailValidation(this.email) && this.address){
          this.formValid = true
          return
      }
      this.formValid = false
    },
    emailValidation(email){
      let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return reg.test(email)
    },
    phoneValidation(phone){
      let phoneArr = phone.split('')
      if(phoneArr.length>=7){
        let reg= /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\\./0-9]*$/g
        return reg.test(phone)
      }
      return false
    },
    async submitForm(){
      this.checkValue()
      if(this.formValid){
        await this.submit_cart({
          "data": {
            "user": {
              "name": this.name,
              "tel": this.phone,
              "email": this.email,
              "address": this.address,
              "payment": this.paymentType
            }
          }
        })
        this.fetch_cart()
        this.$emit('togglePopInfo','您的訂單已經被送出！Thank you for choosing us ☺️')
        this.name = this.phone = this.address = this.email = null
        return
      }
    },
  },
  computed:{
    ...mapState(['cart']),
    isCartEmpty(){
      return this.cart.carts == 0 ? true : false
    }
  },

}
</script>

<style>
.orderInfo {
  padding: 60px 0;
}

.orderInfo-form {
  padding: 0 15px;
}

.orderInfo-formGroup {
  max-width: 365px;
  margin: 0 auto 15px;
}

.orderInfo-label {
  display: block;
  margin-bottom: 6px;
}
.orderInfo-label-eng,.section-title-eng{
  color: #452596;
  opacity: 0.5;
  font-size:0.8em;
}
.section-title-eng{
  text-align: center;
}

.orderInfo-input {
  width: 100%;
  min-height: 38px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  text-indent: 1rem;
  margin-right: 10px;
}

.orderInfo-inputWrap {
  position: relative;
}

.order-error-message {
  position: absolute;
  white-space: nowrap;
  left: 103%;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  color: #c72424;
  opacity: 1;
}

@media (max-width: 767px) {
  .order-error-message {
    position: static;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

.orderInfo-btn {
  display: block;
  min-width: 255px;
  min-height: 48px;
  background-color: #000000;
  color: #ffffff;
  border: 0;
  cursor: pointer;
  font-size: 1.25rem;
  margin: 50px auto 0;
  border-radius: 5px;
}

.orderInfo-btn:hover {
  background-color: #301e5f;
}

.orderInfo-btn.disabled-btn{
  background-color: #666;
  cursor: not-allowed;
}
</style>
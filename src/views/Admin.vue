<template>
  <Navbar>
    <ul class="topBar-menu">
      <li><a href="#">後台管理</a></li>
      <li><a href="#">管理員Login</a></li>
    </ul>
  </Navbar>
  <div v-if="isloggedin">
    <loading v-if="loading"/>
    <div v-else>
      <div v-if="!!currentOrders.length">
        <div class="pie-chart">
          <pie-chart :top4SoldProductsLabel="top4SoldProductsLabel" :top4SoldProductsData="top4SoldProductsData"></pie-chart>
        </div>
        <OrderList :currentOrders="currentOrders"
        @togglePaymentStatus="togglePaymentStatus"
        @deleteOrder="deleteOrderTrigger"
        @deleteAllOrders="deleteAllOrdersTrigger"
        />
      </div>
      <div v-else class='section-title'>
        <h1 >目前還沒有訂單喔！我們再接再厲</h1>
        <h3> No orders at the moment. 💪🏼</h3>
      </div>
    </div>
  </div>
  <div v-else >
    <h2 class="section-title"> Please login first 😅</h2>
    <div class="login-hint">
      <h6>Mock Login Details</h6>
      <p>Email: wowoRoom@gmail.com</p>
      <p>Psw: wowoRoomAdmin</p>
    </div>
    <LoginCard @loggedIn="loggedIn"/>
  </div>
  <transition name="slide-down">
    <PopupInfo v-if="popupInfo" :alert="alertInfo">
      <h4>{{popupContent}}</h4>
      <!-- single order delete choices -->
      <template v-slot:delete-selector v-if="isDelOrder">
        <button @click="deleteOrder">Yes</button>
        <button @click="hideAlertInfo">No</button>
      </template>
      <!--All orders delete choices -->
      <template v-slot:delete-all-selector v-if="isDelAllOrders">
        <button @click="deleteAllOrders">Yes</button>
        <button @click="hideAlertInfo">No</button>
      </template>
    </PopupInfo>
  </transition>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Navbar from '../components/Navbar.vue'
import OrderList from '../components/admin/OrderList.vue'
import Loading from '../components/Loading.vue'
import PopupInfo from '../components/PopupInfo.vue'
import PieChart from '../components/charts/PieChart'
import LoginCard from '../components/admin/LoginCard.vue'
export default {
components:{
  Navbar,
  OrderList,
  Loading,
  PopupInfo,
  PieChart,
  LoginCard
},

data(){
  return{
    loading:null,
    popupInfo:false,
    popupContent:'',
    alertInfo:false,
    isDelOrder:false,
    isDelAllOrders:false,
    allProductsLabel:[],
    allProductsData:[],
    top4SoldProductsLabel:[],
    top4SoldProductsData:[],
    deletingOrderId:'',
  }
},
methods:{
  ...mapActions(['fetch_order','edit_paymentStatus','delete_order','deleteAll_order']),
  togglePaymentStatus(id,s){
    let data = {
      "data":{
        "id":id,
        "paid":s
      }
    }
    this.edit_paymentStatus(data)
    this.loadOrders()
  },
  togglePopupInfo(content){
    this.popupContent = content
    this.popupInfo = true
    setTimeout(()=>{
        this.popupInfo = false
        this.popupContent = ''
      },2500)
  },
  showAlertInfo(content){
    this.popupContent = content
    this.alertInfo = true
    this.popupInfo = true
    
  },
  hideAlertInfo(){
    this.popupInfo = false,
    this.popupContent = '',
    this.alertInfo = false,
    this.isDelOrder = false,
    this.isDelAllOrders = false
  },
  deleteOrderTrigger(content,id){
    this.showAlertInfo(content)
    this.isDelOrder = true
    this.deletingOrderId = id
  },
  async deleteOrder(){
    this.hideAlertInfo()
    this.loadOrders()
    await this.delete_order(this.deletingOrderId)
    this.togglePopupInfo(`訂單編號Order no.${this.deletingOrderId} 已經被刪除. 📣 Deleted!`)
    this.deletingOrderId = ''
  },
  deleteAllOrdersTrigger(content){
    this.showAlertInfo(content)
    this.isDelAllOrders = true
  },
  async deleteAllOrders(){
    this.hideAlertInfo()
    this.loadOrders()
    await this.deleteAll_order()
    this.togglePopupInfo(`全部訂單已經被刪除. 📣 Orders Deleted!`)
  },
  async loadOrders(){
    this.loading = true
    await this.fetch_order()
    this.countOrderData()
    this.loading = false
  },
  countOrderData(){
    this.top4SoldProductsData = []
    this.top4SoldProductsLabel = []
    // get quantiy of each product
    let sortedProducts = {}
    this.admin.orders.forEach(item=>{
      item.products.forEach(product=>{
        let productQuantity = product.quantity
        if(!sortedProducts[`${product.title}`]){
          sortedProducts[`${product.title}`] = productQuantity
          return
        }
          sortedProducts[`${product.title}`] += productQuantity
      })
    })
    // get all produdcts sold
    this.allProductsLabel = Object.keys(sortedProducts)
    this.allProductsLabel.forEach(p=>{
      this.allProductsData.push(sortedProducts[p])
    })
    // get the top 4 produdct sold
    let tempArr = [] // create new array for sorting
    this.allProductsLabel.forEach(product=>{
      let productNum = sortedProducts[`${product}`]
      tempArr.push([product,productNum])
    })
    tempArr = tempArr.sort((a,b)=>b[1]-a[1])
    // sort data if product categories are over 4
    if(tempArr.length > 4){
      tempArr = tempArr.slice(0,4)
      tempArr.forEach(item=>{
        this.top4SoldProductsLabel.push(item[0])
        this.top4SoldProductsData.push(item[1])
      })
      this.top4SoldProductsLabel.push('Others 其他')
      let otherArr = tempArr.slice(3)
      let otherSum = 0
      otherArr.forEach(item=>{
        otherSum += item[1]
      })
      this.top4SoldProductsData.push(otherSum)
    }else{
      tempArr.forEach(item=>{
        this.top4SoldProductsLabel.push(item[0])
        this.top4SoldProductsData.push(item[1])
      })
    }
    
  },
  loggedIn(){
    this.admin.login = true
  }
},
computed:{
  ...mapState(['admin']),
  isloggedin(){
    return this.admin.login
  },
  currentOrders(){
    return this.admin.orders
  },

},
created(){
  this.loadOrders()
},

}
</script>

<style scoped>
.section-title h3{
  color:#797979;
}

.pie-chart {
  position: relative;
  width:100%;
  height:100%;
  margin-left:auto;
  margin-right:auto;
}
.login-hint{
  display: flex;
  flex-direction:column;
  align-items: center;
  margin-bottom: 40px;
}
.login-hint h6{
  color:#797979;
}
.login-hint p{
  font-weight: 400;
  color:#6b33f8c5;
}

</style>
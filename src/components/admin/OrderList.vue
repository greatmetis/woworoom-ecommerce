<template>
  <section class="wrap orderPage-list">
    <div class="orderTable-input-group">
      <div class="left">
        <select name="payment-filter" class="order-status" v-model="paymentFilter" @change="sortPayment(this.paymentFilter)">
            <option value="all">ALL</option>
            <option value="false">Unpaid</option>
            <option value="true">Paid</option>
        </select>
        <span class="order-number-info">{{countSortedOrders}} of {{countOrders}} orders found</span>
      </div>
        <div>
          <select name="date-filter" class="order-sort" v-model="dateFilter" @change="sortDate(this.dateFilter)">
            <option disabled>Sort by date</option>
            <option value="ascending" selected>Ascending by Date</option>
            <option value="descending">Descending by Date</option>
          </select>
          <button class="discardAllBtn" @click="deleteAllOrders">Delete All</button>
      </div>
        </div>
    <div class="orderTableWrap">
        <table class="orderPage-table">
          <thead class="orderPage-table-header">
            <tr>
                <th>訂單編號</th>
                <th>聯絡人</th>
                <th>聯絡地址</th>
                <th>電子郵件</th>
                <th>訂單品項</th>
                <th>訂單日期</th>
                <th>訂單狀態</th>
                <th>操作</th>
            </tr>
          </thead>
          <tr v-for="order in sortedOrders" :key="order.id">
            <td>{{order.id}}</td>
            <td>
                <p>{{order.user.name}}</p>
                <p>{{order.user.tel}}</p>
            </td>
            <td>{{order.user.address}}</td>
            <td>{{order.user.email}}</td>
            <td>
                <ul class="order-products" v-for="(product,index) in order.products" :key="index">
                  <li>{{product.title}}
                    <span>* {{product.quantity}}</span>
                  </li>
                </ul>
            </td>
            <td class="order-date">
              <date :order="order"/>
            </td>
            <td class="orderStatus">
              <payment-tag :order="order" @togglePaymentStatus="togglePaymentStatus"/>
            </td>
            <td>
                <input type="button" class="delSingleOrder-Btn" value="刪除" @click="deleteOrder(order.id)">
            </td>
          </tr>
        </table>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Date from './Date.vue'
import PaymentTag from './PaymentTag.vue'
export default {
  emits:['togglePopInfo','togglePaymentStatus','deleteOrder','deleteAllOrders'],
  props:['currentOrders'],
  components:{
    Date,
    PaymentTag
  },
  data(){
    return{
      paymentFilter:'all',
      dateFilter:'descending',
      sortedOrders:[]
    }
  },
  methods:{
    ...mapActions(['delete_order']),
    togglePaymentStatus(id,s){
      this.$emit('togglePaymentStatus',id,s)
    },
    deleteOrder(id){
      this.$emit('deleteOrder',`確定要刪除⚠️${id} 這筆訂單嗎？`,id)
    },
    togglePopInfo(){
      this.$emit('togglePopInfo','content')
    },
    deleteAllOrders(){
      this.$emit('deleteAllOrders','⚠️ 確定要刪除全部訂單紀錄嗎？')
    },
    fetchOrders(){
      this.sortedOrders = this.currentOrders
      this.sortDate('descending')
    },
    sortPayment(val){
      if(val !== 'all'){
        if(val == 'true'){
          return this.sortedOrders = this.currentOrders.filter(item=>item.paid == true)
        }
          return this.sortedOrders = this.currentOrders.filter(item=>item.paid == false)
      }
      return this.sortedOrders = this.currentOrders
    },
    sortDate(val){
      let sortedDate = this.sortedOrders
      if(val === 'ascending'){
        sortedDate.sort((a,b)=>a.createdAt-b.createdAt)
        return sortedDate
      }else{
        sortedDate.sort((a,b)=>b.createdAt-a.createdAt)
        return sortedDate
      }
    }
  },
  computed:{
    countOrders(){
      return this.currentOrders.length
    },
    countSortedOrders(){
      return this.sortedOrders.length
    }
  },
  created(){
    this.fetchOrders()
  }
}
</script>

<style>
.orderPage-list {
  padding: 60px 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.orderPage-list .orderTable-input-group {
  /* padding: 60px 10px; */
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.order-number-info{
  font-weight: 400;
  color:#797979
}
.orderPage-list .orderTable-input-group .order-status, .orderPage-list .orderTable-input-group .order-sort {
  display: inline-block;
  padding: 5px 15px;
  background-color: transparent;
  color: #000000;
  border: 1.3px solid #000000;
  border-radius: 5px;
  font-size: 1.25rem;
  cursor: pointer;
  margin-right: 16px;
}

.orderPage-table {
  border: 1px solid #000000;
  width: 100%;
}

.orderPage-table th,
.orderPage-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #000000;
}

@media (max-width: 1110px) {
  .orderPage-table {
    width: 1100px;
  }
}

.delSingleOrder-Btn {
  display: block;
  background-color: #c44021;
  color: #fff;
  border: 0;
  padding: 5px 10px;
  cursor: pointer;
}

.delSingleOrder-Btn:hover {
  opacity: 0.8;
}

.orderStatus {
  position: relative;
}

.orderStatus .payment-tag {
  padding: 5px 8px;
  cursor: pointer;
  background-color: #6a33f8;
  color: #ffffff;

  border: none;
  font-size: 0.75rem;
}
.orderStatus .payment-tag:hover {
  background-color: #6933ff90;
}

.orderStatus .payment-tag.done {
  background-color: #ced4da;
  color: #000000;
}

.orderStatus .payment-tag.done:hover {
  background-color: #797979;
}

.orderTableWrap {
  overflow-x: scroll;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.orderTableWrap::-webkit-scrollbar {
  display: none;
}

</style>
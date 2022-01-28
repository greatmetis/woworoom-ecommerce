<template>
  <button @click="toggleStatus" class="payment-tag" :class="showPaymentStatus=='paid' ? 'done':''">{{showPaymentStatus}}</button>
</template>

<script>
export default {
  props:['order'],
  emits:['togglePaymentStatus'],
  computed:{
    showPaymentStatus(){
      return this.order.paid ? 'paid' : 'unpaid'
    }
  },
  methods:{
    toggleStatus(){
      let changeTostatus = !this.order.paid
      this.$emit('togglePaymentStatus',this.order.id,changeTostatus)
    }
  }
}
</script>

<style>

</style>
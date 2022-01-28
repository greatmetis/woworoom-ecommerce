<template>
  <p>{{setDate}}</p>
</template>

<script>
export default {
  props:['order'],
  computed:{
    setDate(){
      let date = new Date(this.order.createdAt * 1000).toDateString()
      let dateArr = date.split(' ')
      dateArr.splice(dateArr.length - 1, 0,',')
      dateArr.shift()
      let set_date = dateArr.join(' ')
      return set_date
    },
  }
}
</script>

<style>

</style>
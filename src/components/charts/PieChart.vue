
<script>
import {Pie} from 'vue3-chart-v2'
export default {
  props:['top4SoldProductsData','top4SoldProductsLabel'],
  extends:Pie,
  mounted(){
    this.renderChart({
      labels: this.top4SoldProductsLabel,
      datasets: [
        {
          label: 'product ratio',
          backgroundColor: ['#4224E0','#6A33F8','#7124E0','#A640FF','#a79ce5'],
          data: this.top4SoldProductsData
        }
      ],
    },
    {
      responsive:true,
      maintainAspectRatio: false,
    })
  }
}
</script>
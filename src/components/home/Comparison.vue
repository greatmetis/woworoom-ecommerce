<template>
  <section class="furniture-compare">
        <div class="wrap">
            <h3 class="section-title">家具比較</h3>
            <div class="overflowWrap">
                <table class="compare-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>窩窩系統模組家具</th>
                            <th class="text-muted">組合式家具</th>
                            <th class="text-muted">實木家具</th>
                        </tr>
                    </thead>
                    <tr>
                        <td>可單人自行組裝</td>
                        <td><span class="material-icons">done</span></td>
                        <td class="text-muted">不一定</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>可多次重複拆裝</td>
                        <td><span class="material-icons">done</span></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>床墊規格彈性大</td>
                        <td><span class="material-icons">done</span></td>
                        <td class="text-muted">不一定</td>
                        <td class="text-muted">不一定</td>
                    </tr>
                    <tr>
                        <td>材質可長久使用</td>
                        <td><span class="material-icons">done</span></td>
                        <td></td>
                        <td><span class="material-icons">done</span></td>
                    </tr>
                    <tr>
                        <td>小客車即可搬運</td>
                        <td><span class="material-icons">done</span></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
  </section>
</template>

<script>
export default {

}
</script>

<style>
.furniture-compare {
  background-color: #f8f8f8;
  padding: 50px 0 60px 0;
}

@media (max-width: 767px) {
  .furniture-compare {
    padding: 50px 15px 60px;
  }
}

@media (max-width: 767px) {
  .overflowWrap {
    overflow-x: scroll;
  }
}

.compare-table {
  width: 65%;
  margin: 0 auto;
}

.compare-table th,
.compare-table td {
  text-align: center;
  padding: 15px 0;
}

.compare-table th {
  font-size: 1.25rem;
}

.compare-table tr {
  border-bottom: 1px solid #b9b9b9;
}

.compare-table tr td:first-child {
  text-align: left;
  font-size: 1.25rem;
}

.compare-table .material-icons {
  color: #6a33ff;
  -webkit-transform: scale(1.5);
  transform: scale(1.5);
}

@media (max-width: 767px) {
  .compare-table {
    width: 500px;
  }
  .compare-table th,
  .compare-table td {
    padding: 10px 0;
  }
  .compare-table th {
    font-size: 1rem;
  }
  .compare-table tr td:first-child {
    font-size: 1rem;
  }
}

.text-muted {
  color: #797979;
}

</style>
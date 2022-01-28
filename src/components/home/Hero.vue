<template>
  <section class="wrap" id="bedAdvantage">
        <div class="banner">
            <h2 class="banner-text">窩窩家居<br>跟您一起品味生活</h2>
        </div>
        <h3 class="section-title">床墊優勢</h3>
        <ul class="bedAdvantage">
            <li>
                <img class="bedAdvantage-img" src="@/assets/images/feature-1.png" alt="原木料環保">
                <p class="bedAdvantage-text">原木料環保</p>
            </li>
            <li>
                <img class="bedAdvantage-img" src="@/assets/images/feature-2.png" alt="好收納">
                <p class="bedAdvantage-text">好收納</p>
            </li>
            <li>
                <img class="bedAdvantage-img" src="@/assets/images/feature-3.png" alt="好組裝">
                <p class="bedAdvantage-text">好組裝</p>
            </li>
        </ul>
    </section>
</template>

<script>
export default {

}
</script>

<style>
.banner {
  position: relative;
  background-image: url("https://github.com/hexschool/js-training/blob/main/%E7%AC%AC%E4%B9%9D%E9%80%B1%E4%B8%BB%E7%B7%9A%E4%BB%BB%E5%8B%99%E5%9C%96%E5%BA%AB/3ewLAKn.png?raw=true");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 420px;
  margin-bottom: 60px;
}

.banner-text {
  position: absolute;
  color: #ffffff;
  font-size: 2rem;
  left: 50px;
  bottom: 50px;
  font-weight: normal;
}

.section-title {
  text-align: center;
  font-size: 1.75rem;
  margin-bottom: 30px;
}

.bedAdvantage {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 60px;
}

.bedAdvantage-img {
  max-height: 140px;
  -o-object-fit: cover;
  object-fit: cover;
  margin-bottom: 10px;
}

.bedAdvantage-text {
  text-align: center;
  font-size: 1.25rem;
}

</style>
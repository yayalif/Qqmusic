<template>
  <div id="rankPage">
    <div class="singer-photo">
      <img src="" alt="">
    </div>
    <div class="header-bar">
      <div class="back-button">
        <div class="back-icon">
          <img src="" alt="">
        </div>
        <div class="back-text">排行榜</div>
      </div>
    </div>
    <div class="singer-header">
      <div class="header-blank"></div>
      <div class="header-wrap">
        <div class="singer-info">
          <h1 class="singer-name">巅峰榜-流行指数</h1>
          <p class="singer-fans">1980万</p>
        </div>
        <div class="play-button">
          <img src="" alt="">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name:'rankPage',
  data(){
    return{


    }
  },
  created(){
    this.$store.dispatch('getRankSongs').then((data)=>{
      console.log(data)

    })
  }


};
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}

</style>

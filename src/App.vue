<template>
  <div id="app">
    <!-- <action-sheet></action-sheet> -->
    <search @searchhide="searchhide=!searchhide"></search>
    <!-- <router-view/> -->
    <router-view></router-view>
    <div class="content-wrapper" v-show="!searchhide">
      <div class='swiper-pagination'>
        <span class='swiper-pagination-bullet'
        :class="{'swiper-pagination-bullet-active':!rankshow}" @click="rankshow=false">
          排行榜
        </span>
        <span class='swiper-pagination-bullet'
        :class="{'swiper-pagination-bullet-active':rankshow}" @click="rankshow=true">
          推荐
        </span>
      </div>
      <transition name="play-slide-horizontal">
        <div class="rank" 
        :class="{'slide-active':!rankshow}" v-show="!rankshow">
            <rank></rank>
        </div>
      </transition>
      <transition name="play-slide-horizontal">
        <div class="recommand" 
        :class="{'slide-active':rankshow}" v-show='rankshow'>
          推荐
        </div>
      </transition>
    </div>
    <transition name='play-slide-vertical'>
      <play v-show='playPageShow' @hidePlay='playPageShow=false'></play>
    </transition>

    <div class="play-bar" @click='showPlayPage'>
      <div class="play-bar-image-container">
        <img src="./assets/Vue_Music_Blur.png" alt="">
      </div>
      <p class="play-bar-text">
          VUE-MUSIC
      </p>
      <img src="./assets/icon-play.png" alt="" class="play-bar-button">
    </div>
  </div>
</template>

<script>
import search from "./components/search";
import rank from './components/rank'
import play from './components/play'

export default {
  name: 'App',
  components:{
    // ActionSheet
    search,
    rank,
    play
  },
  data(){
    return{
      playPageShow:false,
      musicBlur:'./assets/Vue_Music_Blur.png',
      searchhide:false,
      rankshow: false
    }
  },
  mounted(){
    // console.log(this.$route.fullPath)
  },
  methods: {
    showPlayPage(){
      this.playPageShow = true;
      // console.log(this.playPageShow)
    }
  }
  
  
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
body {
  display: flex;
  overflow-x: hidden;
  margin: 0;
}
#app{
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
    width: 100%;
    height: 100vh;
}
.swiper-pagination{
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 50px;
}
.swiper-pagination-bullet{
  line-height: 50px;
  flex-grow: 1;
  /* width: 100%;
  height: 100%; */
  text-align: center;
  color:#929292;
  cursor: pointer;
}
.swiper-pagination-bullet-active{
  color:#000;
}
.rank {
  margin-top: 0px;
  width: 100%;
  background: #eee;
  padding: 10px;
}
.recommand{
    margin-top: 60px;
    width: 100%;
    background: red;
}
.slide-active{
    /* animation: slidePage .5s ease-out; */
}
@keyframes slidePage {   
    from {    
        transform:translateX(100%);   
    }   
    50%{   
         transform:translateX(50%); 
     }   
    to {    
        transform:translateX(0); 
     }   
}
.play-slide-horizontal-enter-active {
  transition: all 0.5s linear;
}

.play-slide-horizontal-leave-active {
  transition: all 0.5s linear;
}

.play-slide-horizontal-enter,
.play-slide-horizontal-leave-active {
  transform: translateX(100%);
}
.play-bar{
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  z-index: 2;
  width:100vw;
  height: 50px;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.play-bar-image-container img{
  width: 37.5px;
  height: 37.5px;
  padding:0 15px; 
}
.play-bar-text{
  flex-grow: 1;
  
}
.play-bar-button{
  width: 20px;
  height: 20px;
  padding-right:15px;
}
.play-slide-vertical-enter,
.play-slide-vertical-leave-to{
  transform: translateY(100%);
  opacity: 0.5;
}
.play-slide-vertical-enter-active{
  transition: all .5s linear;

}
.play-slide-vertical-leave-active{
  transition: all 0.5s linear;
}
</style>

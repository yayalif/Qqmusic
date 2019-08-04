<template>
  <div id="play" class='music-play-page'>
      <div class="music-album">
        <div class="play-page-hide-btn" @click="hidePage">
          <img src="./../assets/icon-jiantou.png" class='icon-hide' alt="">
        </div>
        <img src="./../assets/Vue_Music_Blur.png" class="music-bg" alt="">
      </div>
      <div class="music-group">
        <img src="./../assets/Vue_Music_Blur.png" class="music-blur" alt="">
        <div class="progress-bar-group">
          <div class="progress-bar">
            <div class="progress" :style="{width:indicatorPosition+'%'}"></div>
            <div class="indicater"></div>
          </div>
        </div>
        <div class="time-indicator">
          <span>{{ currentTime }} </span>
          <span>{{ duration }} </span>
        </div>
        <div class="music-info">
          <p class="music-name">{{ song.name || 'VUE MUSIC' }} </p>
          <p class="music-author">{{ song.singer[0].name || '刘亦菲'}}</p>
        </div>
        <div class="lyric">
          <div class="lyric">
            <p class="lyric-item">秦时明月汉时关</p>
            <p class="lyric-item">万里长征人未还</p>
            <p class="lyric-item">使龙城飞将在</p>
          </div>
        </div>
        <div class="music-ctrl">
          <ul>
            <li>
              <img src="./../assets/icon-like.png" alt="">
            </li>
            <li>
              <img src="./../assets/icon-shangyiqu.png" alt="">
            </li>
            <li>
              <img src="./../assets/icon-play.png" alt="">
            </li>
            <li>
              <img src="./../assets/icon-xiayiqu.png" alt="">
            </li>
            <li>
              <img src="./../assets/icon-list.png" alt="">
            </li>
          </ul>
        </div>

      </div>
  </div>
</template>

<script>
export default {

  data(){
    return{
      list:[
            {albummid: "001z1OuX41cBAx",
              id: 109181039,
              mid: "004NXwuk36ixAW",
              name: "缘分一道桥",
              singer:[
                      {
                        id: 265,
                        mid: "001JDzPT3JdvqK",
                        name: "王力宏"
                      },
                      {
                        id: 5979,
                        mid: "000we89k1hzBcA",
                        name: "谭维维"
                      }
                    ]
              }
          ]

    }
  },
  computed:{
    currentTime(){  
      return this.$store.getters.currentTime 
    },
    duration(){ 
      return this.$store.getters.duration
    },
    coverImgUrl(){
      return this.$store.getters.coverImgUrl
    },
    indicatorPosition() {
      return this.$store.state.currentTime / this.$store.state.duration * 100
    },
    playing(){
      return this.$store.state.playing
    },
    song(){
      return this.$store.state.song
    }

  },
  mounted(){
    this.$store.commit('setPlayList', {
        index: 0,
        list: this.list
    })
    this.$store.commit('play')
  },
  methods:{
    hidePage(){
      this.$emit('hidePlay')
    }
  }


}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#play{
  background-color: red;
  color: black;
  z-index: 3;
  height: 100vh;
  width: 100%;
  top:0;
  position: fixed;
  overflow-x: hidden;
}
.play-page-hide-btn {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 27px;
  left: 11px;
  z-index: 1;
  border-radius: 50%;
  background-color: #fff;
  display:flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.icon-hide {
  width:12px;
  height: 12px;
  /* display: inline-block */
}
.music-album .music-bg{
  top:0;
  position: fixed;
  width: 100vw;
  max-height: 68vh;
}
.music-group {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 68vh;
    background: rgba(255, 255, 255, 0.76);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
.music-group .music-blur{
   position: absolute;
    width: 100%;
    z-index: -1;
    display: block;
    filter: blur(30px);
}
.progress-bar {
  height:4px;
  background: #cccccc;
  position: relative;
}

.progress{
    top: 0;
    height: 100%;
    background: #7f7f7f;
    width: 20%;
}
.indicater{
  position: absolute;
  width: 2px;
  height: 12px;
  background-color: red;
  top: 0;
  z-index: 1
}
.time-indicator{
  margin-top: 8px;
  height: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.time-indicator span{
  height: 16px;
  font-size: 12px;
  margin: 0 10px;
}
.music-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.music-author {
  color: #929392;
  font-size: 12px;
}
.lyric {
  margin-top: 6px;
}
.lyric p{
  text-align: center;
  font-size: 14px;
}
.music-ctrl {
  position: sticky;
  bottom: 0;
  height: 50px;
}
.music-ctrl ul{
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.music-ctrl ul li{
  width: 10%;
  height: 100%;
}
.music-ctrl ul li img{
  width: 35px;
}
</style>

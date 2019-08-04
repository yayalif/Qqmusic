<template>
<div id="search">
  <div class="search">
    <div class="search-input">
      <img src="./../assets/icon-search.png" alt="">
      <form @submit.prevent="search(key)">
        <input type="text"
          placeholder="搜索 歌曲/专辑/歌手"
          @focus="focus()"
          v-model="key"
        >
      </form>
    </div>
    <div class="search-cancle"
      :class="{ 'search-cancle-show': searchShow}"
      @click="searchCancle"
    >
      取消
    </div>
  </div>
  <div class="hotKey" v-if="searchShow&&searchRes==null">
    <div class="search-history" v-if='searchHistory!=null'>
      <div class="search-history-item" v-for="(item,index) in searchHistory" :key='index'>
          {{ item }}
      </div>
    </div>
    <ul v-if="hotkey!=null">
      <li v-for="(item,index) in hotkey" :key='index'>
          <span class="hotKey-index">{{ index+1 }}</span>
          <span class="hotKey-k">{{ item.k }}</span>
          <span class="hotKey-n">{{ item.n | formatMoney }}万</span>
      </li>
    </ul>
  </div>
  <div class="result" v-if="searchShow&&searchRes!=null">
    <div class="result-group">
      <div class="group">
        <div class="group-img">
            <img src="./../assets/icon-music.png" alt="">
        </div>
        <div class="group-p">
          单曲
        </div>
      </div>
     <div class="group-item" v-for="(item, key) in searchRes.song.itemlist" :key='key'>
       <p class='result-title'>{{ item.name }}</p>
       <p class='result-author'>-{{ item.singer }}</p>
       <div class="action-button">
         <img src="./../assets/icon-...black.png" alt="">
       </div>
     </div>
    </div>
    <div class="result-group">
      <div class="group">
        <div class="group-img">
            <img src="./../assets/icon-album.png" alt="">
        </div>
        <div class="group-p">
          专辑
        </div>
      </div>
     <div class="album-item" v-for="(item, key) in searchRes.album.itemlist" :key='key'>
       <img v-lazy="item.pic" alt="">
       <div class="album-info">
          <p class='album-title'>{{ item.name }}</p>
          <p class='album-author'>{{ item.singer }}</p>
       </div>
     </div>
    </div>
    <div class="result-group">
      <div class="group">
        <div class="group-img">
            <img src="./../assets/icon-mv.png" alt="">
        </div>
        <div class="group-p">
          MV
        </div>
      </div>
     <div class="mv-item" v-for="(item, key) in searchRes.mv.itemlist" :key='key'>
       <p class='mv-title'>{{ item.name }}</p>
       <p class='mv-author'>{{ item.singer }}</p>
     </div>
    </div>
     <div class="result-group">
      <div class="group">
        <div class="group-img">
            <img src="./../assets/icon-singer.png" alt="">
        </div>
        <div class="group-p">
          歌手
        </div>
      </div>
     <div class="singer-item" v-for="(item, key) in searchRes.singer.itemlist" :key='key'>
       <img v-lazy="item.pic" alt="">
       <div class="singer-info">
          <p class='singer-name'>{{ item.name }}</p>
       </div>
     </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'App',
  components:{
  },
  filters:{
    formatMoney:function(value){
      return Number(value/10000).toFixed(2)
    }

  },
  computed: {

  },
  created(){
    if(localStorage.getItem('searchHistory')){
      this.searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
    }

  },
  data(){
    return{
      key:'',
      searchShow: false,
      searchRes:null,
      searchHistory:[],
      hotkey:null
    }
  },
  methods:{
    search:function(key){
      this.key = key;
      this.$store.dispatch('search', key).then((response=>{
        this.searchRes = response.body.data
        debugger
        var index = this.searchHistory.indexOf(key)
        if(index>=0){
            this.searchHistory.splice(index,1)
        }
        this.searchHistory.unshift(key)
        localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory))
        // console.log(this.searchHistory)
      }))

    },
    focus:function(){
      this.searchShow = true,
      this.$store.dispatch('getHotKey').then((response) => {
        this.hotkey = response.data.data.hotkey.slice(0, 5)
        // console.log(this.hotkey)
      })
      this.$emit('searchhide')
    },
    searchCancle(){
      this.searchShow = false
      this.searchRes = null
      this.key = ''
      this.$emit('searchhide')
    }
    
  }
}
</script>

<style scoped>
.search {
    width: 100%;
    height: 60px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    position: fixed;
    top: 0;
    background: #fff;
    z-index: 1;
}
.search-input{
    width: 100%;
    background: #eee;
    border-radius: 5px;
    margin: 10px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-align: center;
    align-items: center;
}
.search-input img{
    height: 30px;
    width: 30px;
    display: inline-block;
    margin: 0 5px;
}
.search-input input{
    width: 100%;
    height: 100%;
    border: none;
    background: #eee;
    font-size: medium;
    -ms-flex-positive: 1;
    flex-grow: 1;
    border-radius: 5px;
    outline: none;
}
.search-cancle{
    height: 40px;
    width: 0px;
    margin: 10px auto;
    line-height: 40px;
    overflow: hidden;
    transition: width 0.3s;
    cursor: pointer;
}
.search-cancle-show{
    width: 55px;
}
.hotKey{
    margin-top: 60px;
    margin-bottom: 50px;
    background: #eeeeee;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
}
.search-history{
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    background: #fff;
    padding: 0 10px;
    max-height: 66px;
}
.search-history-item{
    margin: 5px;
    padding: 0 3px;
    border: 1px solid #000;
    border-radius: 14px;
    cursor: pointer;
}
.hotKey ul{
  margin: 0;
  padding: 0;
  background: #fff;
}
.hotKey ul li{
  padding: 0 10px;
  height: 40px;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.hotKey ul li .hotKey-index {
  padding-right: 10px;
  /* flex: 0 0 20px; */
}
.hotKey ul li .hotKey-k {
  flex-grow: 1;
}
.result{
  margin-top:60px; 
}
.result .group{
  display:flex;
  height: 40px;
  align-items: flex-end;
  padding-left: 10px;
  padding-bottom: 5px;
  background-color: #eee;  

}
.group-img img{
  width: 25px;
  height: 25px;
}
.group .group-p{
  margin-left: 10px 
}
.group-item {
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding-left: 10px;
  margin-left: 10px;
}
.group-item .result-author{
  flex-grow: 1;
  color: #929292;
}
p{
  margin: 0;
  padding: 0
}
.action-button{
  width: 40px;
  height: 40px;
}
.action-button img{
  width: 20px;
  height: 20px;
  padding: 10px;
}
.album-item{
  display:flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  padding: 10px;
  cursor: pointer;
  border-bottom: #929292;
}
.album-item img{
  width: 40px;
  height: 40px;
  border-radius: 10%;
}
.album-item .album-info{
  padding-left: 15px;
}
.album-title{
  font-size: 14px;
  line-height: 20px;
}
.album-author{
  font-size: 12px;
  color: #929292;
  line-height: 20px;
}
.singer-item{
  display: flex;
  height: 40px;
  align-items:  center;
  padding: 10px 5px;

}
.singer-item img{
  width: 40px;
  height: 40px;
  border-radius:  50%;
}
.singer-info{
  display: flex;
  align-items: center;
  padding-left: 10px;
  height: 40px;
  flex-grow: 1;
  border-bottom: #eeeeee 1px solid;
}
.mv-item{
  padding: 10px;
  border-bottom: #eeeeee 1px solid;
}
.mv-title{
  line-height: 20px;
  font-size: 14px;
}
.mv-author{
  line-height: 20px;
  font-size: 12px;
  color: #929292
}
</style>

<template>
  <div id="rank">
    <ul v-if="topList!=null">
      <li class="rank-item" v-for='(item,index) in topList' :key="index" @click='showRankPage(index)'>
        <div class="rank-media">
            <img v-lazy="item.picUrl" alt="">
            <span>{{ Number(item.listenCount/10000) }} 万</span>
        </div>
        <div class="rank-info">
          <p class="rank-title">
            {{ item.topTitle }}
          </p>
          <p class="rank-songs" v-for='(k,v) in item.songList' :key="v">
              {{ v+1 }}{{ k.songname }}
            <span class="rank-singername">
              -{{ k.singername }}
            </span>
          </p>
        </div>
      </li>
    </ul>
    <rank-page ></rank-page>
  </div>
</template>

<script>
import rankPage from './rankPage'
export default {
  name:'rank',
  components:{
    rankPage
  },
  created(){
     this.$store.dispatch('getRankList').then((response) => {
        this.topList = response.data.data.topList
        console.log(this.topList)
    })
  },
  data(){
    return{
      topList:null
    }
  },
  methods:{
    showRankPage(index){
      var id=11
      this.$router.push({ name:'rank', query:{ id:1 } })
      console.log( this.$route.query.id ,'id')
    }
  }

};
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.rank-item {
  list-style: none;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  background-color: #fff;
}
.rank-media{
  position: relative;
}
.rank-media img{
  width:100px ;
  height: 100px;
  border-radius: 5px;
}
.rank-media span{
  position: absolute;
  bottom: 5px;
  left: 5px;
  color: #fff;
  z-index: 2;
  font-size: 12px;
  
}

.rank-info {
  flex-grow: 1;
  padding:5px 10px;
}
.rank-title{
  font-size: 16px;
}
.rank-songs{
  font-size: 14px;
  white-space: nowrap; /*如果是中文 设置文字超出范围不断行*/
  overflow: hidden;;/*设置超出控件范围隐藏*/
  text-overflow: ellipsis; /*设置多余文本隐藏显示*/

}
.rank-singername{
  color: #929292;
}
</style>

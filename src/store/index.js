import ApiService from './ApiService'
import api from './../config/API'
import * as def from './../config/def'

// vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const player = new QMplayer()
player.on('timeupdate',function(){
  store.commit('updateCurrentTime',parseInt(player.currentTime))
  store.commit('updateDuration',parseInt(player.duration))
})
player.on('ended',function(){
  store.commit('playContinue')
})
const store = new Vuex.Store({
    state: {
      song:{
        name:def.DEFAULT_SONG_NAME
      },
      playing:false,
      currentTime: 0,
      duration:0,
      historyList: [],
      playList:[]
    },
    // 更改store的状态
    mutations: {
      updateCurrentTime (state, time) {
        state.currentTime = time
      },
      updateDuration (state, time) {
        state.duration = time
      },
      setPlayList (state, playList) {
        state.playList = playList.list
        state.index = playList.index
        state.song = state.playList[state.index]
      },
      play (state){
        console.log(state,'state')
        player.play(state.song.mid);
        state.playing = true;
        console.log(state.currentTime,'currentTime')
      }

    },
    getters:{
      currentTime (state) {
        console.log(state.currentTime,'state.currentTime')
        return parseInt(state.currentTime / 60) + ':' + 
        (Array(2).join(0) + (state.currentTime % 60)).slice(-2)
      },
      duration (state) {
        return parseInt(state.duration / 60) + ':' + 
        (Array(2).join(0) + (state.duration % 60)).slice(-2)
      },
      coverImgUrl(state){
        if(typeof state.song.albummid === 'undefined')
          return def.DEFAULT_IMG
        else
          return "https://y.gtimg.cn/music/photo_new/T002R500x500M000"+state.song.albummid+".jpg"
      }

    },
    // 有异步的时候， 需要action
    actions: {
        search({},key){
            return Vue.http.jsonp(
                api.search.url,
                {
                  params: api.search.params(key),
                  jsonp: api.search.jsonp
                }
            )
        },
        getHotKey({},key){
            return Vue.http.jsonp(
                api.hotkey.url,
                {
                  params: api.hotkey.params(key),
                  jsonp: api.hotkey.jsonp
                }
            )

        },
        getRankList({},key){
          return Vue.http.jsonp(
            api.rank_list.url,
            {
              params: api.hotkey.params(key),
              jsonp: api.hotkey.jsonp
            }
          )
        },
        getRankSongs({},key){
          return Vue.http.jsonp(
            api.rank_list.url,
            {
              params: api.rank_songs.params(key),
              jsonp: api.rank_songs.jsonp
            }
          )
        }

    }
  })

  export default store
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userid:'',
        token:'',
        nickname:'',
      breadListState:[
        // {name:'Manage',path:'/manage'}
      ]
    },
  // img: '',
  // showBtn:'true',
  // boardroomId:''
    mutations:{
      changeUserId(state, userid){
            state.userid = userid
            localStorage.setItem('userid', state.userid);
        },
      changeToken(state, token){
        state.token = token
        localStorage.setItem('token', state.token);
      },
      changeNickName(state, nickname){
        state.nickname = nickname
        localStorage.setItem('nickname', state.nickname);
      },
        breadListMutations(getters,list){
          getters.breadListState=list;
          sessionStorage.setItem('breadListStorage',list);
        }
      },
      getters:{
        breadListState(){
          return JSON.parse(sessionStorage.getItem('breadListStorage')) || [];
        },
        // submitImg(state, img){
        //     state.img = img
        // },
        // changeShowBtn(state, showBtn){
        //     state.showBtn = showBtn
        // },
        // saveboardroomId(state, boardroomId){
        //     state.boardroomId = boardroomId
        //     localStorage.setItem('boardroomId', state.boardroomId);
        // }
    }
})

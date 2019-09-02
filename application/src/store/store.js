import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let messageCount = 0;

export const store = new Vuex.Store({
  state: {
    messages: [ ]
  },
  mutations: {
    addMessage(state, message) {
      message.id = messageCount++;
      message.created = Date.now();
      state.messages.push(message);
    },
    removeMessage(state, message) {
      state.messages = _.reject(state.messages, (_message) => {
        return _message.id === message.id;
      })
    },
    removeExpiredMessages(state) {
      let now = Date.now();
      state.messages = _.reject(state.messages, (message) => {
        let difference = (now - message.created) / 1000;
        return message.expire && difference >= message.expire;
      });
    }
  }
})

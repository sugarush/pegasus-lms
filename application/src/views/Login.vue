<template>
  <div class="login">
    <ul class="login-container">
      <li>
        <h1>Login</h1>
      </li>
      <li>
        <input v-model="username" v-on:keypress.enter="login" type="text" placeholder="Username">
      </li>
      <li>
        <input v-model="password" v-on:keypress.enter="login" type="password" placeholder="Password">
      </li>
      <li>
        <button v-on:click="login">Login</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import { HOST } from "../settings.js";

  import WebToken from "../../bower_components/sugar-data/lib/webtoken.js";

  export default {
    data: function() {
      return {
        username: "",
        password: "",
        remain: false,
      }
    },
    methods: {
      login: async function() {

        await WebToken.authenticate(`${HOST}/v1/authentication`, {
          data: {
            attributes: {
              username: this.username,
              password: this.password
            }
          }
        });

        if(WebToken.authenticated) {
          this.errors = [ ];
          this.$router.push({ name: "home" });
          this.$store.commit('addMessage', {
            class: "success centered",
            content: "Successfully logged in.",
            expire: 5
          })
          this.$parent.$forceUpdate();
        } else {
          this.errors = WebToken.errors;
          for(let error of WebToken.errors) {
            this.$store.commit("addMessage", {
              class: "error centered",
              content: error.detail,
              expire: 5
            });
          }
        }

      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/color.sass"

  div.login
    display: flex
    justify-content: center
    flex: 1 1 auto

  ul.login-container
    display: flex
    flex-direction: column
    text-align: center

    li
      margin: 0.5rem 0rem 0.5rem 0rem

    input
      border-radius: 5px
      border-color: $light-purple
      border-width: 1px
      border-style: solid
      padding: 0.5rem
      transition: border-color 0.5s

    input:focus
      border-color: $purple
</style>

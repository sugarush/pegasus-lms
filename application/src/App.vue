<template>
  <div id="application">
    <menu id="navigation">
      <input type="checkbox" id="menu-button" checked>
      <label for="menu-button"></label>
      <ul class="menu-content">
        <li>
          <router-link :to="{ name: 'home' }">Home</router-link>
        </li>
        <li v-if="authenticated()">
          <router-link :to="{ name: 'courses' }">Courses</router-link>
        </li>
        <li>
          <router-link class="dropdown-item" :to="{ name: 'user-default' }">User</router-link>
          <ul class="dropdown-content">
            <li v-if="authenticated()">
              <router-link :to="{ name: 'user-logout' }">Logout</router-link>
            </li>
            <li v-if="!authenticated()">
              <router-link :to="{ name: 'user-login' }">Login</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </menu>
    <messages />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import Messages from "./components/Messages.vue";

  import WebToken from "../bower_components/sugar-data/lib/webtoken.js";

  export default {
    methods: {
      authenticated() {
        return WebToken.authenticated;
      }
    },
    components: {
      Messages
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/color.sass"

  div#application
    display: flex
    flex-flow: column
    height: 100%


  main
    display: flex
    flex-flow: column
    flex: 1 1 auto
    margin: 1rem

  menu#navigation

    padding: 1rem
    display: flex

    input[type="checkbox"]
      display: none

    input[type="checkbox"] + label
      float: left

    input[type="checkbox"] + label:before
      transition: color 1s
      font-size: 2rem
      color: $light-purple
      font-family: "Font Awesome 5 Free"
      font-weight: 900
      content: "\f142"

    input[type="checkbox"]:checked + label:before
      font-size: 2rem
      color: $purple
      font-family: "Font Awesome 5 Free"
      font-weight: 900
      content: "\f142"

    a

      transition: color 0.5s

      &.active
        color: $light-purple

      &.active-exact
        color: $purple

      &:hover
        color: $light-purple

    ul.menu-content
      max-width: 0
      overflow: hidden
      float: left
      display: flex
      flex-direction: row
      transition: max-width 0.5s

      li
        margin: 0.5rem 0rem 0.5rem 0.5rem

    input:checked ~ ul.menu-content
      max-width: 100%

    a.dropdown-item:hover ~ ul.dropdown-content
      display: block
      max-height: 100%

    ul.dropdown-content
      display: none
      max-height: 0
      overflow: hidden
      position: absolute
      z-index: 1
      background: white
      background-color: white
      box-shadow: 0px 2px 2px $light-purple
      border-bottom: 1px solid $purple

      li
        margin: 0.5rem 0.5rem

    ul.dropdown-content:hover
      display: block
      max-height: 100%
</style>

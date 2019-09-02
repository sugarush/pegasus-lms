<template>
  <div class="logout">
    <ul class="logout-container">
      <li>
        <h1>Logout</h1>
      </li>
      <li>
        <button v-on:click="logout">Logout</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import WebToken from "../../bower_components/sugar-data/lib/webtoken.js";

  export default {
    methods: {
      logout: async function() {
        await WebToken.deauthenticate();
        this.$router.push({ name: "home" });
        this.$store.commit("addMessage", {
          class: "info centered",
          content: "Successfully logged out.",
          expire: 5
        });
        this.$parent.$forceUpdate();
      }
    }
  }
</script>

<style lang="sass" scoped>
  div.logout
    display: flex
    justify-content: center

  ul.logout-container
    display: flex
    flex-direction: column
    text-align: center

    li
      margin: 0.5rem 0rem 0.5rem 0rem
</style>

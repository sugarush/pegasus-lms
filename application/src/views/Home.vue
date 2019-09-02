<template>
  <div>
    {{ $data }}
  </div>
</template>

<script>
import WebToken from "../../bower_components/sugar-data/lib/webtoken.js";

export default {
  data: function() {
    return {
      payload: WebToken.payload
    }
  },
  updated: function() {
    this.payload = WebToken.payload;
  }
}
</script>

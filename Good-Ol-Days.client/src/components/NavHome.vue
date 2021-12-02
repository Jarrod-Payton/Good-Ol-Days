<template  >
  <div class="component">
    <div class="desktop">
      <button class="btn notifications elevation-3">
        Notifications <i class="mdi ms-1 mdi-18px mdi-bell-outline"></i>
      </button>
    </div>
    <div class="mobile">
      <button class="btn notifications me-5 elevation-3">
        <i class="mdi mdi-18px mdi-bell-outline"></i>
      </button>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup() {
    return {
      activeAlbum: computed(() => AppState.activeAlbum)
    }
  }
}
</script>


<style lang="scss" scoped>
.notifications {
  background-color: #4ac26d;
  color: rgb(255, 255, 255);
  font-family: "Saira Condensed", sans-serif;
  padding: 3px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 4vh;
}
.desktop {
  display: block;
}
.mobile {
  display: none;
}

@media only screen and (max-width: 500px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: block;
  }
  .notifications {
    padding: 3px;
    padding-left: 8px;
    padding-right: 8px;
    margin-right: 2vh;
    margin-left: 2vh;
  }
}
</style>
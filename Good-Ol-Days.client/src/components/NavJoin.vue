<template>
  <div class="me-4 desktop">
    <div>
      <button
        @click="login"
        title="Request to join this album"
        class="btn share elevation-3"
      >
        <i class="mdi me-2 mdi-18px mdi-account-arrow-right-outline"></i>Request
        to join this album
      </button>
    </div>
  </div>
  <div class="me-4 mt-3 mobile">
    <div>
      <button
        :disabled="collabThisAlbum.find((c) => c.accountId === account.id)"
        @click="login"
        title="Request to join this album"
        class="btn share elevation-3"
      >
        <i class="mdi me-2 mdi-18px mdi-account-arrow-right-outline"></i>Request
        to join
      </button>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { AuthService } from "../services/AuthService"
import { collaboratorService } from "../services/CollaboratorService"
import { useRoute } from "vue-router"
export default {
  props: {
    user: { type: Object }
  },
  setup(props) {
    const route = useRoute()
    return {
      route,
      collabThisAlbum: computed(() => AppState.collabThisAlbum),
      async login() {
        await AuthService.loginWithPopup()
        if (props.user.isAuthenticated) {
          await collaboratorService.addColab(route.params.albumId)
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.btn:focus {
  outline: none;
  box-shadow: none;
}
.cardspec {
  border-radius: 0;
  border-width: 4px !important;
  border-color: #9964cc !important;
  margin-top: 2.5vh;
  margin-left: 1vh;
  margin-right: 1vh;
  padding: 1vh;
}
.share {
  background-color: #9964cc;
  color: rgb(255, 255, 255);
  font-family: "Saira Condensed", sans-serif;
  padding: 3px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 4vh;
  margin-bottom: 2vh;
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
  .textmobile {
    font-size: 14px !important;
  }

  .cardspec {
    margin-top: 0vh;
    margin-left: 0vh;
    margin-right: 0vh;
    padding: 1vh;
  }
}
</style>
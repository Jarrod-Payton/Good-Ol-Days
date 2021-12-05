<template>
  <div class="me-4 desktop">
    <div>
      <button
        @click="login"
        title="Request to join this album"
        class="btn share elevation-3"
      >
        <div v-if="user.isAuthenticated">
          <i class="mdi me-2 mdi-18px mdi-account-arrow-right-outline"></i
          >Request to join this album
        </div>
        <div v-if="!user.isAuthenticated">
          <i class="mdi me-2 mdi-18px mdi-account-lock"></i>Login and request to
          join this album
        </div>
      </button>
    </div>
  </div>
  <div class="me-4 mt-3 mobile">
    <div>
      <button
        :disabled="collabThisAlbum.find((c) => c.accountId === user.id)"
        @click="login"
        title="Request to join this album"
        class="btn share elevation-3"
      >
        <div v-if="user.isAuthenticated">
          <i class="mdi me-2 mdi-18px mdi-account-arrow-right-outline"></i
          >Request to join
        </div>
        <div v-if="!user.isAuthenticated">
          <i class="mdi me-2 mdi-18px mdi-account-lock"></i>Login join this
          album
        </div>
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
import { challengeService } from "../services/ChallengeService"
export default {
  props: {
    user: { type: Object }
  },
  setup(props) {
    const route = useRoute()
    return {
      route,
      collabThisAlbum: computed(() => AppState.collabThisAlbum),
      activeAlbum: computed(() => AppState.activeAlbum),
      account: computed(() => AppState.account),
      async login() {
        if (!props.user.isAuthenticated) {
          await AuthService.loginWithPopup()
        }
        else if (props.user.isAuthenticated && !this.collabThisAlbum.find((c) => c.accountId === this.account.id)) {
          await collaboratorService.addColab(route.params.albumId)
        }
        await challengeService.getChallenges()
        await collaboratorService.getCollabThisAlbum(this.activeAlbum.id)
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
<template>
  <div v-if="user.isAuthenticated" class="NavigationBar desktop col-12">
    <div
      class="
        card
        cardspec
        d-md-flex
        flex-md-row
        justify-content-md-between
        align-items-md-center
      "
    >
      <div>
        <img
          width="230"
          class="img-fluid"
          src="../assets/img/logo2w.png"
          alt=""
        />
      </div>
      <div class="d-flex align-items-center">
        <div>
          <button class="btn notifications elevation-3">
            Notifications <i class="mdi ms-1 mdi-18px mdi-bell-outline"></i>
          </button>
        </div>
        <div class="me-4">
          <p class="m-0 f-14 text-end">Name goes here</p>
          <p class="m-0 text-end">emailgoeshere@gmail.com</p>
          <p @click="logout" class="m-0 logout selectable1 text-end">
            Logout <i class="mdi mdi-call-missed"></i>
          </p>
        </div>
        <img
          class="me-2 profile-picture border"
          height="85"
          width="90"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
      </div>
    </div>
  </div>
  <!-- MOBILE NAVIGATION BAR -->
  <div v-if="user.isAuthenticated" class="NavigationBar mobile col-12">
    <div class="card cardspec">
      <div class="d-flex justify-content-center">
        <img
          width="230"
          class="img-fluid"
          src="../assets/img/logo2w.png"
          alt=""
        />
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <div>
          <button class="btn notifications elevation-3">
            <i class="mdi mdi-18px mdi-bell-outline"></i>
          </button>
        </div>
        <div class="me-4">
          <p class="m-0 f-14 text-end textmobile">Name goes here</p>
          <p class="m-0 text-end textmobile">emailgoeshere@gmail.com</p>
          <p @click="logout" class="m-0 logout selectable1 text-end">
            Logout <i class="mdi mdi-call-missed"></i>
          </p>
        </div>
        <img
          class="me-2 profile-picture border"
          height="60"
          width="62"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { AuthService } from "../services/AuthService"
import { useRouter } from "vue-router"
export default {
  setup() {
    const router = useRouter()
    return {
      user: computed(() => AppState.user),
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.cardspec {
  border-radius: 0;
  border-width: 4px !important;
  border-color: #9964cc !important;
  margin-top: 2.5vh;
  margin-left: 1vh;
  margin-right: 1vh;
  padding: 1vh;
}
.profile-picture {
  object-fit: cover;
  border-width: 1px !important;
  border-color: #9964cc !important;
}
.logout {
  color: #36a7d7;
  margin-top: 7px !important;
}
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
  .profile-picture {
    object-fit: cover;
    border-width: 2px !important;
    border-color: #9964cc !important;
  }
  .textmobile {
    font-size: 14px !important;
  }
  .logout {
    margin-top: 2px !important;
    font-size: 14px !important;
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
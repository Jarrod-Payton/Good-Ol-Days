<template>
  <div
    class="
      LandingPage
      col-12
      colheight
      d-flex
      justify-content-center
      align-items-center
    "
  >
    <div class="card cardspec d-flex align-items-center">
      <img class="image img-fluid" src="../assets/img/landing.png" alt="" />

      <div>
        <p class="start">Login and start making memories!</p>
      </div>
      <div>
        <button @click="login" class="btn notifications elevation-3 login px-3">
          <p class="m-0 f-16">
            <i class="mdi me-1 mdi-18px mdi-camera"></i> Login
          </p>
        </button>
      </div>
      <div>
        <p class="phrase">
          “Happy times come and go but the memories stay forever”
        </p>
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
      async login() {
        AuthService.loginWithPopup()
        router.push({ name: 'Home' })
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.colheight {
  height: 100vh;
}
.cardspec {
  height: 85vh;
  width: 80%;
  border-width: 5px;
  border-radius: 0;
  border-color: #9964cc;
  background-color: rgba(245, 245, 245, 0.794);
}
.image {
  margin-top: 3vh;
  height: 50%;
  width: auto;
}
.start {
  font-size: 4vh;
}
.login {
  background-color: #4ac26d;
  color: white;
}
.phrase {
  color: rgb(92, 92, 92);
  font-size: 2.5vh;
  margin-top: 12vh;
}
@media only screen and (max-width: 500px) {
  .phrase {
    margin-top: 11vh;
    font-size: 1.5vh;
  }
  .image {
    margin-top: 4vh;
    height: 40%;
    width: auto;
  }
  .start {
    margin-top: 2vh;
    font-size: 2.5vh;
  }
  .cardspec {
    height: 75vh;
    width: 80%;
  }
  .login {
    margin-top: 3vh;
    background-color: #4ac26d;
    color: white;
  }
}
</style>
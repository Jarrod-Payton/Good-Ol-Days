<template  >
  <div class="component">
    <div class="desktop">
      <div class="dropdown">
        <button
          class="btn notifications elevation-3 dropdown-toggle"
          type="button"
          id="notifications"
          data-bs-toggle="dropdown"
          @click="seen"
        >
          Notifications <i class="mdi ms-1 mdi-18px mdi-bell-outline"></i>
        </button>
        <ul class="dropdown-menu">
          <li v-if="notifications.length == 0">
            <h5 class="notificationHead text-center">No Notifications Yet</h5>
          </li>
          <li v-if="!notifications.length == 0">
            <div class="d-flex justify-content-center">
              <button class="notificationHead clearButton btn" @click="clear">
                <h5 class="notificationHead text-center buttonText">
                  Clear All Your Notifications
                </h5>
              </button>
            </div>
          </li>
          <li v-for="n in notifications" :key="n.id">
            <Notification :notification="n" v-if="notifications.length > 0" />
          </li>
        </ul>
      </div>
    </div>
    <div class="mobile">
      <div class="dropdown">
        <button
          class="btn notifications me-5 elevation-3 dropdown-toggle"
          type="button"
          id="notifications"
          data-bs-toggle="dropdown"
          @click="seen"
        >
          <i class="mdi mdi-18px mdi-bell-outline"></i>
        </button>
        <ul class="dropdown-menu">
          <li v-if="notifications.length == 0">
            <h5 class="notificationHead text-center">No Notifications Yet</h5>
          </li>
          <li v-if="!notifications.length == 0">
            <div class="d-flex justify-content-center">
              <button class="notificationHead clearButton btn" @click="clear">
                <h5 class="notificationHead text-center buttonText">
                  Clear All Your Notifications
                </h5>
              </button>
            </div>
          </li>
          <li v-for="n in notifications" :key="n.id">
            <Notification :notification="n" v-if="notifications.length > 0" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted, watchEffect } from "@vue/runtime-core"
import { notificationService } from "../services/NotificationService"
import Pop from "../utils/Pop"
export default {
  setup() {
    onMounted(async () => {
      await notificationService.findType()
    })
    return {
      async seen() {
        await notificationService.seen()
      },
      async clear() {
        if (await Pop.confirm()) {
          await notificationService.clear()
        }
      },
      activeAlbum: computed(() => AppState.activeAlbum),
      notifications: computed(() => AppState.notifications)
    }
  }
}
</script>
// border-radius: 1.5vh;
// border-radius: 1vh;

<style lang="scss" scoped>
.buttonText {
  background-color: rgb(255, 255, 255);
  font-size: 1.8vh !important;
}
.clearButton {
  background-color: #c24a4a;
  color: black;
  height: 3.3vh;
  width: 38vh !important;
  border-radius: 0vh !important;
}
.notificationHead {
  font-size: 1.5vh;
  font-family: "Saira Condensed", sans-serif;
  padding-left: 1vh;
  padding-right: 1vh;
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
.btn:focus {
  outline: none !important;
  box-shadow: none !important;
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
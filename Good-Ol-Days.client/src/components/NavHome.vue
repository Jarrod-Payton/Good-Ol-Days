<template  >
  <div class="component">
    <div class="desktop">
      <div class="dropdown">
        <!--The notifications button for monitor view-->
        <!--This button is set to an onclick that both opens the notifications but also sets every one of them to seen-->
        <button
          class="btn notifications elevation-3 dropdown"
          type="button"
          id="notifications"
          data-bs-toggle="dropdown"
          @click="seen"
        >
          Notifications <i class="mdi ms-1 mdi-18px mdi-bell-outline"></i>
          <span
            v-if="notifications.filter((n) => n.seen === false).length > 0"
            class="
              desktop
              position-absolute
              top-25
              start-100
              translate-middle
              badge
              rounded-pill
              bg-danger
            "
          >
            {{ notifications.filter((n) => n.seen === false).length }}
          </span>
        </button>
        <ul class="dropdown-menu">
          <!--This is if there are no notifications at all-->
          <li v-if="notifications.length == 0">
            <h5 class="notificationHead text-center">No Notifications Yet</h5>
          </li>
          <!--This is to set the given and also give the user the option to delete all of their notifications-->
          <li v-if="!notifications.length == 0">
            <div class="d-flex justify-content-center parentDropdown">
              <button class="notificationHead clearButton btn" @click="clear">
                <h5 class="notificationHead text-center buttonText">
                  Clear All Your Notifications
                </h5>
              </button>
            </div>
          </li>
          <!--For displaying all the notifications as a list item in the dropdown-->
          <li v-for="n in notifications" :key="n.id">
            <Notification :notification="n" v-if="notifications.length > 0" />
          </li>
        </ul>
      </div>
    </div>
    <!--Nav Bar for mobile view-->
    <div class="mobile">
      <div class="dropdown">
        <!--This button is set to an onclick that both opens the notifications but also sets every one of them to seen-->
        <button
          class="btn notifications me-5 elevation-3 dropdown"
          type="button"
          id="notifications"
          data-bs-toggle="dropdown"
          @click="seen"
        >
          <i class="mdi mdi-18px mdi-bell-outline"></i>
        </button>
        <ul class="dropdown-menu">
          <!--This is if there are no notifications at all-->
          <li v-if="notifications.length == 0">
            <h5 class="notificationHead text-center">No Notifications Yet</h5>
          </li>
          <!--This is to set the given and also give the user the option to delete all of their notifications-->
          <li v-if="!notifications.length == 0">
            <div class="d-flex justify-content-center">
              <button class="notificationHead clearButton btn" @click="clear">
                <h5 class="notificationHead text-center buttonText">
                  Clear All Your Notifications
                </h5>
              </button>
            </div>
          </li>
          <!--For displaying all the notifications as a list item in the dropdown-->
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
    return {
      async seen() {
        //Sets every notification on that account to seen
        await notificationService.seen()
      },
      async clear() {
        if (await Pop.confirm()) {
          //Deletes every single notification
          await notificationService.clear()
          Pop.toast('Notifications Cleared')
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
  background-color: rgb(204, 55, 55);
  font-size: 1.6vh !important;
  padding-bottom: 0.5vh;
  padding-top: 0.5vh;
}
.clearButton {
  background-color: #ffffff;
  color: rgb(248, 248, 248);
  height: 3.3vh;
  border-radius: 0vh !important;
}
.parentDropdown {
  width: 38vh !important;
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
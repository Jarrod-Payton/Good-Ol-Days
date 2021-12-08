<template>
  <div>
    <v-tour name="myTour" :steps="steps"></v-tour>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { accountService } from "../services/AccountService"
import { onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
export default {
  name: 'my-tour',
  setup() {
    return {
      account: computed(() => AppState.account),
      steps: [
        {
          target: '#v-step-0',
          header: {
            title: 'Get Started',
          },
          content: `Add an Album to start!`,
          params: {
            placement: "left-start",

          }
        },
        {
          target: '#notifications',
          header: {
            title: 'Notifications',
          },
          content: `Find your new notifications here!`,
          params: {
            placement: 'left'
          }
        },
        {
          target: '#profilepic',
          header: {
            title: 'Profile',
          },
          content: `Click on your profile picture for profile settings`
        },
        {
          target: '#homebutton',
          header: {
            title: 'Home Page',
          },
          content: `Click on Good Ol' Days to go back to the home page`,
          params: {
            placement: "right-end",

          }
        },
        {
          target: '#aboutinfo',
          header: {
            title: 'About',
          },
          content: `Click here to learn a little more about the developers`
        },
        // {
        //   target: '#uploadfile',
        //   header: {
        //     title: 'Upload Cover',
        //   },
        //   content: `Click here to learn a little more about the developers`
        // },
      ],
      tour() {
        if (AppState.account.hasTour) {
          this.$tours['myTour'].start()
          accountService.hasTour()
        }
      }
    }
  },

  mounted: function () {
    this.$tours['myTour'].start()
    accountService.hasTour()
  }
}
</script>
<style lang="scss">
.v-step {
  left: 0px !important;
}
.v-tour__target--highlighted {
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.4) !important;
}
</style>
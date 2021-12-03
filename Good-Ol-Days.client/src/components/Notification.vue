<template>
  <li>
    <div class="dropdown-item parent">
      <div class="d-flex jusify-content-between">
        <p class="font">{{ message }}</p>
        <div>
          <i class="mdi mdi-check selectable1" />
          <i class="mdi mdi-nintendo-switch selectable1" />
        </div>
      </div>
    </div>
  </li>
</template>
<script>
import { onMounted, ref } from "@vue/runtime-core"
import { notificationService } from "../services/NotificationService"

export default {
  props: { notification: { type: Object, required: true } },
  setup(props) {
    const message = ref('')
    onMounted(async () => {
      if (props.notification.type === "post") {
        message.value = `${props.notification.notifier.name} is trying to become a collaborator in ${props.notification.album.title}`
      }
      if (props.notification.type === "collaborator") {
        message.value = `${props.notification.notifier.name} posted a new photo to ${props.notification.album.title}`
      }
    })
    return {
      message
    }
  },
}
</script>
<style scoped>
.sml-button {
  width: 1vh;
  height: 1vh;
}
.parent {
  width: 100%;
}
</style>
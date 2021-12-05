<template>
  <div class="parent">
    <div
      v-if="notification.type === 'collaborator'"
      class="d-flex justify-content-between"
    >
      <p class="font message">{{ message }}</p>
      <div class="d-flex">
        <i
          class="mdi mdi-check selectable1 check"
          title="Accept"
          @click="acceptCollaborator"
        />
        <p
          class="x selectable1"
          title="Delete Notification"
          @click="deleteNotification"
        >
          X
        </p>
      </div>
    </div>
    <div class="d-flex justify-content-between" v-else>
      <p class="font message">{{ message }}</p>
      <p
        class="x selectable1"
        title="Delete Notification"
        @click="deleteNotification"
      >
        X
      </p>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "@vue/runtime-core"
import { notificationService } from "../services/NotificationService"
import { collaboratorService } from "../services/CollaboratorService"
import Pop from "../utils/Pop"

export default {
  props: { notification: { type: Object, required: true } },
  setup(props) {
    const message = ref('')
    onMounted(async () => {
      if (props.notification.type === "collaborator") {
        message.value = `${props.notification.notifier.name} requested to join ${props.notification.album.title} Album`
      }
      if (props.notification.type === "post") {
        message.value = `${props.notification.notifier.name} posted a new photo to ${props.notification.album.title}`
      }
    })
    return {
      message,
      async deleteNotification() {
        if (await Pop.confirm()) {
          await notificationService.deleteNotification(props.notification.id)
        }
      },
      async acceptCollaborator() {
        await collaboratorService.acceptColab(props.notification)
      }
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
  margin-top: 1vh;
}
.check {
  padding-left: 1vh;
}
.x {
  padding-left: 1vh;
  padding-right: 2vh;
}
.message {
  padding-left: 2vh;
}
</style>
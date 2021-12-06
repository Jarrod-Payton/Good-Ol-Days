<template>
  <!--Sets the size of the list item to be as big as the parent allows it to be-->
  <div class="parent">
    <!--Sends this message if the notification is for a collaborator response-->
    <div
      v-if="notification.type === 'collaborator'"
      class="d-flex justify-content-between"
    >
      <p class="font message">{{ message }}</p>
      <div class="d-flex">
        <!--Accepts the collaborator request-->
        <i
          class="mdi mdi-check selectable1 check"
          title="Accept"
          @click="acceptCollaborator"
        />
        <!--Deletes the notification-->
        <p
          class="x selectable1"
          title="Delete Notification"
          @click="deleteNotification"
        >
          X
        </p>
      </div>
    </div>
    <!--Sends this message if the notification is for a new post notification-->
    <div class="d-flex justify-content-between" v-else>
      <p class="font message">{{ message }}</p>
      <!--Deletes notification-->
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
  //Takes in a prop for every notification
  props: { notification: { type: Object, required: true } },
  setup(props) {
    //A ref to be changed in the onMounted in order to determine what type of message it will be
    const message = ref('')
    onMounted(async () => {
      //Sets a message if collaborator
      if (props.notification.type === "collaborator") {
        message.value = `${props.notification.notifier.name} requested to join ${props.notification.album.title} Album`
      }
      //Sets a message if a post update
      if (props.notification.type === "post") {
        message.value = `${props.notification.notifier.name} posted a new photo to ${props.notification.album.title}`
      }
    })
    return {
      message,
      async deleteNotification() {
        //Gives the user the chance to confirm the deletion of the notification and then deletes it
        if (await Pop.confirm()) {
          await notificationService.deleteNotification(props.notification.id)
        }
      },
      async acceptCollaborator() {
        //Accepts collaborator
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
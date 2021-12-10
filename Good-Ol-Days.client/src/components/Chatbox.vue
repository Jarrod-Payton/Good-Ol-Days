<template>
  <div class="component">
    <button
      class="btn btn-primary text-white postition-absolute"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#chatOffcanvas"
      aria-controls="chatOffcanvas"
    >
      <i class="mdi mdi-chat"></i>
    </button>

    <div
      class="offcanvas offcanvas-start chatbox"
      tabindex="-1"
      id="chatOffcanvas"
      aria-labelledby="chatOffcanvasLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title text-center" id="chatOffcanvasLabel">
          {{ album.title }} Live Chat
        </h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="line"></div>
      <div class="offcanvas-body row align-items-between">
        <div class="messagesContainer col-12">
          <div class="row" v-for="m in messages" :key="m.id">
            <p
              :class="
                m.isMine ? 'm-0 justify-self-start' : 'm-o justify-self-end'
              "
            >
              {{ m.body }}
            </p>
          </div>
        </div>
        <div class="line"></div>
        <div class="message-form-container col-12">
          <div class="d-flex justify-content-start mt-3">
            <h5>Send a Message:</h5>
          </div>
          <form @submit.prevent="createMessage">
            <div
              class="
                mt-3
                mb-3
                input-group
                d-flex
                flex-row
                justify-content-center
              "
            >
              <input
                class="border-dark w-75"
                v-model="messageData"
                type="text"
                maxlength="100"
              />
              <span @click="createMessage" class="input-group-text bg-dark"
                ><i class="mdi mdi-send"></i
              ></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState'
import { albumService } from '../services/AlbumService'
import { logger } from '../utils/Logger'
export default {
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const messageData = ref('')
    return {
      messageData,
      messages: computed(() => AppState.messages),
      async createMessage() {
        try {
          logger.log(props.album)
          await albumService.createMessage(props.album.id, messageData.value)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteMessage(messageId) {
        try {
          await albumService.deleteMessage(messageId)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.messagesContainer {
  height: 73vh;
}
.chatbox {
  width: 45.8%;
}
.message-form-container {
  height: 15vh;
}
.line {
  width: 100%;
  height: 2px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgb(139, 139, 139) 25%,
    rgba(139, 139, 139) 75%,
    rgba(225, 225, 225, 0) 100%
  );
}
</style>    
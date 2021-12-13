<template>
  <div class="component">
    <button
      title="Album Live Chat"
      class="btn btn-primary text-white ms-4 elevation-3 downloadMode"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#chatOffcanvas"
      aria-controls="chatOffcanvas"
    >
      <i class="mdi mdi-chat downloadIcon"></i>
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
        <div class="messagesContainer col-12 p-4 scrollbar">
          <div
            v-for="m in messages"
            :key="m.id"
            class="row jusify-content-between"
          >
            <div
              v-if="screenSize < 500 || m.creatorId === account.id"
              class="col-2 p-0 d-flex align-items-center justify-content-center"
            >
              <img
                :title="m.creator.name"
                class="img-fluid profilepics me-2 elevation-3"
                :src="m.creator.picture"
                alt="profile"
              />
            </div>
            <div
              :class="
                m.creatorId === account.id
                  ? 'card col-md-10 p-0 d-flex rounded elevation-3 chatuser border-2 my-3 p-3'
                  : 'card col-md-10 p-0 d-flex  rounded elevation-3 chatother border-2 my-3 p-3'
              "
            >
              <div class="row justify-content-between">
                <div class="col-10 d-flex align-items-center text-wrap">
                  <p class="m-0 text-break">{{ m.body }}</p>
                </div>
                <div class="col-2 d-flex">
                  <button
                    title="delete message"
                    aria-describedby="delete message"
                    class="btn p-0 delete rounded"
                    v-if="m.creatorId === account.id"
                  >
                    <i
                      class="selectable mdi mdi-trash-can"
                      @click="deleteMessage(m.id)"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
            <div
              v-if="m.creatorId !== account.id && screenSize > 500"
              class="col-2 p-0 d-flex align-items-center justify-content-center"
            >
              <img
                :title="m.creator.name"
                class="img-fluid profilepics me-2 elevation-3"
                :src="m.creator.picture"
                alt="profile"
              />
            </div>
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
              <span
                @click="createMessage"
                class="
                  input-group-text
                  bg-primary
                  border border-3 border-primary
                "
              >
                <i class="mdi mdi-send"></i
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
import Pop from '../utils/Pop'
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
      screenSize: computed(() => window.innerWidth),
      account: computed(() => AppState.account),
      messages: computed(() => AppState.messages),
      async createMessage() {
        try {
          logger.log(props.album)
          await albumService.createMessage(props.album.id, messageData.value)
          messageData.value = ''
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteMessage(messageId) {
        try {
          if (await Pop.confirm('Delete Your Message?', 'You can not undo this', 'warning')) {

            logger.log(messageId)
            await albumService.deleteMessage(props.album.id, messageId)
          }
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.chatother {
  background-color: rgba(176, 112, 218, 0.411);
  border-color: rgb(110, 110, 110);
}
.chatuser {
  background-color: rgba(228, 228, 228, 0.685);
  border-color: rgb(110, 110, 110);
}
.downloadMode {
  padding-left: 1vh;
  padding-right: 1vh;
  padding-bottom: 0vh;
  padding-top: 0vh;
  height: 3.8vh;
}
.downloadIcon {
  font-size: 2vh;
}
.messagesContainer {
  height: 70vh;
}
.chatbox {
  width: 45.8%;
}
.message-form-container {
  max-height: 15vh;
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
.profilepics {
  border-radius: 50%;
  height: 4em;
  width: 4em;
  object-fit: cover;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
}
.delete {
  width: 3em;
  color: #6b6b6b;
  border-color: #838383;
}
.delete:hover {
  background-color: red;
  color: white;
  border-color: red;
}
.scrollbar {
  height: 70vh !important;
  overflow-y: scroll;
}
@media only screen and (max-width: 500px) {
  .offcanvas {
    width: 100%;
  }
  .downloadMode {
    padding-left: 1vh;
    padding-right: 1vh;
    padding-bottom: 0vh;
    padding-top: 0vh;
    height: 3.5vh;
  }
  .downloadIcon {
    font-size: 1.3vh;
  }
}
</style>    
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
      <div class="offcanvas-body border border-primary border-5">
        <div class="messsagesContainer col-12">
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
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      messages: computed(() => AppState.messages)
    }
  }
}
</script>


<style lang="scss" scoped>
.chatbox {
  width: 45.8%;
}
</style>    
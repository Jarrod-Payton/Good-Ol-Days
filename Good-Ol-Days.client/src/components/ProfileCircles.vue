<template>
  <div class="ProfilesCircles">
    <div class="">
      <img
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        v-if="collab.verified"
        :title="collab.name"
        class="profilepics"
        :src="collab.picture"
        alt=""
      />
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <a
            @click="unverify(collab)"
            class="dropdown-item selectable1 text-danger"
            >End collaboration with this person
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { collaboratorService } from "../services/CollaboratorService"
import { AppState } from "../AppState"
export default {
  props: {
    collab: { type: Object, required: true }
  },
  setup() {
    return {
      activeAlbum: computed(() => AppState.activeAlbum),
      account: computed(() => AppState.account),
      async unverify(collab) {
        await collaboratorService.unverify(collab)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.profilepics {
  border-radius: 50%;
  height: 4vh;
  width: 4vh;
  object-fit: cover;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
}
</style>
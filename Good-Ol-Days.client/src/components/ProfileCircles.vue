<template>
  <div class="ProfilesCircles">
    <div class="">
      <img
        v-if="collab.verified"
        :title="collab.name"
        class="profilepics"
        :src="collab.picture"
        alt=""
      />
      <!-- <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <a @click="unverify" class="dropdown-item text-danger" href="#"
            >End collaboration with this person
          </a>
        </li>
      </ul> -->
    </div>
  </div>
</template>


<script>
import { collaboratorService } from "../services/CollaboratorService"
export default {
  props: {
    collab: { type: Object, required: true }
  },
  setup() {
    return {
      // async unverify(){
      //   await collaboratorService.unverify()
      // }
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
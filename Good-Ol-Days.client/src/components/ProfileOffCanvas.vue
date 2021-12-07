<template>
  <div class="ProfileOffCanvas">
    <div class="ProfileCanvas">
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasLabel"
      >
        <div class="offcanvas-header">
          <p class="offcanvas-title f-22" id="offcanvasLabel">Profile</p>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div
            class="d-flex justify-content-center flex-column align-items-center"
          >
            <i
              @click="openEdit"
              aria-label="edit profile"
              class="mdi mdi-pencil selectable1 align-self-end"
              >Edit Profile</i
            >
            <div v-if="edit === true">
              <img
                :src="account.picture"
                alt="user photo"
                height="130"
                width="130"
                class="picconfig elevation-3 border mt-4"
              />
            </div>
            <div class="text-center mb-3" v-if="edit === true">
              <p class="mb-0 mt-3 f-16">{{ account.name }}</p>
              <p class="m-0 f-14">{{ account.email }}</p>
            </div>
          </div>

          <div v-if="edit === false">
            <form>
              <div class="d-flex flex-column mb-3 mt-4">
                <div class="input-group">
                  <span class="input-group-text border-dark">Name:</span>
                  <input
                    class="form-control border-dark"
                    type="text"
                    placeholder=""
                    name="name"
                    v-model="editProfile.name"
                  />
                </div>
              </div>
              <div class="d-flex flex-column">
                <div class="input-group">
                  <span class="input-group-text border-dark">Picture URL:</span>
                  <input
                    class="form-control border-dark"
                    type="text"
                    placeholder=""
                    name="pic-url"
                    v-model="editProfile.picture"
                  />
                </div>
              </div>
              <div class="d-flex justify-content-center mt-3">
                <i
                  type="submit"
                  @click="editAccount"
                  v-if="edit === false"
                  class="
                    mdi mdi-content-save
                    selectable1
                    align-self-end
                    border
                    p-1
                    rounded
                    bg-light
                    mb-3
                  "
                >
                  Save
                </i>
              </div>
            </form>
          </div>
          <div v-if="myAlbums[0]">
            <div class="line"></div>
            <div>
              <p class="title mt-2 ms-1">Albums</p>
            </div>
            <div
              class="card text-center border-0 cardalbums selectable"
              v-for="a in myAlbums"
              :key="a.id"
            >
              <div data-bs-dismiss="offcanvas" @click="routeTo(a.id)">
                <div>
                  {{ a.title }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="collaborators[0]">
            <div class="line"></div>
            <div>
              <p class="title mt-2 ms-1">Group Albums</p>
            </div>
            <div
              v-for="c in collaborators"
              :key="c.albumId"
              v-show="c.verified"
              class="card text-center border-0 cardalbums selectable"
            >
              <div data-bs-dismiss="offcanvas" @click="routeTo(c.albumId)">
                <div>
                  {{ c.albumTitle }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { accountService } from "../services/AccountService"
import { AppState } from "../AppState"
import { useRouter } from "vue-router"
import { onMounted, watchEffect } from "@vue/runtime-core"
import { resetService } from "../services/ResetService"
export default {
  props: {
    account: { type: Object }
  },
  setup() {
    //TODO flip this ref on close of the off canvas
    let editProfile = ref({})
    let edit = ref(false)
    const router = useRouter()
    return {
      edit,
      editProfile,
      router,
      //This is on the right track, but needs more thought
      // async changePFP(e) {
      //   try {
      //     editProfile.picture.value = e.target.file

      //   } catch (error) {
      //     logger.error(error)
      //   }

      // },
      async editAccount() {
        try {
          await accountService.editAccount(editProfile.value)
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, 'error')
        }
      },
      openEdit() {
        AppState.editProfile = !AppState.editProfile
      },
      routeTo(id) {
        router.push({ name: 'Album', params: { albumId: id } })
      },
      myAlbums: computed(() => AppState.myAlbums),
      collaborators: computed(() => AppState.collaborators),
      edit: computed(() => AppState.editProfile)
    }
  }
}
</script>


<style lang="scss" scoped>
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
.picconfig {
  object-fit: cover;
  border-color: #9964cc !important;
  border-width: 3px !important;
}
.title {
  font-size: 3vh;
}
.cardalbums {
  background-color: rgb(230, 230, 230);
  padding: 0.4vh;
  font-family: "Saira Condensed", sans-serif;
  margin-bottom: 1vh;
}
</style>
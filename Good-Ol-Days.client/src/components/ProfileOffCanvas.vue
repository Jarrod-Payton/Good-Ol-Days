<template>
  <div class="ProfileOffCanvas">
    <div class="ProfileCanvas">
      <div
        class="offcanvas offcanvas-start"
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
              @click="edit = !edit"
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
                  "
                >
                  Save
                </i>
              </div>
            </form>
          </div>
          <div class="line"></div>
          <div>
            <p class="title mt-2 ms-1">Albums</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { accountService } from "../services/AccountService"
export default {
  props: {
    account: { type: Object }
  },
  setup() {
    let edit = ref(true)
    let editProfile = ref({})
    return {
      async editAccount() {
        try {
          await accountService.editAccount(editProfile.value)
          edit.value = !edit.value
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, 'error')
        }
      },
      edit,
      editProfile,
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
.title {
  font-size: 3vh;
}
</style>
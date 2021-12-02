<template>
  <div class="component">
    <div class="desktop d-flex">
      <div class="d-flex">
        <div class="me-5">
          <div class="card topcard border-0 text-center">
            Pool Party 10/2020
          </div>
          <div class="card bottomcard border-0">
            <div>
              <p class="p-0 mb-0 ps-2">People in this group:</p>
            </div>
            <div class="d-flex" v-for="u in collabThisAlbum" :key="u.accountId">
              <div>
                <img
                  :title="u.name"
                  class="profilepics"
                  :src="u.picture"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <button
          data-bs-toggle="modal"
          data-bs-target="#createPostModal"
          class="btn add elevation-3"
        >
          <i class="mdi me-1 mdi-18px mdi-plus-circle-outline"> </i>Add to this
          album
        </button>
        <div>
          <p class="album text-center">Album: Shared</p>
        </div>
      </div>
      <div>
        <button title="Delete this album" class="btn delete elevation-3">
          <i class="mdi mdi-18px mdi-trash-can"></i>
        </button>
      </div>
    </div>
    <div class="mobile">
      <div>
        <button
          data-bs-toggle="modal"
          data-bs-target="#createPostModal"
          class="btn add elevation-3"
        >
          <i class="mdi mdi-18px mdi-plus-circle-outline"> </i>
        </button>
        <button title="Delete this album" class="btn ms-2 delete elevation-3">
          <i class="mdi mdi-18px mdi-trash-can"></i>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup() {
    return {
      collabThisAlbum: computed(() => AppState.collabThisAlbum),
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
.add {
  background-color: #36a7d7;
  color: rgb(255, 255, 255);
  font-family: "Saira Condensed", sans-serif;
  padding: 3px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 4vh;
}
.share {
  background-color: #9964cc;
  color: rgb(255, 255, 255);
  font-family: "Saira Condensed", sans-serif;
  padding: 3px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 4vh;
  margin-bottom: 2vh;
}
.desktop {
  display: block;
}
.mobile {
  display: none;
}
.album {
  margin: 0;
  padding: 0.5vh;
  padding-right: 5vh;
  font-size: 1.5vh;
  color: #9b9b9b;
}
.topcard {
  min-width: 35vh;
  padding: 0.5vh;
  padding-left: 2vh;
  background-color: rgb(231, 231, 231);
  margin-bottom: 0.5vh;
  font-family: "Saira Condensed", sans-serif;
}
.bottomcard {
  min-width: 35vh;
  min-height: 6vh;
  background-color: rgb(231, 231, 231);
  font-family: "Saira Condensed", sans-serif;
  font-size: 1.7vh;
}
.profilepics {
  border-radius: 50%;
  height: 4vh;
  width: 4vh;
  object-fit: cover;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
}
.btn:focus {
  outline: none;
  box-shadow: none;
}
.delete {
  background-color: #e94040;
  color: rgb(255, 255, 255);
  font-family: "Saira Condensed", sans-serif;
  padding: 3px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 4vh;
  margin-bottom: 2vh;
}
@media only screen and (max-width: 500px) {
  .desktop {
    display: none !important;
  }
  .mobile {
    display: block;
  }
  .add {
    padding: 2px;
    padding-left: 8px;
    padding-right: 8px;
    margin: 0;
  }
  .share {
    padding: 2px;
    padding-left: 8px;
    padding-right: 8px;
    margin: 0;
    margin-bottom: 4px;
    margin-top: 4px;
  }
  .delete {
    padding: 2px;
    padding-left: 8px;
    padding-right: 8px;
    margin: 0;
    margin-right: 0;
    margin-bottom: 0;
  }
}
</style>
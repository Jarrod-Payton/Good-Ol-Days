<template>
  <div class="ShareAlbumModal">
    <div
      class="modal fade"
      id="shareModal"
      tabindex="-1"
      aria-labelledby="shareModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Share this Album</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <label class="font me-2 my-4">Link:</label>
              <input
                class="inputshare"
                v-on:focus="$event.target.select()"
                ref="clone"
                readonly
                :value="'http://localhost:8080/#/album/' + activeAlbum.id"
              />
              <button class="btn buttoncopy elevation-3 ms-2" @click="copy">
                <i class="mdi mdi-content-copy"> Copy</i>
              </button>
            </div>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Pop from "../utils/Pop";
export default {
  props: {
    activeAlbum: { type: Object }
  },
  setup() {

    return {};
  },
  methods: {
    copy() {
      this.$refs.clone.focus();
      document.execCommand('copy');
      Pop.toast('Link Copied!', 'success')
    }
  }
};
</script>


<style lang="scss" scoped>
.inputshare {
  width: 60%;
  border-color: #9964cc;
  font-family: "Saira Condensed", sans-serif;
}
.font {
  font-family: "Saira Condensed", sans-serif;
  font-size: 2.3vh;
  padding-left: 12vh;
}
.buttoncopy {
  background-color: #9964cc;
  color: rgb(250, 250, 250);
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 7px;
  padding-right: 7px;
  margin-bottom: 3px;
  font-family: "Saira Condensed", sans-serif;
}
@media only screen and (max-width: 500px) {
  .font {
    padding-left: 1vh;
  }
}
</style>
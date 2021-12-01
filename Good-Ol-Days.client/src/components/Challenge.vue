<template>
  <div class="row m-0">
    <div class="col-12 paddingmobile">
      <div class="d-flex justify-content-center align-content-center">
        <div class="card cardspec">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h2 class="text-center font pb-3 pt-2 text-sm-h2">
                  Let's make some memories!
                </h2>
              </div>
            </div>
            <div class="row" v-if="!activeChallenge.body">
              <div class="col-12">
                <h5 class="font">
                  Choose a category and choose a challenge for the week
                </h5>
              </div>
              <div class="col-12">
                <div
                  class="
                    heightSet
                    px-1
                    d-flex
                    justify-content-between
                    align-content-center
                  "
                >
                  <button
                    class="buttonscss btn widthButton text-center"
                    @click="refreshOptions"
                  >
                    X
                  </button>
                  <select class="heightSet">
                    <option value="General">General</option>
                    <option value="Family">Family</option>
                    <option value="Friends">Friends</option>
                    <option value="Fun">Random / Fun</option>
                    <option value="SignificantOther">Significant Other</option>
                    <option value="Child">Child</option>
                  </select>
                </div>
              </div>
            </div>
            <!--This is for when the challenge is active-->
            <div class="row" v-if="activeChallenge.body">
              <div class="col-12">
                <h3 class="font limeText">Weekly Challenge:</h3>
              </div>
              <div class="col-12">
                <!-- TODO This is where we will put the challenge if we have one -->
                <h3 class="font">{{ activeChallenge.title }}</h3>
              </div>
              <div class="col-12">
                <div
                  class="d-flex justify-content-end align-content-center mt-4"
                >
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#createPostModal"
                    class="customBtn btn btn-success"
                  >
                    <i class="mdi mdi-cloud-upload me-1" />
                    Upload
                  </button>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p class="text-center mt-3">"{{ quote }}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import { quoteService } from "../services/QuoteService"
import Pop from "../utils/Pop"
export default {
  setup() {
    onMounted(async () => {
      await quoteService.setActiveQuote()
    })
    return {
      refreshOptions() {
        Pop.toast('Hello')
      },
      quote: computed(() => AppState.activeQuote),
      recommended: computed(() => AppState.recommendedChallenges),
      activeChallenge: computed(() => AppState.activeChallenge)
    }
  },
}
</script>
<style scoped>
.heightSet {
  height: 3vh;
}
.widthButton {
  width: 2vh;
  padding: 0;
}
.buttonscss {
  background-color: #4ac26d;
  margin-top: 0vh;
  margin-right: 3vh;
  color: white;
  font-size: 1.5vh;
  font-family: "Saira Condensed", sans-serif;
  letter-spacing: 0.4px;
}
.cardspec {
  height: 100%;
  width: 70%;
  border-width: 5px;
  border-radius: 0;
  border-color: #4ac26d;
  background-color: rgb(245, 245, 245, 0.9);
}
.font {
  font-family: "Saira Condensed", sans-serif;
}
.limeText {
  color: #4ac26d;
}
.customBtn {
  background-color: #4ac26d;
  color: rgb(255, 255, 255);
  font-family: "Saira Condensed", sans-serif;
  padding: 3px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 4vh;
}
@media only screen and (max-width: 500px) {
  .text-sm-h2 {
    font-size: 3vh;
  }
  .cardspec {
    height: 100%;
    width: 100%;
    border-width: 5px;
    border-radius: 0;
    border-color: #4ac26d;
    background-color: rgb(245, 245, 245, 0.9);
  }
  .paddingmobile {
    padding: 0;
  }
}
</style>
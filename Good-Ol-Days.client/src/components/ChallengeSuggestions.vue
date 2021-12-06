<template>
  <!--Is just the style of the individual suggested challenges-->
  <div class="card selectable card-styling" @click="createActive">
    <div class="card-title">
      <h5 class="font">
        {{ suggestion.body }}
      </h5>
    </div>
  </div>
</template>
<script>
import { challengeService } from "../services/ChallengeService"
export default {
  //Challenge.vue component passes it a prop so the body changes with the recommendation
  props: { suggestion: { type: Object, required: true } },
  setup(props) {
    return {
      async createActive() {
        //Just sends this suggested challenge to become the active challenge
        await challengeService.createActiveChallenge(props.suggestion.body)
      }
    }
  },
}
</script>
<style scoped>
.font {
  font-family: "Saira Condensed", sans-serif;
}
.card-styling {
  border-color: #4ac26e;
  padding-top: 1vh;
  margin-top: 1vh;
  padding-left: 0.8vh;
  border-width: 0.2vh;
  border-radius: 0vh;
}
@media only screen and (max-width: 500px) {
  .font {
    font-size: 2vh;
  }
}
</style>
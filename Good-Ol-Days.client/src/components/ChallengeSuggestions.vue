<template>
  <div class="card selectable" @click="createActive">
    <div class="card-title">
      {{ suggestion.body }}
    </div>
  </div>
</template>
<script>
import { challengeService } from "../services/ChallengeService"
export default {
  props: { suggestion: { type: Object, required: true } },
  setup(props) {
    return {
      async createActive() {
        await challengeService.createActiveChallenge(props.suggestion.body)
      }
    }
  },
}
</script>
<style scoped>
</style>
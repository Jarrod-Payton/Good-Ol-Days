<template>
  <div class="card">
    <div class="card-title">
      {{ suggestion.body }}
    </div>
  </div>
</template>
<script>
export default {
  props: { suggestion: { type: Object, required: true } },
  setup(props) {
    return {

    }
  },
}
</script>
<style scoped>
</style>
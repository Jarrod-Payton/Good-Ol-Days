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
    </div>
  </div>
</template>


<script>
export default {
  props: {
    collab: { type: Object, required: true }
  },
  setup() {
    return {}
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
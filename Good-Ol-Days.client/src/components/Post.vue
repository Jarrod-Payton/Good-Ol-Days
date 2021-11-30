<template>
  <div class="card">
    <div class="card-img">
      <img :src="post.imgUrl" alt="post image" />
    </div>
    <div class="card-body">
      {{ post.title }}
    </div>
  </div>
</template>
<script>
export default {
  props: { post: { type: Object, required: true } },
  setup(props) { },
};
</script>
<style scoped>
</style>
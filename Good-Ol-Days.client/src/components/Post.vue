<template>
  <div class="polaroid">
    <img class="image border border-dark" :src="post.imgUrl" />
    <div class="caption sharpie">{{ post.title }}</div>
  </div>
</template>
<script>
export default {
  props: { post: { type: Object, required: true } },
  setup(props) { },
};
</script>
<style scoped>
@font-face {
  font-family: "MyWebFont";
  src: url("../assets/fonts/Stickynotes-ywLPd.otf") format("woff");
}
.sharpie {
  font-family: "MyWebFont";
}

.polaroid {
  background: #fff;
  padding: 1rem;
  box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
}
.polaroid > img {
  max-width: auto;
  height: 30vh;
  object-fit: cover;
}
.caption {
  font-size: 1.8rem;
  text-align: center;
  line-height: 2em;
}
.item {
  width: 100%;
  display: inline-block;
  margin-top: 2rem;
}
.item .polaroid:before {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.35s;
}

.image {
  height: 30vh;
  width: 100%;
  object-fit: cover;
}
@media only screen and (max-width: 500px) {
  .image {
    height: 15vh !important;
    width: 100%;
    object-fit: cover;
  }
  .polaroid {
    background: #fff;
    padding-left: 0.5rem;
    padding-top: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 0;

    box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
  }
  .caption {
    font-size: 1.2rem;
    text-align: center;
    padding: 0.05rem;
  }
}
</style>
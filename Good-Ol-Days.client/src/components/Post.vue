<template>
  <div class="polaroid">
    <img
      v-if="post.type.includes('video')"
      class="video border-dark"
      src="src\assets\img\videoicon.png"
    />
    <img v-else class="image border border-dark" :src="post.imgUrl" />
    <div>
      <div class="caption sharpie">{{ post.title }}</div>
      <div v-if="post.challengeId" class="stamp stampPosition is-approved">
        Challenge
      </div>
      <div
        v-if="post.type.includes('video')"
        class="stampVideo stampVideoPosition is-approvedVideo"
      >
        Video
      </div>
    </div>
  </div>
</template>
<script>
import { momentService } from '../services/MomentService'
import { logger } from '../utils/Logger';
export default {
  props: { post: { type: Object, required: true } },
  setup(props) {
    return {
      getTimeAgo() {
        try {
          logger.log('CreatedAt', props.post.createdAt)
          const timeAgo = momentService.date(props.post.createdAt)
          return timeAgo
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
};
</script>
<style scoped>
.stampPosition {
  position: absolute;
  bottom: 20px;
  right: 5px;
}
.stampVideoPosition {
  position: absolute;
  bottom: 15px;
  left: 5px;
}
.stamp {
  transform: rotate(12deg);
  color: #555;
  font-size: 1rem;
  font-weight: 700;
  border: 0.25rem solid #555;
  display: inline-block;
  padding: 0.25rem 1rem;
  text-transform: uppercase;
  border-radius: 3rem;
  font-family: "Courier";
  -webkit-mask-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png");
  -webkit-mask-size: 944px 604px;
  mix-blend-mode: multiply;
}
.is-approved {
  color: #1db13dc5;
  border: 0.5rem solid #23b8435b;
  -webkit-mask-position: 13rem 6rem;
  transform: rotate(-18deg);
  border-radius: 0;
}
.stampVideo {
  transform: rotate(-9deg);
  color: #555;
  font-size: 1rem;
  font-weight: 700;
  border: 0.25rem solid #555;
  display: inline-block;
  padding: 0.25rem 1rem;
  text-transform: uppercase;
  border-radius: 3rem;
  font-family: "Courier";
  -webkit-mask-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png");
  -webkit-mask-size: 944px 604px;
  mix-blend-mode: multiply;
}
.is-approvedVideo {
  color: #952dc55b;
  border: 0.5rem solid #952dc55b;
  -webkit-mask-position: 13rem 6rem;
  transform: rotate(9deg);
  border-radius: 0;
}
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
.video {
  height: 30vh;
  width: 100%;
  background-color: rgb(46, 46, 46);
  object-fit: fill;
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
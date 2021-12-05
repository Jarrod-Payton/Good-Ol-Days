<template>
  <!--Whenever you open up an album this is the page you are routed to-->
  <div class="row mt-md-5 mt-2 m-0 p-0">
    <!--Checks to see your role on this page in order to determine your interaction ability and view of the challenge-->
    <div
      class="col-md-6 order-md-2 p-0"
      v-if="
        (activeAlbum.hasChallenges &&
          user.isAuthenticated &&
          collabThisAlbum.find(
            (c) => c.accountId === account.id && c.verified
          )) ||
        (account.id === activeAlbum.creatorId && activeAlbum.hasChallenges)
      "
    >
      <!--Shows the challenge-->
      <Challenge />
    </div>
    <div class="col-md-6 order-md-1">
      <div class="row">
        <!--Divided all posts into two sets of posts in order to keep the challenge on the right hand side even if there no posts made yet (We were stumped on how to do this for quite a while, so thank you to one of our instructors Mick Shannahan for coming up with this brilliant method)-->
        <div class="col-6 rotationanim" v-for="p in posts1" :key="p.id">
          <div
            @click="setActive(p.id)"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#picture-modal"
            class="item selectable1"
          >
            <Post :post="p" />
          </div>
        </div>
      </div>
    </div>
    <!--Second half of our split posts-->
    <div
      class="col-6 col-md-3 rotationanim order-md-3"
      v-for="p in splicedPosts"
      :key="p.id"
    >
      <div
        @click="setActive(p.id)"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#picture-modal"
        class="item selectable1"
      >
        <Post :post="p" />
      </div>
    </div>
    <!--Our modal for the sharing of the album-->
    <ShareAlbumModal :activeAlbum="activeAlbum" />
  </div>
</template>
<script>
import { computed, ref } from "@vue/reactivity";
import { AppState } from "../AppState";
import { onMounted, watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { albumService } from "../services/AlbumService";
import { postService } from "../services/PostService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { challengeService } from "../services/ChallengeService";
import { collaboratorService } from "../services/CollaboratorService";
export default {
  props: {
    user: { type: Object }
  },
  setup(props) {
    // A ref to be used to split the posts
    const splicedPosts = ref([])
    // The router to be able to grab the album Id off of the url
    const route = useRoute();
    watchEffect(() => {
      //We needed this variable because the WatchEffect runs this set of functions whenever any aspect of this data gets adjusted but for whatever reason just setting the variable equal to it and then changing that variable actually changed the AppState as a whole so it would just re run and re run the functions over and over so thank you to one of our assistant instructors Justin Carpenter for coming up with this amazing fix
      splicedPosts.value = [...AppState.posts]
      splicedPosts.value = splicedPosts.value.splice(2, AppState.posts.length)

    })
    onMounted(async () => {
      try {
        //Sets the active album in the AppState
        await albumService.setActiveAlbum(route.params.albumId);
        //Checks if they are authenticated so that if they are not then they will not get the challenges
        if (props.user.isAuthenticated) {
          //Grabs the challenges using the active album in the AppState
          await challengeService.getChallenges()
        }
        //Grabs the posts for this album by using the album id in the url
        await postService.getPosts(route.params.albumId)
      } catch (error) {
        Pop.toast(error);
      }
    });
    watchEffect(async () => {
      try {
        if (props.user.isAuthenticated && route.params.albumId) {
          await collaboratorService.getCollabThisAlbum(route.params.albumId)
        }
      } catch (error) {
        Pop.toast(error);
      }
    });
    return {
      splicedPosts,
      posts1: computed(() => AppState.posts.slice(0, 2)),
      activeAlbum: computed(() => AppState.activeAlbum),
      activeChallenge: computed(() => AppState.activeChallenge),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      collabThisAlbum: computed(() => AppState.collabThisAlbum),
      setActive(id) {
        //Sets the clicked on post to the active post in the AppState
        postService.setActive(id)
      }
    };

  },
};
</script>
<style scoped>
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
.rotationanim:nth-of-type(4n + 1) .item {
  transform: scale(0.8, 0.8) rotate(7deg);
  transition: all 0.35s;
}
.rotationanim:nth-of-type(4n + 1) .item .polaroid:before {
  transform: rotate(6deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  right: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0, 0, 0, 0.4);
}
.rotationanim:nth-of-type(4n + 2) .item {
  transform: scale(0.8, 0.8) rotate(-5deg);
  transition: all 0.35s;
}
.rotationanim:nth-of-type(4n + 2) .item .polaroid:before {
  transform: rotate(-6deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  left: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0, 0, 0, 0.4);
}
.rotationanim:nth-of-type(4n + 4) .item {
  transform: scale(0.8, 0.8) rotate(3deg);
  transition: all 0.35s;
}
.rotationanim:nth-of-type(4n + 4) .item .polaroid:before {
  transform: rotate(4deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  right: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0, 0, 0, 0.3);
}
.rotationanim:nth-of-type(4n + 3) .item {
  transform: scale(0.8, 0.8) rotate(-3deg);
  transition: all 0.35s;
}
.rotationanim:nth-of-type(4n + 3) .item .polaroid:before {
  transform: rotate(-4deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  left: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0, 0, 0, 0.3);
}
.rotationanim:hover .item {
  filter: none;
  transform: scale(1, 1) rotate(0deg) !important;
  transition: all 0.35s;
}
.rotationanim:hover .item .polaroid:before {
  content: "";
  position: absolute;
  z-index: -1;
  transform: rotate(0deg);
  height: 90%;
  width: 90%;
  bottom: 0%;
  right: 5%;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.2);
  transition: all 0.35s;
}
</style>
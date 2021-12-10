<template>
  <!--Whenever you open up an album this is the page you are routed to-->
  <div class="row mt-2 m-0 p-0">
    <div class="col-12 heightDownload">
      <div class="row m-0">
        <div class="col-12 p-0 ps-md-2 mb-md-0 mb-2">
          <div class="d-flex justify-content-start">
            <div class="dropdown">
              <button
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                class="btn dropdown-toggle btn-primary text-white sort"
              >
                Sort By
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a
                    class="dropdown-item dropdown-item-text"
                    @click="sort('oldest')"
                    >Oldest</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item dropdown-item-text"
                    @click="sort('mostRecent')"
                    >Most Recent</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item dropdown-item-text"
                    @click="sort('aToZ')"
                    >A-Z</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item dropdown-item-text"
                    @click="sort('zToA')"
                    >Z-A</a
                  >
                </li>
                <li v-if="activeAlbum.hasChallenges">
                  <a
                    class="dropdown-item dropdown-item-text"
                    @click="sort('challenges')"
                    >Challenges</a
                  >
                </li>
              </ul>
            </div>
            <button
              class="btn btn-primary text-white elevation-3 ms-4 downloadMode"
              @click="downloadMode"
              title="Download"
            >
              <span v-if="!downloading">
                <i class="mdi mdi-download downloadIcon"></i>
              </span>
              <span v-else>
                <i class="mdi mdi-close closeIcon"></i>
              </span>
            </button>
            <Chatbox :album="activeAlbum" />s
            <button
              title="download selected images"
              class="btn btn-primary text-white elevation-3 downloadImages ms-4"
              @click="downloadImages"
              v-if="downloading"
            >
              Download Images
            </button>
          </div>
        </div>
      </div>
    </div>
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
      <div class="row" v-if="posts.length > 0">
        <!--Divided all posts into two sets of posts in order to keep the challenge on the right hand side even if there no posts made yet (We were stumped on how to do this for quite a while, so thank you to one of our instructors Mick Shannahan for coming up with this brilliant method)-->
        <div class="col-6 rotationanim" v-for="p in posts1" :key="p.id">
          <div
            @click="setActive(p.id)"
            type="button"
            data-bs-toggle="modal"
            :data-bs-target="
              p.type.includes('video') ? '#video-modal' : '#picture-modal'
            "
            :class="
              downloading && !que.find((elem) => elem.id === p.id)
                ? 'item disabled'
                : 'item selectable1'
            "
          >
            <Post :post="p" />
          </div>
          <button
            title="add to download"
            :id="p.id + 'dlBtn'"
            :class="
              !que.find((elem) => elem.id === p.id)
                ? 'btn btn-success text-white elevation-3 elevation-3'
                : 'btn btn-primary text-white elevation-3 elevation-3'
            "
            @click="addToQue(p)"
            v-if="downloading"
          >
            <span v-if="!que.find((elem) => elem.id === p.id)">
              <i class="mdi mdi-download downloadIcon"></i>
            </span>
            <span v-else>
              <i class="mdi mdi-close"></i>
            </span>
          </button>
        </div>
      </div>
      <div
        v-if="posts.length === 0 && doneSyncing"
        class="row justify-content-center"
      >
        <div class="col-11 card cardmessage">
          <p class="message m-0 p-1">
            Add a picture and start creating memories!
          </p>
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
        title="add to download"
        @click="setActive(p.id)"
        type="button"
        data-bs-toggle="modal"
        :data-bs-target="
          p.type.includes('video') ? '#video-modal' : '#picture-modal'
        "
        :class="
          downloading && !que.find((elem) => elem.id === p.id)
            ? 'item disabled'
            : 'item selectable1'
        "
      >
        <Post :post="p" />
      </div>
      <button
        title="add to download"
        :id="p.id + 'dlBtn'"
        :class="
          !que.find((elem) => elem.id === p.id)
            ? 'btn btn-success text-white elevation-3 mb-1'
            : 'btn btn-primary text-white elevation-3'
        "
        @click="addToQue(p)"
        v-if="downloading"
      >
        <span v-if="!que.find((elem) => elem.id === p.id)">
          <i class="mdi mdi-download downloadIcon"></i>
        </span>
        <span v-else>
          <i class="mdi mdi-close closeIcon"></i>
        </span>
      </button>
    </div>
    <!--Our modal for the sharing of the album-->
  </div>

  <ShareAlbumModal :activeAlbum="activeAlbum" />
</template>
<script>
import { computed, ref } from "@vue/reactivity";
import { AppState } from "../AppState";
import { onMounted, watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { albumService } from "../services/AlbumService";
import { postService } from "../services/PostService";
import { logger } from "../utils/Logger";
import { challengeService } from "../services/ChallengeService";
import { collaboratorService } from "../services/CollaboratorService";
import { firebaseService } from '../services/FirebaseService';
import { Modal } from "bootstrap";
import { resetService } from "../services/ResetService";
import { socketService } from '../services/SocketService';

export default {


  setup() {
    const generalSort = ref('')
    //ref used to toggle download mode
    const downloading = ref(false)
    const que = ref([])
    document.title = "Good Ol' Days | Album"
    const user = computed(() => AppState.user)
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
        socketService.joinAlbumRoom(route.params.albumId)
        await albumService.getMessages(route.params.albumId)
        //Sets the active album in the AppState
        await albumService.setActiveAlbum(route.params.albumId);
        //Checks if they are authenticated so that if they are not then they will not get the challenges
        if (user.isAuthenticated) {
          //Grabs the challenges using the active album in the AppState
          await challengeService.getChallenges()
        }
        //Grabs the posts for this album by using the album id in the url
        await postService.getPosts(route.params.albumId)
      } catch (error) {
        logger.error(error);
      }
    });
    watchEffect(async () => {
      try {
        if (user.isAuthenticated && route.params.albumId) {
          await collaboratorService.getCollabThisAlbum(route.params.albumId)
        }
      } catch (error) {
        logger.error(error);
      }
    });
    return {
      que,
      downloading,
      splicedPosts,
      generalSort,
      posts1: computed(() => AppState.posts.slice(0, 2)),
      activeAlbum: computed(() => AppState.activeAlbum),
      activeChallenge: computed(() => AppState.activeChallenge),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      collabThisAlbum: computed(() => AppState.collabThisAlbum),
      posts: computed(() => AppState.posts),
      doneSyncing: computed(() => AppState.doneSyncing),
      activePost: computed(() => AppState.activePost),

      setActive(id) {
        //Sets the clicked on post to the active post in the AppState
        postService.setActive(id)
        resetService.openPhotoModal()
      },
      downloadMode() {
        downloading.value = !downloading.value
      },
      addToQue(post) {
        if (!que.value.find(p => p.id === post.id)) {
          que.value.push(post)
        } else {
          que.value = que.value.filter(p => p.id !== post.id)

        }
      },
      async downloadImages() {
        try {

          await firebaseService.downloadFirebase(que.value, this.activeAlbum.title)
        } catch (error) {
          logger.error(error)
        }
      },
      sort(type) {
        postService.sort(type)
      }
    };

  },
};
</script>
<style scoped>
.heightDownload {
  height: 4.5vh;
  margin: 0;
}
.closeIcon {
  font-size: 2vh;
}
.downloadImages {
  font-size: 1.6vh;
}
.downloadMode {
  padding-left: 1vh;
  padding-right: 1vh;
  padding-bottom: 0vh;
  padding-top: 0vh;
  height: 3.8vh;
}
.downloadIcon {
  font-size: 2vh;
}
.sort {
  font-size: 1.6vh;
}
.dropdown-item-text {
  font-size: 1.75vh;
  font-family: "Saira Condensed", sans-serif;
}
.cardmessage {
  border-color: #9964cc;
  border-width: 4px;
  background-color: rgba(245, 245, 245, 0.781);
}
.message {
  font-size: 5vh;
  color: rgb(90, 90, 90);
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
@media only screen and (max-width: 500px) {
  .heightDownload {
    height: 4.5vh;
    margin: 0;
  }
  .closeIcon {
    font-size: 1.6vh;
  }
  .downloadImages {
    font-size: 1.3vh;
  }
  .downloadMode {
    padding-left: 1vh;
    padding-right: 1vh;
    padding-bottom: 0vh;
    padding-top: 0vh;
    height: 3.5vh;
  }
  .downloadIcon {
    font-size: 1.3vh;
  }
  .sort {
    font-size: 1.3vh;
  }
  .message {
    font-size: 2.4vh;
    color: rgb(90, 90, 90);
  }
  .cardmessage {
    margin-top: 3vh;
  }
  .dropdown-item-text {
    font-size: 1.35vh;
  }
}
</style>
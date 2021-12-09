<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center">
    <div class="card cardspec">
      <div class="d-flex justify-content-between">
        <div class="p-4">
          <p class="titles">Your Albums:</p>
        </div>
        <div class="desktop">
          <button
            @click="hasTour"
            id="v-step-0"
            class="btn buttonscss elevation-3 v-step-this"
            data-bs-toggle="modal"
            data-bs-target="#createAlbumModal"
          >
            <i class="mdi mdi-18px mdi-plus-circle me-1"></i> Add Album
          </button>
        </div>
      </div>
      <!-- ALBUMS GO HERE v  -->
      <div class="row" v-if="myAlbums.length > 0">
        <Album v-for="a in myAlbums" :key="a.id" :album="a" />
      </div>
      <div class="row" v-else>
        <div>
          <div class="ms-5">
            <p class="addalbumstart">Add an album to start!</p>
          </div>
        </div>
      </div>
      <div class="media text-center mb-3">
        <button
          data-bs-toggle="modal"
          data-bs-target="#createAlbumModal"
          class="btn buttonscss elevation-3"
        >
          <i class="me-1 mdi-18px mdi mdi-plus-circle"></i> Add Album
        </button>
      </div>
      <!-- ALBUMS GO HERE ^  -->
    </div>
    <div v-if="collaborators.length > 0" class="card cardspec pb-4 mb-4">
      <div class="d-flex justify-content-between">
        <div class="p-4">
          <p class="titles">Your Group Albums:</p>
        </div>
        <div class="desktop"></div>
      </div>
      <!-- GROUP ALBUMS GO HERE v  -->
      <div
        class="d-flex justify-content-center align-items-center flex-column"
        v-for="c in collaborators"
        :key="c.albumId"
      >
        <div
          v-if="c.verified"
          @click="routerLink(c.albumId)"
          class="card selectable cardgroupalbum grow2 mb-3"
        >
          <p class="gpalbumtitle">{{ c.albumTitle }}</p>
        </div>
      </div>
      <!-- GROUP ALBUMS GO HERE ^ -->
    </div>
  </div>
  <CreateAlbumModal />
  <div class="d-flex justify-content-center">
    <div class="footer">
      <div>
        <div class="d-flex align-items-center">
          <img class="img-fluid1" src="../assets/img/logo2.png" alt="" />
          <div>
            <button id="aboutinfo" @click="routeAbout" class="btn p-0">
              <p class="m-0 about">About</p>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!account.hasTour">
      <Tour />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from "@vue/runtime-core"
import { albumService } from "../services/AlbumService"
import { collaboratorService } from "../services/CollaboratorService"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { resetService } from "../services/ResetService"
import { useRoute, useRouter } from "vue-router"
import { notificationService } from "../services/NotificationService"
import { accountService } from "../services/AccountService"
export default {
  name: 'Home',
  setup() {
    document.title = "Good Ol' Days | Home"
    const route = useRoute()
    const router = useRouter()
    watchEffect(async () => {
      if (AppState.account.name) {
        await notificationService.getMyNotifications()
      }
    })
    onMounted(async () => {
      await albumService.getMyAlbums()
      await collaboratorService.getAllMyCollabAlbums()
      resetService.resetUtil()
    })
    return {
      router,
      route,
      myAlbums: computed(() => AppState.myAlbums),
      collaborators: computed(() => AppState.collaborators),
      account: computed(() => AppState.account),
      routerLink(albumId) {
        router.push({
          name: "Album",
          params: { albumId: albumId }
        })
      },
      async hasTour() {
        try {
          if (!this.account.hasTour) {
            await accountService.hasTour()
          }
        } catch (error) {
          logger.error(error)
        }
      },
      routeAbout() {
        router.push('About')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.addalbumstart {
  font-size: 3.5vh;
  color: #5c5c5c;
  font-style: italic;
  margin-bottom: 10vh;
  margin-top: 4vh;
}
.eachone {
  width: 100%;
}
.cardspec {
  margin-top: 3vh;
  width: 99%;
  min-height: 20vh;
  border-width: 5px;
  border-radius: 0;
  border-color: #1e90ff;
  background-color: rgba(245, 245, 245, 0.842);
}
.titles {
  font-size: 5vh;
  margin-left: 2vh;
  margin-bottom: 0;
}
.buttonscss {
  background-color: #4ac26d;
  margin-top: 2vh;
  margin-right: 3vh;
  color: white;
  font-size: 2.2vh;
  font-family: "Saira Condensed", sans-serif;
  letter-spacing: 0.4px;
}
.picalbum {
  height: 20vh;
}
.albumname {
  margin-top: 0.5vh;
  font-size: 3vh;
}
.grow {
  transition: all 0.2s ease-in-out;
}

.grow:hover {
  transform: scale(1.1);
}
.grow2 {
  transition: all 0.2s ease-in-out;
}

.grow2:hover {
  transform: scale(1.01);
}
.cardgroupalbum {
  width: 85%;
  height: 5vh;
  border-width: 3px;
  border-radius: 0;
  background-color: rgb(243, 243, 243);
  border-color: #36a7d7;
}
.gpalbumtitle {
  margin-left: 3vh;
  font-size: 3vh;
}
.media {
  display: none;
}
.desktop {
  display: block;
}
.footer {
  height: 8vh;
  width: 99%;
  border-top-width: 5px;
  border-left-width: 5px;
  border-right-width: 5px;
  border-bottom-width: 5px;
  border-style: solid;
  border-color: #9964cc;
  background-color: rgba(255, 255, 255, 0.842);
  margin-bottom: 2px;
}
.img-fluid1 {
  height: 6vh;
  margin-top: 4px;
}
.about {
  padding-top: 4px;
  border-style: solid;
  border-color: #9964cc;
  border-top: 0ch;
  border-left: 0ch;
  border-right: 0ch;
  border-width: 2px;
}
.home {
  min-height: 70vh;
}
@media only screen and (max-width: 500px) {
  .footer {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .media {
    display: block;
  }
  .desktop {
    display: none;
  }
  .buttonscss {
    background-color: #4ac26d;
    margin-top: 2vh;
    margin-right: 2vh;
    color: white;
    font-size: 2vh;
    font-family: "Saira Condensed", sans-serif;
    letter-spacing: 0.4px;
  }
  .titles {
    font-size: 3vh;
    margin-left: 2vh;
  }
  .picalbum {
    height: 12vh;
  }
  .albumname {
    margin-top: 0.5vh;
    font-size: 2vh;
  }
  .gpalbumtitle {
    margin-left: 1vh;
    font-size: 3vh;
  }
  .margindesk {
    margin-bottom: 0vh;
  }
  .addalbumstart {
    margin-bottom: 6vh;
    margin-top: 3vh;
    font-size: 3vh;
    margin-left: 2vh;
  }
}
</style>

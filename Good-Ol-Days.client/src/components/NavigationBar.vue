<template>
  <!-- NavBar when on Desktop View v  -->
  <div class="NavigationBar desktop col-12" v-show="route.name !== 'Landing'">
    <div
      class="
        card
        cardspec
        d-md-flex
        flex-md-row
        justify-content-md-between
        align-items-md-center
      "
    >
      <div class="d-flex">
        <router-link :to="{ name: 'Home' }">
          <img
            @click="clear"
            width="230"
            class="img-fluid"
            src="../assets/img/logo2w.png"
            alt=""
          />
        </router-link>
        <div class="ms-3">
          <button
            @click="routeAbout"
            title="About Page"
            class="btn about elevation-3"
          >
            <i class="mdi ms-1 mdi-shimmer"></i> About
          </button>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <div>
          <!-- Components set to each Page and condition v  -->
          <!--  -->
          <!-- Condition set to only show at the HomePage checking if the route is Home page or About page-->
          <NavHome v-if="route.name === 'Home' || route.name === 'About'" />
          <!--  -->
          <!-- Condition set to only show at AlbumPage and only if album is private checking if there's an ActiveAlbum, if the album is private and if the route is 'Album' -->
          <NavAlbum
            v-if="
              route.name === 'Album' &&
              activeAlbum.id &&
              !collabThisAlbum[0]?.verified
            "
          />
          <!--  -->
          <!-- Condition set to only show at AlbumPage and only if album is shared checking if user account match one of the collaborators of that album and it is verified or if the user account matches the creator of that album and there's at least one collaborator verified  -->
          <NavGroupAlbum
            v-if="
              (collabThisAlbum.find(
                (c) => c.accountId === account.id && c.verified
              ) &&
                route.name === 'Album') ||
              (activeAlbum.creatorId === account.id &&
                collabThisAlbum.find((c) => c.verified) &&
                route.name === 'Album')
            "
          />
          <!--  -->
          <!-- Condition set to only show at AlbumPage and only if the user account isn't a collaborator of this Album -->
          <div
            v-if="
              !collabThisAlbum.find((c) => c.accountId === account.id) &&
              route.name !== 'Home' &&
              activeAlbum.creatorId !== account.id &&
              route.name !== 'About'
            "
          >
            <NavJoin :user="user" />
          </div>
          <!--  -->
          <!-- Condition set to show "Request Pending" checking if the user account is a collaborator and isn't verified -->
          <div
            v-if="
              collabThisAlbum.find(
                (c) => c.accountId === account.id && !c.verified
              ) && activeAlbum.creatorId !== account.id
            "
          >
            <button
              title="Request pending"
              class="btn share disabled elevation-3"
            >
              <i class="mdi ms-1 mdi-18px mdi-account-arrow-right-outline"></i>
              Pending request to join
            </button>
          </div>
          <!--  -->
          <!-- Components set to each Page and condition ^  -->
        </div>
        <div class="me-4" v-if="user.isAuthenticated">
          <p class="m-0 f-14 text-end">{{ account.name }}</p>
          <p class="m-0 text-end">{{ account.email }}</p>
          <p @click="logout" class="m-0 logout selectable1 text-end">
            Logout <i class="mdi mdi-call-missed"></i>
          </p>
        </div>
        <img
          v-if="user.isAuthenticated"
          data-bs-toggle="offcanvas"
          href="#offcanvasExample"
          role="button"
          class="me-2 profile-picture border"
          height="85"
          width="90"
          :src="account.picture"
          alt="Profile Picture"
        />
      </div>
    </div>
    <!-- NavBar when on Desktop View ^  -->
  </div>
  <!-- NavBar when on Mobile View v  -->
  <div class="NavigationBar mobile col-12 p-0">
    <div class="card cardspec">
      <div class="d-flex justify-content-center">
        <router-link :to="{ name: 'Home' }">
          <img
            @click="clear"
            width="230"
            class="img-fluid"
            src="../assets/img/logo2w.png"
            alt=""
          />
        </router-link>
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <div>
          <!-- Components set to each Page and condition v  -->
          <!--  -->
          <!-- Condition set to only show at the HomePage checking if there is an ActiveAlbum and GroupAlbum open -->
          <NavHome v-if="!activeAlbum.id && !collabThisAlbum[0]?.name" />
          <!--  -->
          <!-- Condition set to only show at AlbumPage and only if album is private checking if there's an ActiveAlbum and if the album is private -->
          <NavAlbum v-if="activeAlbum.id && !collabThisAlbum[0]?.verified" />
          <!--  -->
          <!-- Condition set to only show at AlbumPage and only if album is shared checking if user account match one of the collaborators of that album and it is verified or if the user account matches the creator of that album and there's at least one collaborator verified  -->
          <NavGroupAlbum
            v-if="
              collabThisAlbum.find(
                (c) => c.accountId === account.id && c.verified
              ) ||
              (activeAlbum.creatorId === account.id &&
                collabThisAlbum.find((c) => c.verified))
            "
          />
          <!--  -->
          <!-- Condition set to only show at AlbumPage and only if the user account isn't a collaborator of this Album -->
          <div
            v-if="
              !collabThisAlbum.find((c) => c.accountId === account.id) &&
              route.name !== 'Home' &&
              activeAlbum.creatorId !== account.id &&
              route.name !== 'About'
            "
          >
            <NavJoin :user="user" />
          </div>
          <!--  -->
          <!-- Condition set to show "Request Pending" checking if the user account is a collaborator and isn't verified -->
          <div
            v-if="
              collabThisAlbum.find(
                (c) => c.accountId === account.id && !c.verified
              ) && activeAlbum.creatorId !== account.id
            "
          >
            <button
              title="Request pending"
              class="btn share disabled elevation-3"
            >
              <i class="mdi ms-1 mdi-18px mdi-account-arrow-right-outline"></i>
              Pending request to join
            </button>
          </div>
          <!--  -->
          <!-- Components set to each Page and condition ^  -->
        </div>
        <div class="me-3 ms-3" v-if="user.isAuthenticated">
          <p class="m-0 f-14 text-end textmobile">{{ account.name }}</p>
          <p class="m-0 text-end textmobile">{{ account.email }}</p>
          <p @click="logout" class="m-0 logout selectable1 text-end">
            Logout <i class="mdi mdi-call-missed"></i>
          </p>
        </div>
        <img
          v-if="user.isAuthenticated"
          data-bs-toggle="offcanvas"
          href="#offcanvasExample"
          role="button"
          class="me-2 profile-picture border"
          height="60"
          width="62"
          :src="account.picture"
          alt=""
        />
      </div>
    </div>
    <!-- NavBar when on Mobile View ^  -->
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { AuthService } from "../services/AuthService"
import { useRoute, useRouter } from "vue-router"
import { albumService } from "../services/AlbumService"
import { watchEffect } from "@vue/runtime-core"
import { collaboratorService } from "../services/CollaboratorService"
import Pop from "../utils/Pop"
export default {
  props: {
    user: { type: Object }
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
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
      route,
      router,
      route: computed(() => route),
      activeAlbum: computed(() => AppState.activeAlbum),
      collabThisAlbum: computed(() => AppState.collabThisAlbum),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      clear() {
        albumService.clear()
      },
      routeAbout() {
        router.push('About')
      }
    }
  }
}

</script>


<style lang="scss" scoped>
.share {
  background-color: #9964cc;
  color: rgb(255, 255, 255);
  font-family: "Saira Condensed", sans-serif;
  padding: 3px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 4vh;
  margin-bottom: 2vh;
}
.about {
  background-color: #9964cc;
  color: rgb(255, 255, 255);
  font-family: "Saira Condensed", sans-serif;
  padding: 2px;
  padding-left: 3px;
  padding-right: 6px;
  margin-right: 4vh;
  margin-bottom: 2vh;
  font-size: 1.7vh;
}
.cardspec {
  border-radius: 0;
  border-width: 4px !important;
  border-color: #9964cc !important;
  margin-top: 2.5vh;
  margin-left: 1vh;
  margin-right: 1vh;
  padding: 1vh;
}
.profile-picture {
  object-fit: cover;
  border-width: 1px !important;
  border-color: #9964cc !important;
}
.logout {
  color: #36a7d7;
  margin-top: 7px !important;
}

.desktop {
  display: block;
}
.mobile {
  display: none;
}
.btn:focus {
  outline: none;
  box-shadow: none;
}
@media only screen and (max-width: 500px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: block;
  }
  .profile-picture {
    object-fit: cover;
    border-width: 2px !important;
    border-color: #9964cc !important;
  }
  .textmobile {
    font-size: 14px !important;
  }
  .logout {
    margin-top: 2px !important;
    font-size: 14px !important;
  }
  .notifications {
    padding: 3px;
    padding-left: 8px;
    padding-right: 8px;
    margin-right: 2vh;
    margin-left: 2vh;
  }
  .cardspec {
    margin-top: 0vh;
    margin-left: 0vh;
    margin-right: 0vh;
    padding: 1vh;
  }
}
</style>

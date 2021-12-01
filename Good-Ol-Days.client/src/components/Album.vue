<template>
  <!-- <router-link :to="{ name: 'Album', params: { albumId: album.id } }"> -->
  <div
    class="
      col-6 col-md-3
      d-flex
      justify-content-center
      flex-column
      align-items-center
      selectable1
      mb-2
    "
    @click="routerLink"
  >
    <div>
      <img
        class="img-fluid picalbum eachone grow"
        src="../assets/img/albumpic.png"
        alt=""
      />
    </div>
    <div>
      <p class="albumname">{{ album.title }}</p>
    </div>
  </div>
  <!-- </router-link> -->
</template>
<script>
import { useRouter } from "vue-router"
export default {
  props: { album: { type: Object, required: true } },
  setup(props) {
    const router = useRouter()
    return {
      routerLink() {
        router.push({
          name: "Album",
          params: { albumId: props.album.id }
        })
      }
    }
  },
}
</script>
<style scoped>
.cardspec {
  margin-top: 3vh;
  width: 99%;
  min-height: 20vh;
  border-width: 5px;
  border-radius: 0;
  border-color: #36a7d7;
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
.margindesk {
  margin-bottom: 2vh;
}
@media only screen and (max-width: 500px) {
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
}
</style>
<template>
  <div class="about col-12 d-flex justify-content-center align-items-center">
    <div class="card cardspec d-flex flex-md-row">
      <div class="col-12 col-md-4 d-flex justify-content-center">
        <img class="img-fluid mt-2" src="../assets/img/landing.png" alt="" />
      </div>
      <div class="col-12 col-md-8 desktop">
        <div class="col-12 cardpics d-md-flex mt-3">
          <div
            class="col-12 col-md-4 cardsheight d-flex justify-content-center"
          >
            <div class="card1 elevation-3 grow"></div>
          </div>
          <div class="col-12 col-md-4">
            <div class="card2 elevation-3 grow"></div>
          </div>
          <div class="col-12 col-md-4">
            <div class="card3 elevation-3 grow"></div>
          </div>
        </div>
        <div class="col-12 cardpics d-md-flex justify-content-center">
          <div class="col-12 col-md-4">
            <div class="card4 elevation-3 grow"></div>
          </div>
          <div class="col-12 col-md-4">
            <div class="card5 elevation-3 grow"></div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8 mobile">
        <div class="cardpics d-md-flex mt-3">
          <div class="col-md-4 cardsheight d-flex justify-content-center">
            <div class="card1 elevation-3 grow"></div>
          </div>
          <div class="col-md-4 cardsheight d-flex justify-content-center">
            <div class="card2 elevation-3 grow"></div>
          </div>
          <div class="col-md-4 cardsheight d-flex justify-content-center">
            <div class="card3 elevation-3 grow"></div>
          </div>

          <div class="col-md-4 cardsheight d-flex justify-content-center">
            <div class="card4 elevation-3 grow"></div>
          </div>
          <div class="col-md-4 cardsheight d-flex justify-content-center">
            <div class="card5 elevation-3 grow"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>
<style lang="scss" scoped>
.cardspec {
  height: 70vh;
  width: 80%;
  border-width: 5px;
  border-radius: 0;
  border-color: #9964cc;
  background-color: rgba(245, 245, 245, 0.794);
}
.about {
  height: 82vh;
}
.wrapper {
  width: 100%;
  padding: 0 2rem;
  text-align: center;
}

.cardpics {
  height: 34vh;
}
.img-fluid {
  height: 35vh;
}
.card1 {
  height: 30vh;
  width: 90%;
  background-color: rgb(241, 241, 241);
  transform: rotate(-6deg);
}
.card2 {
  height: 30vh;
  width: 90%;
  background-color: rgb(241, 241, 241);
  transform: rotate(3deg);
}
.card3 {
  height: 30vh;
  width: 90%;
  background-color: rgb(241, 241, 241);
  transform: rotate(-3deg);
}
.card4 {
  height: 30vh;
  width: 90%;
  background-color: rgb(241, 241, 241);
  transform: rotate(6deg);
}
.card5 {
  height: 30vh;
  width: 90%;
  background-color: rgb(241, 241, 241);
  transform: rotate(-6deg);
}
.cardsheight {
  height: 100%;
}
.grow:hover {
  transition: all 0.2s ease-in-out;
  transform: scale(1.2);
  z-index: 5;
}

.desktop {
  display: block;
}
.mobile {
  display: none;
}
@media only screen and (max-width: 500px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: block;
  }
  .cardspec {
    width: 100%;
    height: 160vh;
  }
  .about {
    padding: 0;
  }
  .card1 {
    height: 25vh;
    width: 70%;
    background-color: rgb(241, 241, 241);
    transform: rotate(-6deg);
  }
  .card2 {
    height: 25vh;
    width: 70%;
    background-color: rgb(241, 241, 241);
    transform: rotate(3deg);
  }
  .card3 {
    height: 25vh;
    width: 70%;
    background-color: rgb(241, 241, 241);
    transform: rotate(-3deg);
  }
  .card4 {
    height: 25vh;
    width: 70%;
    background-color: rgb(241, 241, 241);
    transform: rotate(6deg);
  }
  .card5 {
    height: 25vh;
    width: 70%;
    background-color: rgb(241, 241, 241);
    transform: rotate(-6deg);
  }
  .about {
    height: 170vh;
  }
  .cardsheight {
    height: auto;
  }
  .img-fluid {
    height: 25vh;
  }
}
</style>

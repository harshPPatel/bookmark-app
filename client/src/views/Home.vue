<template>
  <div class="home">
    <div class="u_container">
      <div class="col">
        <h1>Your Bookmarks<span class="u-primary">.</span></h1>
        <p class="kicker">
          Book<span class="u-bold u-primary">Mark</span> is a simple tool made for you to store your important links safely.
          Fill data, click 'Add Bookmark' Button and That's It! Your website is Book Marked!
        </p>
        <router-link class="u-btn u-btn-primary" :to="{ name: 'signup' }">Get Started</router-link>
      </div>
      <div class="col">
        <img src="../assets/welcome-image.png" alt="App Preview Image">
      </div>
    </div>
    <footer>
      <p>
        Made with 💓.
        <a href="https://github.com/harshPPatel/bookmark-app" target="_blank"> GitHub Repo</a>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'home',
};
</script>

<style lang="scss" scoped>
.home {
  z-index: 1;
  &::after {
    display: block;
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background: url('../assets/home-bg.svg') right center no-repeat;
    background-size: contain;

    @media (max-width: 568px) {
      display: none;
    }
  }
  .u_container {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-top: 90px;

    @media (max-width: 868px) and (min-width: 568px) {
      .col:first-of-type {
        width: 100%;
      }
      .col:last-of-type {
        display: none;
      }
    }

    @media (max-width: 568px) {
      flex-direction: column;
      margin-top: 24px;

      .col {
        width: 100%!important;

        &:last-of-type {
          margin-top: 40px;
          img {
            width: 100%;
          }
        }
      }
    }

    .col {
      width: 50%;
    }

    h1 {
      padding-top: 24px;
      margin-bottom: 0;

      @media (max-width: 568px) {
        margin-top: 0;
      }
    }

    .kicker {
      max-width: 400px;
      color: rgba(#2E2E2E, 0.75);
      margin-bottom: 24px;
      @media (max-width: 568px) {
        max-width: initial;
        width: 100%;
      }
    }
  }
}

footer {
  position: fixed;
  bottom: 0px;
  right: 24px;
  font-weight: 700;
  font-style: italic;
  transition: all 0.2s ease;
  opacity: 0.65;

  &:hover {
    opacity: 1;
  }

  a {
    color: #2E2E2E;
  }
}
</style>

<script lang="ts" setup>

// const tourCardsData = [
//   {
//     cover: new URL('@/assets/img/cards/card-1.png', import.meta.url).href,
//     title: 'Тур к каменной реке',
//     list: [
//       { label: '16 000$ / чел', icon: 'franklin' },
//       { label: '3 дня', icon: 'time' }
//     ],
//     toLink: { name: 'tour' }
//   },
// ]

</script>

<template>
  <section class="links">
    <AppContainer>
      <div class="link-item">
        <router-link to="/not-found" class="link-item__title">3RD DROP</router-link>
        <div class="link-item__aside">
          <div class="link-item__number">03</div>
          <ul class="link-item__menu-list">
            <li class="link-item__menu-list-item">COMING SOON</li>
            <li class="link-item__menu-list-item">
              <router-link to="/lore/1" class="link-item__menu-list-link">DROP LORE</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="link-item">
        <router-link to="/drop/2" class="link-item__title">2ND DROP</router-link>
        <div class="link-item__aside">
          <div class="link-item__number">02</div>
          <ul class="link-item__menu-list">
            <li class="link-item__menu-list-item">Sold out</li>
          </ul>
        </div>
      </div>
      <div class="link-item">
        <router-link to="/drop/1" class="link-item__title">1ST DROP</router-link>
        <div class="link-item__aside">
          <div class="link-item__number">01</div>
          <ul class="link-item__menu-list">
            <li class="link-item__menu-list-item">Sold out</li>
          </ul>
        </div>
      </div>
    </AppContainer>
  </section>
  
  
  
</template>

<style lang="scss" scoped>
.links {
  padding-bottom: 180px;
}
.link-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 185px 0;
  border-bottom: 2px solid #B4BBC7;

  @media (max-width: 767px) {
    padding: 39px 16px 49px;
    margin: 0 -16px;
  }

  &__title {
    color: #86868A;
    font-family: 'SF Pro Display';
    font-size: 112px;
    font-weight: 700;
    line-height: 1;

    @media (max-width: 767px) {
      font-size: 37px;
    }
  }

  &__aside {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding-right: 150px;
    height: 100%;

    @media (max-width: 767px) {
      padding-right: 0;
    }
  }

  &__number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    left: unset;
    right: 20px;
    transform: translateY(-50%);

    color: rgba(134, 134, 138, 0.03);
    font-family: SF Pro Display;
    font-size: 380px;
    font-weight: 700;
    line-height: 1;
    text-transform: uppercase;
    pointer-events: none;

    @media (max-width: 767px) {
      display: none;
    }
  }

  &__menu-list-item {
    margin-bottom: 35px;
    cursor: default;

    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: 767px) {
      margin-bottom: 10px;
    }
  }

  &__menu-list-item,
  &__menu-list-link {
    color: #969EAB;
    text-align: right;
    font-family: Montserrat;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;

    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
}
</style>
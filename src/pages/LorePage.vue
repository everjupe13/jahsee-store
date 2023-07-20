<script lang="ts" setup>

</script>

<template>
  <section class="main">
    <AppContainer>
      <div class="main__grid">
        <div class="main__header">
          <div class="main__header-wrapper">
            <h1 class="outlined-text main__title" style="--stroke-width: 2px">DROP LORE</h1>
            <h2 class="outlined-text main__subtitle">Solana Flipper</h2>
          </div>
        </div>
        <div class="main__body">
          <div class="main__body-glass">
            <img src="@/assets/img/lore/solana.png" class="main__body-img">
          </div>
          <div class="main__body-text">
            We present you a T-shirt that will echo your rhythm of life in the world of cryptocurrencies. "SOLANA FLIPPER" - red letters on a black canvas, personifying the harmony of adrenaline and calculation, speed and attentiveness. This T-shirt is for those who inhale the rhythm of the Solana blockchain, those who play to the rhythm of the rapidly changing pulse of the crypto market.
            <br><br>
            Like a dark sky before dawn, the black background of the T-shirt is filled with anticipation of a new day in the cryptocurrency market. The red inscription "SOLANA FLIPPER" symbolizes the sunrise, new opportunities and a passionate passion for innovation.
            <br><br>
            The T-shirt is designed for those who live among numbers, charts and volatility, but for whom it is more than just a business or hobby. This is a lifestyle, this is the breath of the Web 3 era. And every time you put on this T-shirt, you declare to the world: "I'M SOLANA FLIPPER. I dance among the numbers and earn on the waves of the crypto ocean."
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped>
.main {

  &__grid {
    padding-top: 60px;

    display: flex;
    column-gap: 50px;
  }

  &__header {
    position: relative;

    flex-basis: 135px;
    flex-grow: 0;
    flex-shrink: 0;

    width: 135px;
  }

  &__header-wrapper {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    width: max-content;
    padding-bottom: 5px;
    border-bottom: 2px solid #D9D9D9;

    transform: rotate(-90deg) translateX(-100%);
    transform-origin: top left;
  }

  &__title {
    font-family: 'Poppins';
    font-size: 96px;
    font-style: normal;
    font-weight: 700;
    line-height: 1;
    text-transform: uppercase;
  }

  &__subtitle {
    font-family: 'Poppins';
    font-size: 35px;
    font-style: normal;
    font-weight: 700;
    line-height: 1;
    text-transform: uppercase;
  }

  &__body {
    display: flex;
    column-gap: 40px;

    padding-top: 35px;
  }

  &__body-glass {
    flex-shrink: 0;
    max-width: 450px;
    width: 100%;
  }

  &__body-text {
    color: #969EAB;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.38;
    text-transform: uppercase;
  }
}
</style>
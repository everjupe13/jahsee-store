<script lang="ts" setup>
import {
  SocialDiscordIcon,
  SocialInstagramIcon,
  SocialTelegramIcon,
  SocialVkIcon,
  SocialXIcon
} from '@/components/icons'
</script>

<template>
  <footer class="footer">
    <AppContainer>
      <div class="tw-flex tw-items-center tw-justify-center tw-mb-20">
        <p class="footer__text">Contacts</p>
      </div>

      <div class="tw-flex tw-items-center tw-justify-center tw-gap-x-20 tw-mb-40">
        <a href="/" class="footer__link-icon">
          <SocialTelegramIcon class="footer__icon" />
        </a>
        <a href="/" class="footer__link-icon">
          <SocialInstagramIcon class="footer__icon" />
        </a>
        <a href="/" class="footer__link-icon">
          <SocialVkIcon class="footer__icon" />
        </a>
        <a href="/" class="footer__link-icon">
          <SocialXIcon class="footer__icon" />
        </a>
        <a href="/" class="footer__link-icon">
          <SocialDiscordIcon class="footer__icon" />
        </a>
      </div>

      <div class="tw-flex tw-items-center tw-justify-center">
        <a href="/" class="footer__text footer__link">SUPPORT</a>
      </div>
    </AppContainer>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 50px 0;

  &__text {
    font-family: Helvetica Now Display, Arial, Helvetica, sans-serif;
  
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.64px;
    text-transform: uppercase;
  }

  &__link {
    text-decoration: underline;
    text-underline-offset: 2px;

    transition: all .4s ease;

    &:hover, &:focus, &:active {
      text-underline-offset: 6px;
    }
  }

  &__link-icon {
    padding: 5px 3px;
  }

  &__icon {
    width: 30px;

    fill: #969EAB;
    transition: all .3s ease;

    &:hover {
      fill: #fff;
    }
  }
}
</style>
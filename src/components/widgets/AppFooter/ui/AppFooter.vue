<script lang="ts" setup>
import {
  SocialDiscordIcon,
  SocialInstagramIcon,
  SocialTelegramIcon,
  SocialVkIcon,
  SocialXIcon
} from '@/components/shared/icons'

import { SOCIAL_LINKS } from '../model'
</script>

<template>
  <footer class="mt-auto flex items-center py-50">
    <AppContainer>
      <div class="group mx-auto max-w-[500px]">
        <div class="mb-10 flex items-center justify-center md:mb-10">
          <p class="text">Contacts</p>
        </div>

        <div class="origin-top scale-75 transition-all group-hover:scale-100">
          <div class="mb-20 flex items-center justify-center gap-x-20 md:mb-30">
            <a
              :href="SOCIAL_LINKS.TELEGRAM"
              target="_blank"
              rel="norefferer nofollow noopener"
              class="px-3 py-5"
            >
              <SocialTelegramIcon
                class="h-30 w-30 fill-[#969eab] transition-colors hover:fill-white"
              />
            </a>
            <a
              :href="SOCIAL_LINKS.INSTAGRAM"
              target="_blank"
              rel="norefferer nofollow noopener"
              class="px-3 py-5"
            >
              <SocialInstagramIcon
                class="h-30 w-30 fill-[#969eab] transition-colors hover:fill-white"
              />
            </a>
            <a
              :href="SOCIAL_LINKS.VK"
              target="_blank"
              rel="norefferer nofollow noopener"
              class="px-3 py-5"
            >
              <SocialVkIcon
                class="h-30 w-30 fill-[#969eab] transition-colors hover:fill-white"
              />
            </a>
            <a
              :href="SOCIAL_LINKS.X"
              target="_blank"
              rel="norefferer nofollow noopener"
              class="px-3 py-5"
            >
              <SocialXIcon
                class="h-30 w-30 fill-[#969eab] transition-colors hover:fill-white"
              />
            </a>
            <a
              :href="SOCIAL_LINKS.DISCORD"
              target="_blank"
              rel="norefferer nofollow noopener"
              class="px-3 py-5"
            >
              <SocialDiscordIcon
                class="h-30 w-30 fill-[#969eab] transition-colors hover:fill-white"
              />
            </a>
          </div>

          <div
            class="flex translate-y-[-20px] items-center justify-center transition-all group-hover:translate-y-0"
          >
            <a href="/" class="text text-link">SUPPORT</a>
          </div>
        </div>
      </div>
    </AppContainer>
  </footer>
</template>

<style lang="scss" scoped>
.text {
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.64px;
  text-transform: uppercase;

  @apply font-hnd;
}

.text-link {
  text-decoration: underline;
  text-underline-offset: 2px;

  transition: all 0.4s ease;

  &:hover,
  &:focus,
  &:active {
    text-underline-offset: 6px;
  }
}
</style>

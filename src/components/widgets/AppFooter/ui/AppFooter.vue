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
      <div class="mx-auto max-w-[500px]">
        <div class="mb-10 flex items-center justify-center md:mb-10">
          <p class="text">Contacts</p>
        </div>

        <div class="origin-top transition-all">
          <div class="mb-20 flex items-center justify-center gap-x-20 lg:mb-30">
            <a
              :href="SOCIAL_LINKS.TELEGRAM"
              target="_blank"
              rel="norefferer nofollow noopener"
              class="group/icon px-3 py-5"
            >
              <SocialTelegramIcon
                class="h-23 w-23 fill-[#969eab] transition-colors group-hover/icon:fill-white lg:h-30 lg:w-30"
              />
            </a>
            <a
              :href="SOCIAL_LINKS.INSTAGRAM"
              target="_blank"
              rel="norefferer nofollow noopener"
              class="group/icon px-3 py-5"
            >
              <SocialInstagramIcon
                class="h-23 w-23 fill-[#969eab] transition-colors group-hover/icon:fill-white lg:h-30 lg:w-30"
              />
            </a>
            <a
              :href="SOCIAL_LINKS.VK"
              target="_blank"
              rel="norefferer nofollow noopener"
              class="group/icon px-3 py-5"
            >
              <SocialVkIcon
                class="h-23 w-23 fill-[#969eab] transition-colors group-hover/icon:fill-white lg:h-30 lg:w-30"
              />
            </a>
            <a
              :href="SOCIAL_LINKS.X"
              target="_blank"
              rel="norefferer nofollow noopener"
              class="group/icon px-3 py-5"
            >
              <SocialXIcon
                class="h-23 w-23 fill-[#969eab] transition-colors group-hover/icon:fill-white lg:h-30 lg:w-30"
              />
            </a>
            <a
              :href="SOCIAL_LINKS.DISCORD"
              target="_blank"
              rel="norefferer nofollow noopener"
              class="group/icon px-3 py-5"
            >
              <SocialDiscordIcon
                class="h-23 w-23 fill-[#969eab] transition-colors group-hover/icon:fill-white lg:h-30 lg:w-30"
              />
            </a>
          </div>

          <div
            class="flex flex-col items-center justify-center gap-10 transition-all"
          >
            <a
              :href="SOCIAL_LINKS.SUPPORT"
              target="_blank"
              class="text text-link"
            >
              SUPPORT
            </a>
            <RouterLink
              to="/delivery-info"
              class="text text-link min-w-[80px] text-center"
            >
              FAQ
            </RouterLink>
            <RouterLink
              to="/privacy"
              class="text text-link min-w-[80px] text-center"
            >
              PRIVACY
            </RouterLink>
            <RouterLink
              to="/confident"
              class="text text-link min-w-[80px] text-center"
            >
              CONFIDENT
            </RouterLink>
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

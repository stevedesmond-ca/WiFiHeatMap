<template>
  <figure :class="{'full': !fading, 'fading': fading }">
    <wifi-icon :color="color"></wifi-icon>
    <figcaption v-if="signal">{{signal}} dBm</figcaption>
    <figcaption v-else>(no signal)</figcaption>
  </figure>
</template>

<script lang="ts">
  import wifi_icon from './wifi-icon.vue';
  import ColorConverter from './ColorConverter';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: {
      'wifi-icon': wifi_icon
    },
    props: {
      signal: Number,
      last_updated: String
    },
    data(): object {
      return {
        fading: false
      };
    },
    computed: {
      color(): string {
        return this.signal != null
          ? ColorConverter.toColor(this.signal).toRGBA()
          : 'rgba(0, 0, 0, 0.5)';
      }
    },
    watch: {
      async last_updated() {
        this.fading = false;
        await this.$nextTick();
        await new Promise((resolve) => setTimeout(() => { this.fading = true; resolve(); }, 100));
      }
    }
  });
</script>

<style scoped>
  figure {
    width: 5rem;
    padding: 0.5rem;
  }

  figcaption {
    text-align: center;
  }

  .fading {
    opacity: 0.5;
    transition-delay: 1s;
    transition-duration: 5s;
  }

  .full {
    opacity: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
</style>
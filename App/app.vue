<template>
  <div class="app">
    <status :status="connection_status"></status>
    <header-menu :last_updated="last_updated"></header-menu>
    <main-area :enabled="!connection_status"></main-area>
    <debug-panel />
  </div>
</template>

<script lang="ts">
  import Status from './status.vue';
  import HeaderMenu from './header-menu.vue';
  import MainArea from './main-area.vue';
  import DebugPanel from './debug-panel.vue';
  import SharedState from "./SharedState";
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: {
      'status': Status,
      'header-menu': HeaderMenu,
      'main-area': MainArea,
      'debug-panel': DebugPanel
    },
    inject: {
      signal_service_factory: "signal_service",
      renderer_factory: "renderer",
    },
    data: () => SharedState,
    computed: {
      connection_status(): string {
        return this.signal_service != null
          ? this.signal_service.status
          : '(loading...)'
      },
      last_updated(): string {
        return this.signal_service != null
          ? this.signal_service.last_updated
          : '';
      }
    },
    mounted(): void {
      const canvas = document.getElementById("webglcanvas") as HTMLCanvasElement;
      this.signal_service = this.signal_service_factory(this.current.signals);
      this.renderer = this.renderer_factory(canvas);
    },
    watch: {
      selected(): void {
        if (this.selected != null)
          this.renderer?.render(this.readings, this.selected);
        else
          this.renderer?.clear();
      }
    }
  });
</script>

<style scoped>
  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
</style>

<template>
  <main>
    <div
      class="background"
      :style="{ 'background-image': `url(${state.background})` }"
      :class="{ pixelated: state.pixelated }"
    ></div>
    <canvas id="webglcanvas" @click="add($event)" :disabled="!enabled"></canvas>
    <data-point
      v-for="(reading, index) in state.readings"
      :key="index"
      :index="index"
      :reading="reading"
      :selected="state.selected"
    ></data-point>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DataPoint from "./data-point.vue";
import Point from "./Point";
import Reading from "./Reading";
import SharedState from "./SharedState";

export default defineComponent({
  components: {
    "data-point": DataPoint,
  },
  props: {
    enabled: Boolean
  },
  data: () => ({
    state: SharedState
  }),
  mounted(): void {
    const canvas = document.getElementById("webglcanvas") as HTMLCanvasElement;
    if (canvas != null) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
    window.addEventListener("resize", this.refresh);
  },
  methods: {
    add(e: MouseEvent): void {
      if (!this.enabled) return;

      const location = new Point(e.offsetX, e.offsetY);
      const reading = new Reading(
        this.state.readings.length,
        location,
        this.state.current.signals.concat()
      );
      this.state.readings.push(reading);
      this.refresh();
    },
    refresh(): void {
      this.state.renderer?.render(this.state.readings, this.state.selected);
    },
  },
});
</script>

<style>
main {
  flex-grow: 1;
  position: relative;
  overflow-x: hidden;
}

div.background,
canvas {
  position: absolute;
  width: 100%;
  height: 100%;
}

div.background {
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

canvas:not([disabled]) {
  cursor: pointer;
}

.pixelated {
  image-rendering: crisp-edges;
  image-rendering: pixelated;
}
</style>
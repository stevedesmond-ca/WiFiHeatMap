<template>
  <form>
    <label for="background-file">Background</label>
    <input
      type="file"
      id="background-file"
      @change="state.setBackground($event.target.files)"
    />

    <label>
      <input type="checkbox" id="pixelate" v-model="state.pixelated" />
      Pixelate
    </label>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SharedState from "./SharedState";

export default defineComponent({
  data: () => ({
    state: SharedState,
  }),
});
</script>
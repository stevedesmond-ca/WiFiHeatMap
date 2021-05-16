<template>
  <aside class="debug" v-show="state.debug">
    <table>
      <thead>
      <tr>
        <th></th>
        <th>SSID</th>
        <th>Frequency</th>
        <th>MAC</th>
        <th>Strength</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="state.current.signals.length === 0">
        <td colspan="5">(no signals found)</td>
      </tr>
      <tr v-for="signal in signals_by_strength" :key="signal.ssid + signal.mac">
        <td :style="{ 'background-color': signal.color().toRGBA() }"></td>
        <td>{{ signal.ssid }}</td>
        <td>{{ signal.frequency }} GHz</td>
        <td>{{ signal.mac }}</td>
        <td>{{ signal.strength }} dBm</td>
      </tr>
      </tbody>
    </table>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Signal from './Signal';
import SharedState from "./SharedState";

export default defineComponent({
  data: () => ({
    state: SharedState
  }),
  computed: {
    signals_by_strength(): Signal[] {
      const signals = this.state.current.signals.slice() as Signal[];
      return signals.sort((s1, s2) => s1.strength < s2.strength ? 1
          : s1.strength > s2.strength ? -1
              : s1.ssid < s2.ssid ? 1 : 0);
    }
  }
});
</script>

<style scoped>
aside.debug {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  margin: 1rem;
  padding: 1rem;
  max-height: calc(100vh - 10rem);
  overflow-y: scroll;
  background-color: rgba(255, 255, 255, 0.75);
  border: 2px solid black;
  box-shadow: 0 0 1rem 1rem rgba(0, 0, 0, 0.5);
}

table th:first-child,
table td:first-child {
  width: 1rem;
}
</style>
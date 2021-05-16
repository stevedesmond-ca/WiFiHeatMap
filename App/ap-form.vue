<template>
  <form>
    <label for="access-point">Access Point</label>
    <section class="access-point">
      <select id="access-point" v-model="state.selected">
        <option disabled value="" v-if="access_points.length === 0">(no signals found)</option>
        <option v-for="ap in access_points" :key="ap.label()" :value="ap">
          {{ap.label()}}
        </option>
      </select>
    </section>

    <label>
      <input type="checkbox" id="group-by-ssid" v-model="state.group_by.ssid" @change="state.group_by.update()">
      Group by SSID
    </label>

    <label>
      <input type="checkbox" id="group-by-frequency" v-model="state.group_by.frequency" :disabled="!state.group_by.ssid" />
      Combine 2.4 + 5 GHz
    </label>
  </form>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import AccessPoint from './AccessPoint';
  import SharedState from "./SharedState";

  export default defineComponent({
    data: () => ({
      state: SharedState,
    }),
    computed: {
      access_points(): AccessPoint[] {
        return this.state.current.signals.map(signal =>
          new AccessPoint(signal.ssid,
            this.state.group_by.frequency ? null : signal.frequency,
            this.state.group_by.ssid ? null : signal.mac)
        ).sort((ap1, ap2) =>
          ap1.label() > ap2.label() ? 1
            : ap1.label() < ap2.label() ? -1
              : 0)
          .filter((ap, index, array) => array.map(a => a.label()).indexOf(ap.label()) === index);
      }
    }
  });
</script>
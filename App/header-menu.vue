<template>
  <header>
    <wifi-status :signal="current_signal" :last_updated="last_updated"></wifi-status>
    <ap-form></ap-form>
    <background-form></background-form>
    <actions></actions>
  </header>
</template>

<script lang="ts">
  import APForm from './ap-form.vue';
  import BackgroundForm from './background-form.vue';
  import WiFiStatus from './wifi-status.vue';
  import Actions from './actions.vue';
  import SharedState from "./SharedState";
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: {
      'ap-form': APForm,
      'background-form': BackgroundForm,
      'wifi-status': WiFiStatus,
      'actions': Actions
    },
    props: {
      last_updated: String
    },
    data: () => ({
      state: SharedState
    }),
    computed: {
      current_signal(): number | null {
        return this.state.current.signalFor(this.state.selected);
      }
    }
  });
</script>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    margin-bottom: 0.5rem;
  }

  header > * {
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
  }
</style>
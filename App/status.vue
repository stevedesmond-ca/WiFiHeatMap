<template>
  <div class="status" v-if="status">
    <pre>{{status}}</pre>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      status: String
    }
  });
</script>

<style scoped>
  .status {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.25);
  }

  pre {
    padding: 1rem;
    background: white;
    border: 2px solid black;
    border-radius: 0.5rem;
    box-shadow: 0 0 1rem 1rem rgba(0, 0, 0, 0.5);
    max-width: 75%;
    white-space: pre-wrap;
    text-align: center;
  }
</style>
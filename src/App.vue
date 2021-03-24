<template>
  <div class="wrapper">
    <vue-swappable-card>
      <template #content-primary>
        <h1>Front Face A</h1>
        <div class="card-body">
          <img src="https://picsum.photos/seed/abc1/100">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec malesuada ipsum. Morbi sit amet sagittis justo. Praesent non est eu lorem rhoncus scelerisque eget non nisi.</p>
          <p>Nulla sem diam, sollicitudin non metus vel, eleifend congue neque.</p>
        </div>
      </template>
      <template #content-secondary>
        <h1>Back Face A</h1>
        <div class="card-body">
          <img src="https://picsum.photos/seed/cba/100">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec malesuada ipsum. Morbi sit amet sagittis justo. Praesent non est eu lorem rhoncus scelerisque eget non nisi.</p>
          <p>Nulla sem diam, sollicitudin non metus vel, eleifend congue neque.</p>
        </div>
      </template>
    </vue-swappable-card>

    <vue-swappable-card direction="from-top">
      <template #content-primary>
        <h1>Front Face B</h1>
        <div class="card-body">
          <img src="https://picsum.photos/seed/abc1-1/100">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec malesuada ipsum. Morbi sit amet sagittis justo. Praesent non est eu lorem rhoncus scelerisque eget non nisi.</p>
          <p>Nulla sem diam, sollicitudin non metus vel, eleifend congue neque.</p>
        </div>
      </template>
      <template #content-secondary>
        <h1>Back Face B</h1>
        <div class="card-body">
          <img src="https://picsum.photos/seed/cba-1/100">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec malesuada ipsum. Morbi sit amet sagittis justo. Praesent non est eu lorem rhoncus scelerisque eget non nisi.</p>
          <p>Nulla sem diam, sollicitudin non metus vel, eleifend congue neque.</p>
        </div>
      </template>
    </vue-swappable-card>

    <vue-swappable-card direction="from-left">
      <template #content-primary>
        <h1>Front Face C</h1>
        <div class="card-body">
          <img src="https://picsum.photos/seed/abc1-2/100">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec malesuada ipsum. Morbi sit amet sagittis justo. Praesent non est eu lorem rhoncus scelerisque eget non nisi.</p>
          <p>Nulla sem diam, sollicitudin non metus vel, eleifend congue neque.</p>
        </div>
      </template>
      <template #content-secondary>
        <h1>Back Face C</h1>
        <div class="card-body">
          <img src="https://picsum.photos/seed/cba-2/100">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec malesuada ipsum. Morbi sit amet sagittis justo. Praesent non est eu lorem rhoncus scelerisque eget non nisi.</p>
          <p>Nulla sem diam, sollicitudin non metus vel, eleifend congue neque.</p>
        </div>
      </template>
    </vue-swappable-card>

    <vue-swappable-card direction="from-right">
      <template #content-primary>
        <h1>Front Face D</h1>
        <div class="card-body">
          <img src="https://picsum.photos/seed/abc1-3/100">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec malesuada ipsum. Morbi sit amet sagittis justo. Praesent non est eu lorem rhoncus scelerisque eget non nisi.</p>
          <p>Nulla sem diam, sollicitudin non metus vel, eleifend congue neque.</p>
        </div>
      </template>
      <template #content-secondary>
        <h1>Back Face D</h1>
        <div class="card-body">
          <img src="https://picsum.photos/seed/cba-3/100">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec malesuada ipsum. Morbi sit amet sagittis justo. Praesent non est eu lorem rhoncus scelerisque eget non nisi.</p>
          <p>Nulla sem diam, sollicitudin non metus vel, eleifend congue neque.</p>
        </div>
      </template>
    </vue-swappable-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueSwappableCard from '@/components/VueSwappableCard.vue'

export default defineComponent({
  name: 'App',
  components: {
    VueSwappableCard,
  },
})
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap');

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin: 0 auto;
    max-width: 1700px;
    height: 100vh;
  }

  .vsc {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    line-height: 1.5;
    max-width: 380px;
    margin: 180px auto;
    color: #333;
    box-sizing: border-box;

    ::v-deep(.vsc__content) {
      &--primary {
        h1 {
          background-color: darkcyan;
          color: white;
        }
      }

      &--secondary {
        h1 {
          color: #675000;
        }

        &::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: -1;
          background-color: #f4cb36;
          width: 88px;
        }
      }
    }

    h1 {
      margin: 0;
      padding: 12px;
    }

    img {
      float: right;
      border-radius: 4px;
      border: 1px solid #eee;
    }

    p {
      margin: 0;
      padding: 0;

      &:not(:last-of-type) {
        margin-bottom: 12px;
      }
    }

    .card-body {
      padding: 12px;
    }
  }
</style>

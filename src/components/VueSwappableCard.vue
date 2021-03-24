<template>
  <div
    :class="classList"
    class="vsc"
    v-on="eventList"
  >
    <div class="vsc__content vsc__content--primary">
      <slot name="content-primary" />
    </div>
    <div class="vsc__content vsc__content--secondary">
      <slot name="content-secondary" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
} from 'vue'

export default defineComponent({
  name: 'VueCollapsibleCard',
  props: {
    swapped: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: 'from-bottom',
    },
    event: {
      type: String,
      default: 'over',
    },
  },
  setup(props) {
    const isSwapped = ref(props.swapped)

    const swapDirection = computed(() => {
      const validDirections = ['from-top', 'from-right', 'from-bottom', 'from-left']

      return validDirections.includes(props.direction) ? props.direction : validDirections[0]
    })

    const classList = computed(() => ({
      'vsc--swapped': isSwapped.value,
      [`vsc--${swapDirection.value}`]: true,
    }))

    const swapEvent = computed(() => {
      const validEvents = ['over', 'click']

      return validEvents.includes(props.event) ? props.event : validEvents[0]
    })

    const eventList = computed(() => ({
      mouseenter: swapEvent.value === 'over' ? swap : false,
      mouseleave: swapEvent.value === 'over' ? swap : false,
      click: swapEvent.value === 'click' ? swap : false,
    }))

    const swap = () => {
      isSwapped.value = !isSwapped.value
    }

    return {
      classList,
      eventList,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vsc {
    $root: &;

    * {
      box-sizing: border-box;
    }

    position: relative;
    border: 1px solid #eee;
    border-radius: 10px;
    width: 100%;
    overflow: hidden;
    transition: all .3s ease-in-out;

    &:hover {
      box-shadow: #eee 0 0 32px 0;
    }

    &__content {
      height: 100%;
      width: 100%;

      &--primary {
        opacity: 1;
        transition: all .3s ease-in-out;

        #{$root}--swapped & {
          opacity: 0;
          pointer-events: none;
        }
      }

      &--secondary {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        opacity: 0;
        transition: all .3s;
        transition-timing-function: cubic-bezier(.5, .25, 0, 1);

        #{$root}--swapped & {
          opacity: 1;
          pointer-events: auto;
        }

        #{$root}--from-top & {
          transform: translateY(-65%);
        }

        #{$root}--from-bottom & {
          transform: translateY(65%);
        }

        #{$root}--swapped#{$root}--from-top &,
        #{$root}--swapped#{$root}--from-bottom & {
          transform: translateY(0);
        }

        #{$root}--from-left & {
          transform: translateX(-65%);
        }

        #{$root}--from-right & {
          transform: translateX(65%);
        }

        #{$root}--swapped#{$root}--from-left &,
        #{$root}--swapped#{$root}--from-right & {
          transform: translateX(0);
        }
      }
    }
  }
</style>

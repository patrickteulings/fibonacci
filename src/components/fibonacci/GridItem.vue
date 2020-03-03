<template>
  <div class="grid-item" :class="{'highlighted': itemData.highlightme}" @click="handleClick" role="button">
    <div class="grid-item__inner">
      {{ itemData.value }}
    </div>
  </div>
</template>

<script lang="ts">

  export default {
    name: 'GridItem',
    props: {
      itemData: {
        type: Object,
        default: new Object(),
        required: true
      }
    },

    setup (props: any, context: any) {
      const state = {
        itemData: props.itemData
      };

      const handleClick = () => {
        context.emit('clicked', state.itemData);
      };

      return {
        state,
        handleClick
      };
    }
  };
</script>

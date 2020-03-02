<template>
  <div class="grid-item" @click="handleClick" role="button">
    <!-- {{ itemData.row }}
    {{ itemData.column }} -->
    <div class="grid-item__inner">
      {{ itemData.value }}
      <span v-if="itemData.highlightme === true">hoezee</span>
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

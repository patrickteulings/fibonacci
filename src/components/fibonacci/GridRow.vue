<template>
  <div>
    <div class="grid-column-wrapper">
      <grid-item v-for="(item, index) in state.columnItem" :key="index" :itemData="item" @clicked="handleItemClick"/>
    </div>
  </div>
</template>

<script lang="ts">

  // Components
  import GridItem from '@/components/fibonacci/GridItem.vue';

  // Interfaces / Types
  import { IGridItem } from '@/types/GridItem';

  export default {
    name: 'GridRow',

    components: {
      GridItem
    },

    props: {
      rowData: {
        type: Array,
        default: new Array(),
        required: true
      }
    },

    setup (props: any, context: any) {
      const state = {
        columnItem: props.rowData
      };

      const handleItemClick = (itemData: IGridItem): void => {
        context.emit('clicked', itemData);
      };

      return {
        state,
        handleItemClick
      };
    }
  };
</script>

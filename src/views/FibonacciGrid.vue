<template>
  <div>
    <div class="grid-row-wrapper">
      <grid-row class="grid-row" v-for="(item, index) in state.fibonacciMatrix" :key="index" :rowData="item" @clicked="handleClick"/>
    </div>
  </div>
</template>


<script lang="ts">

// Core
import { reactive, computed, onMounted } from '@vue/composition-api';
import { ROWS, COLUMNS } from '@/config/config';

// Components
import GridItem from '@/components/fibonacci/GridItem.vue';
import GridRow from '@/components/fibonacci/GridRow.vue';

// Interfaces / Types
import { IGridItem } from '@/types/GridItem';


export default {
  name: 'DashBoard',

  components: {
    GridItem,
    GridRow
  },

  setup (props: any, context: any ) {
    const state = reactive({
      testValue: 'hoi',
      fibonacciMatrix: new Array(),
      fibonacci: new Array()
    });

    // @TODO when candidate is found, check backwards / upwards as well

    const handleClick = ({row, column, value}: IGridItem): void => {
      // Update all GridItem Values in a Row
      state.fibonacciMatrix[row].map((item: IGridItem, index: number) => {
        item.value += 1;
        item.candidate = state.fibonacci.indexOf(item.value) === -1 ? false : true;
      });

      // Update all GridItem Values in a Column EXCEPT the item we clicked (already updated in above Mapping function)
      state.fibonacciMatrix.map((item: IGridItem[], index: number) => {
        item[column].value = (index !== row) ? item[column].value + 1 : item[column].value + 0;
        item[column].candidate = (state.fibonacci.indexOf(item[column].value) === -1) ? false : true;
      });

      // Let's see if there's an occurrence of the Fibonacci sequece in a Row
      checkForFibonacciOccurrenceInRows();
    };

    const checkForFibonacciOccurrenceInRows = () => {
      state.fibonacciMatrix.map((row: IGridItem[], rowIndex: number) => {
        row.map((item: IGridItem, columnIndex: number) => {
          if (item.candidate === true && columnIndex <= (COLUMNS - 5) && row[columnIndex + 4].candidate === true && row[columnIndex + 4].value > item.value) {
            // We know the starting point is eligable, has at least 4 siblings, and the fourth sibling is eligable as well,
            // and also larger than the the startingpoints value
            // Now lets check the sequence of those items against the fibonacci sequence
            findInFibonacciSequence(row.slice(columnIndex, columnIndex + 5));

            // Other possible checks: Sibling should be greater then 1, if startingpoint.value !== 0 or 1
            // Sibling nr 3 cannot be 1 ( fibonacci 0,1,1,2)
          }
        });
      });
    };

    const findInFibonacciSequence = (gridItemGroup: IGridItem[]) => {
      const destructuredGridItemGroup = gridItemGroup.map(({value}) => value);

      // @TODO SetTimeout seems ugly here...
      state.fibonacci.map((item, index) => {
         if (compareArrays(destructuredGridItemGroup, state.fibonacci.slice(index, index + 5))) {
           console.log('found');
           gridItemGroup.map((gridItem) => gridItem.highlightme = true);
           setTimeout(() => {
             gridItemGroup.map((gridItem) => gridItem.highlightme = false);
           }, 2000);
           return;
         }
      });
    };

    const compareArrays = (array1: number[], array2: number[]): boolean => {
      const arrayLength: number = array1.length;
      const isValidFibonacciSequence: boolean = false;

      for (let i = 0; i < arrayLength; i++) { // number[] is not iterable, why?
        if (array1[i] !== array2[i]) {
          return false;
        }
      }

      return true;
    };

    onMounted(() => {
      // Populate the fibonaccy number
      state.fibonacci = Array.from({ length: 10 }).reduce(
        (acc: number[], val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
        []
      );
      // Create our Array for the FibonacciMatrix (Row > Grid)
      state.fibonacciMatrix = Array.from({length: ROWS}, (rowValue, rowIndex) => Array.from({length: COLUMNS}, (columnValue, columnIndex) => ({ row: rowIndex, column: columnIndex, value: 0, candidate: true, highlightme: false }) ));
    });

    return {
      state,
      handleClick
    };
  }
};
</script>

<template>
  <div class="main">
    <div class="grid-row-wrapper">
      <grid-row class="grid-row" v-for="(item, index) in state.fibonacciMatrix" :key="index" :rowData="item" @clicked="handleClick" />
    </div>
    <div class="grid-column-highlight-wrapper">
      <div class="row-highlighter" v-for="(item, index) in state.fibonacciMatrix" :key="'row-highlighter-' + index" :id="'row-' + index"></div>
    </div>
    <div class="grid-row-highlight-wrapper">
      <div class="column-highlighter" v-for="(item, index) in state.fibonacciMatrix" :key="'column-highlighter-' + index" :id="'column-' + index"></div>
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

// Helpers
import { compareArrays } from '@/helpers/arrayHelper';

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

      // Show a little highlight bar to indicate which Row and Column we affected
      const highlightRow = document.getElementById('row-' + column);
      const highlightColumn = document.getElementById('column-' + row);

      if (highlightRow) highlightRow.classList.add('is-highlighted');
      if (highlightColumn) highlightColumn.classList.add('is-highlighted');

      setTimeout(() => {
        if (highlightRow) highlightRow.classList.remove('is-highlighted');
        if (highlightColumn) highlightColumn.classList.remove('is-highlighted');
      }, 600);

      // Let's see if there's an occurrence of the Fibonacci sequence in a Row or Column
      // Note: Decided not to check for RTL or Updwards / Backwards check, doesn't seem right or an actual Fib. Sequence
      checkForFibonacciOccurrenceInRows();
      checkForFibonacciOccurrenceInColumns();
    };

    const checkForFibonacciOccurrenceInRows = () => {
      state.fibonacciMatrix.map((row: IGridItem[], rowIndex: number) => {
        row.map((item: IGridItem, columnIndex: number) => {
          if (item.candidate === true && columnIndex <= (COLUMNS - 5) && row[columnIndex + 4].candidate === true && row[columnIndex + 4].value > item.value) {
            // We know the starting point is eligable, has at least 4 siblings, and the fourth/last sibling is eligable as well,
            // and also larger than the the startingpoints' value
            // Now let's check the sequence of those items against the fibonacci sequence
            findInFibonacciSequence(row.slice(columnIndex, columnIndex + 5));

            // Other possible checks: Sibling should be greater then 1, if startingpoint.value !== 0 or 1
            // Sibling nr 3 cannot be 1 ( fibonacci 0,1,1,2)
          }
        });
      });
    };

    const checkForFibonacciOccurrenceInColumns = () => {
      state.fibonacciMatrix.map((row: IGridItem[], rowIndex: number) => {
        if (rowIndex <= ROWS - 5) {
          row.map((item: IGridItem, columnIndex: number) => {
            if (item.candidate === true && state.fibonacciMatrix[rowIndex + 4][columnIndex].candidate === true && state.fibonacciMatrix[rowIndex + 4][columnIndex].value > item.value) {
              const candidateArray = new Array();

              for (let i = rowIndex; i < (rowIndex + 5); i++) {
                candidateArray.push(state.fibonacciMatrix[i][columnIndex]);
              }

              findInFibonacciSequence(candidateArray);
            }
          });
        }
      });
    };

    const findInFibonacciSequence = (gridItemGroup: IGridItem[]) => {
      const destructuredGridItemGroup = gridItemGroup.map(({value}) => value);

      // @TODO SetTimeout seems ugly here...
      state.fibonacci.map((item, index) => {
         if (compareArrays(destructuredGridItemGroup, state.fibonacci.slice(index, index + 5))) {
           gridItemGroup.map((gridItem) => gridItem.highlightme = true);
           setTimeout(() => {
             gridItemGroup.map((gridItem) => {
               gridItem.highlightme = false;
               gridItem.value = 0;
              });
           }, 2000);
           return;
         }
      });
    };

    onMounted(() => {
      // Populate the fibonaccy number
      state.fibonacci = Array.from({ length: 10 }).reduce(
        (acc: number[], val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
        []
      );

      // Create our Multidimensional Array  for the FibonacciMatrix (Row > Grid)
      state.fibonacciMatrix = Array.from({length: ROWS}, (rowValue, rowIndex) => Array.from({length: COLUMNS}, (columnValue, columnIndex) => ({ row: rowIndex, column: columnIndex, value: 0, candidate: true, highlightme: false }) ));
    });

    return {
      state,
      handleClick
    };
  }
};
</script>

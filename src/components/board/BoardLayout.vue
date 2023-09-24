<template>
  <div class="row-container" v-for="(row, r) in board" :key="`row${r}`">
    <div class="hex-row">
      <hex-layout v-for="(hex, h) in row" :key="`hex${r}-${h}`" 
        :hex-color=hex.hexColor 
        :hex-border-color="hex.hexBorderColor"
        :token-player="hex.tokenPlayer"
        :token-level-array="hex.tokenLevelArray"
      />
    </div>
  </div>
</template>

<script>
import HexLayout from './HexLayout.vue'

export default {
  components: {
    HexLayout
  },
  data() {
    return {
      board: []
    };
  },
  created() {
    this.board = [
      [
        {
          hexColor: 'red',
          hexBorderColor: 'black',
          tokenPlayer: 1,
          tokenLevelArray: ['red', 'red', 'green']
        },
        {
          hexColor: 'green',
          hexBorderColor: 'black',
          tokenPlayer: 2,
          tokenLevelArray: ['red', 'red', 'green']
        },
        {
          hexColor: 'blue',
          hexBorderColor: 'black',
          tokenPlayer: 1,
          tokenLevelArray: ['red', 'green', 'green']
        }
      ],
      [
        {
          hexColor: 'blue',
          hexBorderColor: 'black',
          tokenPlayer: 1
        },
        {
          hexColor: 'red',
          hexBorderColor: 'black',
          tokenPlayer: 2
        },
        {
          hexColor: 'red',
          hexBorderColor: 'black',
          tokenPlayer: 2
        },
        {
          hexColor: 'green',
          hexBorderColor: 'black',
          tokenPlayer: 1
        }
      ],
      [
        {
          hexColor: 'green',
          hexBorderColor: 'black',
          tokenPlayer: 1,
          tokenLevelArray: ['red', 'green', 'green', 'blue', 'blue', 'yellow']
        },
        {
          hexColor: 'blue',
          hexBorderColor: 'black',
          tokenPlayer: 1
        },
        {
          hexColor: 'green',
          hexBorderColor: 'black',
          tokenPlayer: 1
        },
        {
          hexColor: 'red',
          hexBorderColor: 'black',
          tokenPlayer: 1
        },
        {
          hexColor: 'blue',
          hexBorderColor: 'black',
          tokenPlayer: 2
        }
      ],
      [
        {
          hexColor: 'green',
          hexBorderColor: 'black',
          tokenPlayer: 2
        },
        {
          hexColor: 'red',
          hexBorderColor: 'black',
          tokenPlayer: 2
        },
        {
          hexColor: 'green',
          hexBorderColor: 'black',
          tokenPlayer: 1
        },
        {
          hexColor: 'blue',
          hexBorderColor: 'black',
        }
      ],
      [
        {
          hexColor: 'red',
          hexBorderColor: 'black',
        },
        {
          hexColor: 'blue',
          hexBorderColor: 'black',
        },
        {
          hexColor: 'green',
          hexBorderColor: 'black',
          tokenPlayer: 2,
          tokenLevelArray: ['yellow', 'green', 'green', 'yellow', 'blue', 'yellow']
        }
      ]
    ]
  },
  methods: {

  },
};
</script>

<style scoped>
.row-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.hex-row {
  display: flex;
  gap: 5px;
  margin-bottom: -22px;
}
</style>
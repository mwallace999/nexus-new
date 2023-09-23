<template>
  <div class="row-container" v-for="(row, r) in board" :key="`row${r}`">
    <div class="hex-row">
      <hex-layout v-for="(hex, h) in row" :key="`hex${r}-${h}`" 
        :hex-color=hex.hexColor 
        :hex-border-color="hex.hexBorderColor"
        :token-color="hex.tokenColor"
        :token-border-color="hex.tokenBorderColor"
        :token-level="hex.tokenLevel"
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
          tokenColor: 'blue',
          tokenBorderColor: 'white',
          tokenLevel: '2',
          player: 1
        },
        {
          hexColor: 'green',
          hexBorderColor: 'black',
          tokenColor: 'blue',
          tokenBorderColor: 'white',
          tokenLevel: '2',
          player: 2
        },
        {
          hexColor: 'blue',
          hexBorderColor: 'black',
          tokenColor: 'blue',
          tokenBorderColor: 'white',
          tokenLevel: '2',
          player: 1
        }
      ],
      [
        {
          hexColor: 'blue',
          hexBorderColor: 'black',
          tokenColor: 'blue',
          tokenBorderColor: 'black',
          tokenLevel: '4',
          player: 1
        },
        {
          hexColor: 'red',
          hexBorderColor: 'black',
          tokenColor: 'blue',
          tokenBorderColor: 'black',
          tokenLevel: '1',
          player: 2
        },
        {
          hexColor: 'red',
          hexBorderColor: 'black',
          tokenColor: 'blue',
          tokenBorderColor: 'black',
          tokenLevel: '2',
          player: 2
        },
        {
          hexColor: 'green',
          hexBorderColor: 'black',
          tokenColor: 'blue',
          tokenBorderColor: 'white',
          tokenLevel: '2',
          player: 1
        }
      ],
      [
        {
          hexColor: 'green',
          hexBorderColor: 'black',
          tokenColor: 'blue',
          tokenBorderColor: 'white',
          tokenLevel: '2',
          player: 1,
        },
        {
          hexColor: 'blue',
          hexBorderColor: 'black',
          tokenColor: 'blue',
          tokenBorderColor: 'white',
          tokenLevel: '2',
          player: 1
        },
        {
          hexColor: 'green',
          hexBorderColor: 'black',
          tokenColor: 'red',
          tokenBorderColor: 'black',
          tokenLevel: '2',
          player: 1
        },
        {
          hexColor: 'red',
          hexBorderColor: 'black',
          tokenColor: 'blue',
          tokenBorderColor: 'white',
          tokenLevel: '2',
          player: 1
        },
        {
          hexColor: 'blue',
          hexBorderColor: 'black',
          tokenColor: 'blue',
          tokenBorderColor: 'white',
          tokenLevel: '2',
          player: 2
        }
      ],
      [
        {
          hexColor: 'green',
          hexBorderColor: 'black',
          tokenColor: 'blue',
          tokenBorderColor: 'white',
          tokenLevel: '2',
          player: 2
        },
        {
          hexColor: 'red',
          hexBorderColor: 'black',
          tokenColor: 'blue',
          tokenBorderColor: 'white',
          tokenLevel: '2',
          player: 2
        },
        {
          hexColor: 'green',
          hexBorderColor: 'black',
          tokenColor: 'blue',
          tokenBorderColor: 'white',
          tokenLevel: '2',
          player: 1
        },
        {
          hexColor: 'blue',
          hexBorderColor: 'black',
          tokenColor: 'blue',
          tokenBorderColor: 'white',
          tokenLevel: '2'
        }
      ],
      [
        {
          hexColor: 'red',
          hexBorderColor: 'black',
          tokenColor: 'blue',
          tokenBorderColor: 'white',
          tokenLevel: '2'
        },
        {
          hexColor: 'blue',
          hexBorderColor: 'black',
          tokenColor: 'blue',
          tokenBorderColor: 'white',
          tokenLevel: '2'
        },
        {
          hexColor: 'green',
          hexBorderColor: 'black',
          tokenColor: 'blue',
          tokenBorderColor: 'white',
          tokenLevel: '2'
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
<template>
  <div class="NationalCode">
    <div class="label">
      {{ label }}
    </div>
    <div class="contents">
      <q-input v-model="inputData"
               :placeholder="placeholder"
               :disable="disable"
               :loading="loading"
               :class="{'verified': state === 'verified'}"
               class="NationalCode-input"
               @update:model-value="change($event)" />
      <div v-if="state === 'verified'"
           class="NationalCode-verified-mark">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="23.999"
             viewBox="0 0 24 23.999">
          <g id="check_circle-24px_1_"
             data-name="check_circle-24px (1)"
             transform="translate(0 0)">
            <path id="Path_797"
                  data-name="Path 797"
                  d="M0,0H24V24H0Z"
                  transform="translate(0 0)"
                  fill="none" />
            <path id="Path_798"
                  data-name="Path 798"
                  d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2ZM9.29,16.289,5.7,12.7a1,1,0,0,1,1.41-1.41L10,14.169l6.88-6.879a1,1,0,0,1,1.41,1.41L10.7,16.289a1,1,0,0,1-1.41,0Z"
                  transform="translate(0.001 0)"
                  fill="#10d078" />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NationalCode',
  props: {
    value: {
      default: null,
      type: [String, Number]
    },
    btnClass: {
      default: '',
      type: String
    },
    color: {
      default: 'primary',
      type: String
    },
    label: {
      default: 'کدملی/کد اتباع غیر ایرانی',
      type: String
    },
    placeholder: {
      default: '',
      type: String
    },
    atClick: {
      type: Function,
      default: () => {}
    }
  },
  emits: ['update:value', 'input', 'change'],
  data () {
    return {
      state: 'input-national-code',
      textInput: null,
      updatedFromWatch: false,
      loading: false,
      NationalCode: null,
      inputData: null,
      otpInterval: null,
      otpValue: null,
      message: '',
      otpTimer: 120,
      disable: false
    }
  },
  computed: {
    formatedTimer () {
      const second = this.otpTimer % 60
      const minute = Math.floor(this.otpTimer / 60)

      return minute + ':' + second
    }
  },
  watch: {
    value () {
      if (this.updatedFromWatch) {
        return
      }
      this.inputData = this.value
      this.updateState()
      this.updatedFromWatch = true
    }
  },
  created () {
    this.inputData = this.value
    this.updateState()
  },
  methods: {
    updateState () {
      if (this.inputData !== null && this.inputData.length > 0) {
        this.disable = true
        this.textInput = this.inputData
        this.setState('verified')
        return
      }

      this.NationalCode = this.inputData
    },
    setState (newState) {
      this.state = newState
    },
    change (val) {
      this.$emit('update:value', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.NationalCode {
  .contents {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    position: relative;

    .NationalCode-input {
      width: 100%;
    }

    .NationalCode-verified-mark {
      position: absolute;
      right: 15px;
      bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>

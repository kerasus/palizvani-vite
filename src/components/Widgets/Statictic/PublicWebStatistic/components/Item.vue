<template>
  <div class="item">
    <div class="item-icon">
      <q-icon :name="icon" />
    </div>
    <div class="item-content">
      <div class="item-title">
        {{ title }}
      </div>
      <div class="item-value">
        {{ value }}
        +
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticItem',
  props: {
    title: {
      type: String,
      default: undefined
    },
    value: {
      type: String,
      default: undefined
    },
    icon: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  border-radius: 20px;
  background: #FBF4EA;
  padding: 64px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  .item-icon {
    color: #EAC38A;
    width: 70px;
    .q-icon {
      font-size: 68px;
    }
  }
  .item-content {
    width: 70px;
    .item-title {
      font-size: 18px;
      color: #212121;
      margin-bottom: 24px;
    }
    .item-value {
      font-size: 18px;
      font-weight: bold;
      color: #212121;
    }
  }
}
</style>

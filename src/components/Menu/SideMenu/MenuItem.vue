<template>
  <div v-for="(item , index) in computedMenu"
       :key="index"
       class="menu-item">
    <q-expansion-item v-if="!loading && item.children && item.children.length > 0 && item.show"
                      :header-style="{height:'40px', borderRadius: '14px'}"
                      :label="item.title"
                      :icon="item.icon"
                      :default-opened="item.open"
                      class="side-expansion-list">
      <div class="expansion-body">
        <q-separator dark
                     size="2px"
                     vertical
                     class="vertical-separator" />
        <q-list class="list-expansion">
          <div v-for="(subItem , i) in item.children"
               :key="i">
            <menu-item v-if="subItem.children && subItem.children.length > 0"
                       :items="[subItem]"
                       @item-selected="itemSelected(item)" />
            <q-item v-else
                    v-ripple
                    clickable
                    :to="redirectRoute(subItem)"
                    exact
                    @click="itemSelected(subItem)">
              <q-tooltip v-if="showChildItemTooltip"
                         anchor="top middle"
                         self="bottom middle"
                         :offset="[10, 10]">
                {{ subItem.title }}
              </q-tooltip>
              <q-item-section class="list-child-section">
                <q-item-label lines="1">{{ subItem.title }}</q-item-label>
              </q-item-section>
              <q-badge v-if="subItem.badge"
                       class="badge q-py-xs"
                       align="middle">
                {{subItem.badge}}
              </q-badge>
              <span class="indicator" />
            </q-item>
          </div>
        </q-list>
      </div>
    </q-expansion-item>
    <!--    (item.title === clickedItem.title) || -->
    <q-item v-else-if="!loading && !item.children"
            v-ripple
            clickable
            :to="redirectRoute(item)"
            exact
            @click="itemSelected(item)">
      <q-item-section v-if="item.icon"
                      avatar>
        <q-avatar :icon="item.icon"
                  size="30" />
      </q-item-section>
      <q-item-section>
        {{ item.title }}
      </q-item-section>
    </q-item>
    <q-badge v-if="item.badge"
             align="middle">
      {{item.badge}}
    </q-badge>
    <q-skeleton v-if="loading" />
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menuItemsColor: {
      type: String,
      default: ''
    },
    menu: {
      // ToDO: will be deprecate
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    showChildItemTooltip: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  emits: ['itemSelected', 'update:menu'],
  data () {
    return {
      clickedItem: {
        title: ''
      },
      menuItems: []
    }
  },
  computed: {
    computedMenu: {
      get () {
        if (this.menu.length > 0) {
          return this.menu
        } else {
          return this.items
        }
      },
      set (value) {
        this.menuItems = value
        this.$emit('update:menu', this.menuItems)
      }
    },
    selectedTopic() {
      return this.$store.getters['TripleTitleSet/selectedTopic']
    }
  },
  methods: {
    isActive(item) {
      return (item.title === this.selectedTopic) || (item.title === this.clickedItem.title)
    },
    redirectRoute(item) {
      if (item.tags) {
        return { name: 'Public.Home', query: { 'tags[]': item.tags } }
      } else if (item.href) {
        return { path: item.href }
      } else if (!item.routeName) {
        return undefined
      }
      return { name: item.routeName }
    },
    itemSelected(item) {
      this.clickedItem = item
      this.$emit('itemSelected', item)
      if (!this.redirectRoute(item)) {
        window.location.href = item.externalLink
      }
    },
    inactiveAllItems () {

    }
  }
}
</script>

<style lang="scss" scoped>
.menu-item {
  :deep(.q-expansion-item) {
    .q-item {
      .q-item__section {
        &.q-item__section--avatar {
          min-width: 0;
          padding-right: 13px;
        }
      }
    }
    .q-expansion-item__content {
      //padding-left: 15px;
    }
  }
  :deep(.q-item) {
    &.q-router-link--exact-active {
      background: rgba(91, 122, 95, 0.08);
      position: relative;
      &:before {
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        width: 6px;
        height: 100%;
        background: #5B7A5F;
        border-radius: 0 5px 5px 0;
      }
    }
    .q-item__section {
      &.q-item__section--avatar {
        width: 37px;
        min-width: 37px;
        .q-avatar {
          width: 100%;
        }
      }
    }
  }
}
</style>

<template>
  <q-btn-dropdown v-model="showMenu"
                  flat
                  content-class="megaMenu"
                  :label="data.title"
                  @mouseover="onMouseover"
                  @mouseleave="onMouseleave">
    <div class="row justify-between"
         @mouseover="onMouseover"
         @mouseleave="onMouseleave">
      <div class="col-lg-2 col-md-3 category-items">
        <q-scroll-area class="scroll">
          <div class="q-mb-xs q-mr-md">
            <q-list>
              <div v-for="(item, index) in data.children"
                   :key="index">
                <router-link v-if="item.tags"
                             :to="{ name: 'Public.Home', query: { 'tags[]': item.tags } }">
                  <q-item class="item"
                          :class="{arrow: isSelectedItem(index) }"
                          clickable
                          @mouseover="showData(index)">
                    <q-item-section>
                      {{ item.title }}
                    </q-item-section>
                    <q-badge v-if="item.badge"
                             color="blue"
                             class="badge q-py-xs"
                             align="middle">
                      {{item.badge}}
                    </q-badge>
                    <div class="left-arrow" />
                  </q-item>
                </router-link>
                <router-link v-else-if="item.route.name"
                             :to="{name: item.route.name, params: item.route.params}">
                  <q-item class="item"
                          :class="{arrow: isSelectedItem(index) }"
                          clickable
                          @mouseover="showData(index)">
                    <q-item-section>
                      {{item.title}}
                    </q-item-section>
                    <q-badge v-if="item.badge"
                             color="blue"
                             class="badge q-py-xs"
                             align="middle">
                      {{item.badge}}
                    </q-badge>
                    <div class="left-arrow" />
                  </q-item>
                </router-link>
                <a v-else
                   :href="item.route.externalLink">
                  <q-item class="item"
                          :class="{arrow: isSelectedItem(index) }"
                          clickable
                          @mouseover="showData(index)">
                    <q-item-section>
                      {{item.title}}
                    </q-item-section>
                    <q-badge v-if="item.badge"
                             color="blue"
                             class="badge q-py-xs"
                             align="middle">
                      {{item.badge}}
                    </q-badge>
                    <div class="left-arrow" />
                  </q-item>
                </a>

              </div>
            </q-list>
          </div>
        </q-scroll-area>
      </div>
      <div class="col-lg-10 col-md-9 sub-category-items">
        <div v-for="(item, index) in data.subCategoryItemsCol"
             :key="index">
          <div>
            <div v-if="item.type === 'image'">
              <div v-if="item.selected">
                <router-link v-if="item.route.name"
                             :to="{name: item.route.name, params: item.route.params}">
                  <q-responsive :ratio="1998/553">
                    <q-img :src="item.backgroundImage" />
                  </q-responsive>
                </router-link>
                <a v-else-if="item.route.externalLink"
                   :href="item.route.externalLink">
                  <q-responsive :ratio="1998/553">
                    <q-img :src="item.backgroundImage" />
                  </q-responsive>
                </a>
              </div>
            </div>
            <div v-else-if="item.type === 'text'">
              <div v-if="item.selected"
                   :style="{background: item.backgroundColor}">
                <div class="row">
                  <div v-for="col in item.cols"
                       :key="col"
                       class="col-md-4 text-subtitle1 q-mb-xs">
                    <q-list>
                      <router-link :to="{ name: 'Public.Home', query: { 'tags[]': col.tags } }">
                        <q-item clickable>
                          <q-item-section class="list-title">
                            {{col.title.title}}
                          </q-item-section>
                        </q-item>
                      </router-link>
                      <div v-for="colItem in col.items"
                           :key="colItem">
                        <router-link :to="{ name: 'Public.Home', query: { 'tags[]': colItem.tags } }">
                          <q-item clickable>
                            <q-item-section>
                              {{colItem.title}}
                            </q-item-section>
                          </q-item>
                        </router-link>
                      </div>
                    </q-list>
                  </div>
                </div>

                <div v-if="item.selected"
                     class="magaMenu-photo-container">
                  <q-img :src="item.photo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-btn-dropdown>
</template>

<script>

export default {
  name: 'magaMenu',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      showMenu: false,
      onMouseleaveSetTimeout: null
    }
  },
  methods: {
    isSelectedItem(index) {
      return this.data.subCategoryItemsCol.findIndex(item => item.selected) === index
    },
    onMouseover () {
      this.showMenu = true
      if (window && this.onMouseleaveSetTimeout) {
        window.clearInterval(this.onMouseleaveSetTimeout)
      }
    },
    onMouseleave () {
      this.onMouseleaveSetTimeout = setTimeout(() => {
        this.showMenu = false
      }, 50)
    },
    showData(colIndex) {
      this.data.subCategoryItemsCol.forEach((item, subIndex) => {
        item.selected = colIndex === subIndex
      })
    }
  }
}
</script>

<style scoped lang="scss">
.category-items {
  width: 175px;
  .scroll {
    height: 100%;
  }
  @media screen and (max-width: 1400px) {
    width: 200px;
    .scroll {
      height: 200px;
    }
  }
}
.sub-category-items {
  place-self: center;
}
.item {
  .badge{
    position: absolute;
    top: 13px;
    left: 115px;
    z-index: 100;
    animation: badge 1s infinite;
  }
  @keyframes badge {
    0% {
      -moz-box-shadow:0 0 0 0 rgba(55, 55, 55, 0.68);
      box-shadow:0 0 0 0 rgba(55, 55, 55, 0.68);
    }
    70% {
      -moz-box-shadow:0 0 0 10px rgba(0,0,0,0);
      box-shadow:0 0 0 10px rgba(0,0,0,0);
    }
    100% {
      -moz-box-shadow:0 0 0 0 rgba(0,0,0,0);
      box-shadow:0 0 0 0 rgba(0,0,0,0);
    }
  }
}
.arrow{
  margin-right: 14px;
  transition: border-left 1s;
  z-index: 2;
  font-weight: bold;
  background-color: orange;
  &:after {
    content:'';
    position: absolute;
    left: 145px;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-left: 25px solid orange;
    border-top: 24px solid transparent;
    border-bottom: 24px solid transparent;
    @media screen and (max-width: 1400px){
      left: 170px;
    }
  }
  &:deep(.q-focus-helper) {
    background-color: transparent !important;
  }
}

.list-title{
  font-weight: bold;
}
.magaMenu-photo-container{
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  .megaMenu-svg-title{
    color: white;
    font-weight: bold;
    font-size: 20px;
    position: relative;
    z-index: 1;
    text-align: center;
  }
  .megaMenu-svg{
    width: 100px;
    height: 100px;
    position: absolute;
  }
}
</style>

<style lang="scss">
.megaMenu {
  width: 1060px;
  max-width: 1060px !important;
  left: 360px;
  border-radius: 10px;

  @media screen and (max-width: 1440px){
    max-width: 850px !important;
    width: 850px;
    left: 140px;
  }
}
</style>

<template>
  <div class="feature-card"
       :style="localOptions.style">
    <img class="feature-image"
         :class="{'has-url': localOptions.url}"
         :src="localOptions.image"
         @click="goToUrl">
    <div class="feature-meta">
      <div class="feature-title ellipsis-2-lines">
        <template v-if="localOptions.url">
          <a :href="localOptions.url">
            {{ localOptions.title }}
          </a>
        </template>
        <template v-else>
          {{ localOptions.title }}
        </template>
      </div>
      <div class="feature-description"
           v-html="localOptions.description" />
    </div>
  </div>
</template>

<script>
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'FeatureBox',
  mixins: [mixinPrefetchServerData, mixinWidget],
  data() {
    return {
      defaultOptions: {
        title: null,
        description: null,
        image: null,
        horizontal: true,
        cssHoverEffects: {
          boxShadows: [],
          borderStyle: {
            borderCssString: '',
            borderRadiusCssString: ''
          },
          transition: {
            time: 0
          },
          transform: {
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            skewY: 0,
            translateX: 0,
            translateY: 0
          }
        }
      }
    }
  },
  computed: {
    hoverShadows () {
      const shadows = []
      if (!Array.isArray(this.localOptions.cssHoverEffects?.boxShadows)) {
        return ''
      }
      this.localOptions.cssHoverEffects.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    cssHoverEffectsBorderStyle () {
      const borderCssString = this.localOptions.cssHoverEffects?.borderStyle?.borderCssString ? this.localOptions.cssHoverEffects?.borderStyle?.borderCssString : ''
      const borderRadiusCssString = this.localOptions.cssHoverEffects?.borderStyle?.borderRadiusCssString ? this.localOptions.cssHoverEffects?.borderStyle?.borderRadiusCssString : ''

      return {
        borderCssString,
        borderRadiusCssString
      }
    }
  },
  methods: {
    goToUrl () {
      window.location.href = this.localOptions.url
    }
  }
}
</script>

<style lang="scss" scoped>
$hoverShadows: v-bind('hoverShadows');
$hoverBorder: v-bind('cssHoverEffectsBorderStyle.borderCssString');
$hoverBorderRadius: v-bind('cssHoverEffectsBorderStyle.borderRadiusCssString');
$skewX: v-bind('localOptions.cssHoverEffects.transform.skewX');
$skewY: v-bind('localOptions.cssHoverEffects.transform.skewY');
$rotate: v-bind('localOptions.cssHoverEffects.transform.rotate');
$scaleX: v-bind('localOptions.cssHoverEffects.transform.scaleX');
$scaleY: v-bind('localOptions.cssHoverEffects.transform.scaleY');
$translateX: v-bind('localOptions.cssHoverEffects.transform.translateX');
$translateY: v-bind('localOptions.cssHoverEffects.transform.translateY');
$transitionTime: v-bind('localOptions.cssHoverEffects.transition.time');

.feature-card {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 33px;
  .feature-image {
    width: 215px;
    height: auto;
    border-radius: 20px;
    &.has-url {
      cursor: pointer;
    }
  }
  .feature-meta {
    .feature-title {
      font-size: 18px;
      letter-spacing: 0;
      color: #212121;
    }
    .feature-description {
      font-size: 20px;
      letter-spacing: 0;
      color: #707070;
    }
  }

  &:hover {
    transform: rotate(calc(#{$rotate} * 1deg)) translate(calc(#{$translateX} * 1px), calc(#{$translateY} * 1px)) scale($scaleX, $scaleY) skew(calc(#{$skewX} * 1deg), calc(#{$skewY} * 1deg));
    transition: all calc(#{$transitionTime} * 1s);
    box-shadow: $hoverShadows;
    -webkit-box-shadow: $hoverShadows;
    -moz-box-shadow: $hoverShadows;
    border-radius: $hoverBorderRadius;
    -webkit-border-radius: $hoverBorderRadius;
    -moz-border-radius: $hoverBorderRadius;
    border: $hoverBorder;
  }

  @media screen and (max-width: 800px) {
    flex-flow: column;
  }
}
</style>

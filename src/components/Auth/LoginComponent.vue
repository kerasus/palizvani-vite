<template>
  <template-component>
    <template #body>
      <login-step v-if="step === 'login'"
                  @goToRegisterStep="goToRegisterStep"
                  @goToForgetStep="goToForgetStep" />
      <register-step v-if="step === 'register'"
                     @goToLoginStep="goToLoginStep"
                     @register="onRegister" />
      <forget-step v-if="step === 'forget'"
                   @goToLoginStep="goToLoginStep"
                   @register="onRegister" />
      <information-step v-if="step === 'information'"
                        @goToLoginStep="goToLoginStep" />
    </template>
  </template-component>
</template>

<script>
import LoginStep from 'src/components/Auth/LoginStep.vue'
import ForgetStep from 'src/components/Auth/ForgetStep.vue'
import RegisterStep from 'src/components/Auth/RegisterStep.vue'
import InformationStep from 'src/components/Auth/InformationStep.vue'
import TemplateComponent from 'src/components/Auth/TemplateComponent.vue'

export default {
  name: 'LoginComponent',
  components: { TemplateComponent, LoginStep, RegisterStep, InformationStep, ForgetStep },
  props: {
    redirect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      step: 'login'
    }
  },
  methods: {
    goToRegisterStep () {
      this.step = 'register'
    },
    goToForgetStep () {
      this.step = 'forget'
    },
    goToLoginStep () {
      this.step = 'login'
    },
    onRegister () {
      // console.log('onRegister')
    }
  }
}
</script>

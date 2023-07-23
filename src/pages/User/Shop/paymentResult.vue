<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
export default {
  name: 'PaymentResult',
  data () {
    return {
      pageConfig: {},
      pageBuilderEditable: false,
      pageBuilderLoading: false,
      currenSections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'ShopPaymentResult'
                      }
                    ]
                  }
                ],
                options: {
                  boxed: true
                }
              }
            ]
          }
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>

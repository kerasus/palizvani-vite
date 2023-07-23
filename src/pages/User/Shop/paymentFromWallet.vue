<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
                  :loading="pageBuilderLoading" />
</template>

<script>
export default {
  name: 'PaymentFromWallet',
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
                        name: 'ShopPaymentFromWallet'
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

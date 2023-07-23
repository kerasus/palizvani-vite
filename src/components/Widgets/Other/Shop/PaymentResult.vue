<template>
  <div class="PaymentResult">
    <q-card class="PaymentResult-card">
      <div class="PaymentResult-icon">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="51.811"
             height="51.811"
             viewBox="0 0 51.811 51.811">
          <g id="check_circle-24px_1_"
             data-name="check_circle-24px (1)"
             transform="translate(3.051 3.101)">
            <circle id="Ellipse_891"
                    data-name="Ellipse 891"
                    cx="25.905"
                    cy="25.905"
                    r="25.905"
                    transform="translate(-3.051 -3.101)"
                    fill="#19cb99"
                    opacity="0.4" />
            <circle id="Ellipse_257"
                    data-name="Ellipse 257"
                    cx="15.579"
                    cy="15.579"
                    r="15.579"
                    transform="translate(7.276 7.226)"
                    fill="#fff" />
            <path id="Path_797"
                  data-name="Path 797"
                  d="M0,0H44.889V44.889H0Z"
                  transform="translate(0.411 0.419)"
                  fill="none" />
            <path id="Path_29091"
                  data-name="Path 29091"
                  d="M20.7,2a18.7,18.7,0,1,0,18.7,18.7A18.71,18.71,0,0,0,20.7,2ZM15.635,28.727,8.92,22.013a1.865,1.865,0,0,1,2.637-2.637l5.405,5.387L29.831,11.894a1.865,1.865,0,1,1,2.637,2.637l-14.2,14.2A1.863,1.863,0,0,1,15.635,28.727Z"
                  transform="translate(2.151 2.158)"
                  fill="#19cb99" />
          </g>
        </svg>
      </div>
      <div class="PaymentResult-result">
        پرداخت موفق
      </div>
      <div class="PaymentResult-user-message">
        وحید حسینی عزیز ثبت نام شما با موفقیت انجام شد
      </div>
      <div class="PaymentResult-go-to-classroom-message">
        برای مشاهده جزییات دوره، به بخش دوره های من در پنل کاربری خود مراجعه کنید
      </div>
      <div class="PaymentResult-btn-may-classroom">
        <q-btn color="primary"
               label="دوره های من"
               :to="{name: 'UserPanel.Profile.AllClassrooms'}" />
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'PaymentResult',
  computed: {
    user () {
      return this.$store.getters['Auth/user']
    }
  }
}
</script>

<style scoped lang="scss">
.PaymentResult {
  .PaymentResult-card {
    background: #F5F5F5;
    padding: 56px 30px 76px 30px;
    max-width: 592px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 90px;
    text-align: center;
    .PaymentResult-icon {
      margin-bottom: 10px;
    }
    .PaymentResult-result {
      margin-bottom: 35px;
    }
    .PaymentResult-user-message {
      margin-bottom: 22px;
    }
    .PaymentResult-go-to-classroom-message {
      margin-bottom: 66px;
    }
    .PaymentResult-btn-may-classroom {
      margin-bottom: 0;
    }
  }
  .complete-info-steps-card {
    background-color: #F5F5F5;
    padding: 35px 0;
    border-radius: 8px;
    display: flex;
    flex-flow: row;
    justify-content: center;
    margin-bottom: 44px;
    .complete-info-step {
      display: flex;
      flex-flow: row;
      position: relative;
      width: 20%;
      &:first-child
      &:nth-child(2) {
        .title {
          color: #5B7A5F;
        }
      }
      &:after {
        content: ' ';
        position: absolute;
        left: 0;
        top: 10px;
        width: 95%;
        border-top: dotted 2px #5B7A5F;
        z-index: 1;
      }
      &:last-child {
        &:after {
          width: 0;
        }
        .title {
          //color: #BCBCBC;
        }
      }
      .title {
        position: relative;
        background-color: #F5F5F5;
        z-index: 2;
        padding-right: 24px;
      }
      svg {
        width: 17px;
        position: relative;
        background-color: #F5F5F5;
        z-index: 2;
        padding-right: 8px;
      }
    }
  }
  .complete-info-pay-banner {
    margin-bottom: 26px;
  }
  .complete-info-pay-form-card {
    background-color: #F5F5F5;
    padding: 30px;
    border-radius: 8px;
    .complete-info-pay-form-card-title {
      margin-bottom: 22px;
    }
    .product-item {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      .product-item-title {
        display: flex;
        flex-flow: row;
        .product-item-icon {
          margin-right: 10px;
        }
      }
      .product-item-price {
        svg {
          margin-right: 10px;
        }
      }
    }
  }
  .section-edit-btn {
    margin-top: 50px;
    margin-bottom: 77px;
  }
}
</style>

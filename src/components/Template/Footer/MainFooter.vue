<template>
  <div class="MainFooter">
    <div class="contents row">
      <div class="column col-md-4 col-sm-6 col-12">
        <div class="col-title">تماس با ما</div>
        <div class="col-content">
          <div class="col-items">
            <div v-if="false"
                 class="col-item">
              <q-icon name="place" />
              تهـران | خیـابان فلسطیـن | نبش بزرگمهـر سـاختمان 141 طبـقه 5 | واحـد 49
            </div>
            <div v-if="false"
                 class="col-item">
              <q-icon name="phone" />
              021-66499793
            </div>
            <div class="col-item">
              <q-icon name="mail" />
              info@palizvani.com
            </div>
          </div>
        </div>
      </div>
      <div class="column col-md-4 col-sm-6 col-12">
        <div class="col-title">راهنما</div>
        <div class="col-content">
          <div class="col-items">
            <div class="col-item">
              <q-btn :to="{name: 'Public.AboutUs'}"
                     flat
                     dense>
                درباره ما
              </q-btn>
            </div>
            <div class="col-item">
              <q-btn :to="{name: 'Public.Rules'}"
                     flat
                     dense>
                قوانین و مقررات
              </q-btn>
            </div>
            <div v-if="false"
                 class="col-item">
              ثبت شکایات
            </div>
            <div class="col-item">
              <q-btn :to="{name: 'Public.FAQ'}"
                     flat
                     dense>
                سوالات متداول
              </q-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="column col-md-4 col-12 social-column">
        <div class="col-title">شبکه‌های اجتماعی</div>
        <div class="col-content">
          <div class="col-items social-row">
            <div class="col-item social-row">
              <div class="social-item">
                <a href="https://eitaa.com/bonyad_shahidpalizvani"
                   target="_blank">
                  <q-img src="/assets/images/web/social/eta.svg"
                         width="27px"
                         height="27px" />
                </a>
              </div>
              <div class="social-item">
                <a href="https://ble.im/bonyad_shahidpalizvani"
                   target="_blank">
                  <q-img src="/assets/images/web/social/bale.svg"
                         width="27px"
                         height="27px" />
                </a>
              </div>
              <div class="social-item">
                <a href="https://t.me/bonyad_shahidpalizvani"
                   target="_blank">
                  <q-img src="/assets/images/web/social/telegram.svg"
                         width="27px"
                         height="27px" />
                </a>
              </div>
              <div class="social-item">
                <a href="https://www.aparat.com/shahidpalizvani.ir"
                   target="_blank">
                  <q-img src="/assets/images/web/social/aparat.svg"
                         width="27px"
                         height="27px" />
                </a>
              </div>
              <div class="social-item">
                <a href="https://youtube.com/@bonyad_shahidpalizvani971"
                   target="_blank">
                  <q-img src="/assets/images/web/social/youtube.svg"
                         width="27px"
                         height="27px" />
                </a>
              </div>
              <div class="namad-row">
                <div class="namad-item">
                  <q-img src="/assets/images/web/digitalnamad.jpg"
                         width="135px" />
                </div>
                <div class="namad-item">
                  <q-img src="/assets/images/web/enamad.jpg"
                         width="135px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copy-right">
      کلیه حقوق مادی و معنوی این وب سایت نزد بنیاد شهید پالیزوانی محفوظ است
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainFooter'
}
</script>

<style scoped lang="scss">
.MainFooter {
  background: #F6F6F6;
  .contents {
    max-width: 1200px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 39px 10px 48px;

    .column {
      .col-title {
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 0;
        color: #212121;
        margin-bottom: 33px;
        max-width: 100%;
        width: 100%;
      }
      .col-content {
        max-width: 100%;
        width: 100%;
        .col-items {
          max-width: 280px;
          &.social-row {
            max-width: 380px;
          }
          .col-item {
            margin-bottom: 33px;
            font-size: 16px;
            font-weight: normal;
            letter-spacing: -0.4px;
            color: #212121;
            &.social-row {
              display: flex;
              flex-flow: row;
              justify-content: flex-start;
              flex-wrap: wrap;
              .social-item {
                width: 50px;
                height: 45px;
                background: #FFFFFF;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 10px;
                cursor: pointer;
                .q-img {
                  width: 27px;
                  height: 27px;
                }
              }
              .namad-row {
                display: flex;
                flex-flow: row;
                justify-content: flex-start;
                width: 100%;
                margin-top: 33px;
                .namad-item {
                  width: 184px;
                  height: 165px;
                  background: #FFFFFF;
                  border-radius: 10px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 10px;
                  cursor: pointer;
                  .q-img {
                    width: 135px;
                  }
                }
              }
            }
            .q-icon {
              color: #AAA095;
              margin-right: 9px;
            }
          }
        }
      }
      &.social-column {
        @media screen and (max-width: 1023px) {
          .col-title {
            text-align: center;
          }
          .col-content {
            display: flex;
            flex-flow: row;
            justify-content: center;
            .col-items {
              .col-item.social-row {

              }
            }
          }
        }
      }
      @media screen and (max-width: 599px) {
        .col-title {
          text-align: center;
        }
        .col-content {
          display: flex;
          flex-flow: row;
          justify-content: center;
          .col-items {
            .col-item {
              text-align: center;
            }
          }
        }
      }
    }
  }
  .copy-right {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 23px;
    background: #FFFFFF;
    text-align: center;
    font: normal normal normal 16px/21px;
    letter-spacing: 0;
    color: #212121;
  }
}
</style>

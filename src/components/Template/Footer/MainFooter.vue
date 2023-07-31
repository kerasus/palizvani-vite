<template>
  <div class="MainFooter">
    <div class="contents row">
      <div class="column col-md-4 col-12">
        <div class="col-title">تماس با ما</div>
        <div class="col-content">
          <div class="col-items">
            <div class="col-item">
              <q-icon name="isax:location" />
              تهـران | خیـابان فلسطیـن | نبش بزرگمهـر سـاختمان 141 طبـقه 5 | واحـد 49
            </div>
            <div class="col-item">
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
      <div class="column col-md-4 col-12">
        <div class="col-title">راهنما</div>
        <div class="col-content">
          <div class="col-items">
            <div class="col-item">
              درباره ما
            </div>
            <div class="col-item">
              قوانین و مقررات
            </div>
            <div class="col-item">
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
      <div class="column col-md-4 col-12">
        <div class="col-title">شبکه‌های اجتماعی</div>
        <div class="col-content">
          <div class="col-items social-row">
            <div class="col-item social-row">
              <div class="social-item">
                <q-img src="/assets/images/web/social/eta.svg"
                       width="27px"
                       height="27px" />
              </div>
              <div class="social-item">
                <q-img src="/assets/images/web/social/bale.svg"
                       width="27px"
                       height="27px" />
              </div>
              <div class="social-item">
                <q-img src="/assets/images/web/social/telegram.svg"
                       width="27px"
                       height="27px" />
              </div>
              <div class="social-item">
                <q-img src="/assets/images/web/social/aparat.svg"
                       width="27px"
                       height="27px" />
              </div>
              <div class="social-item">
                <q-img src="/assets/images/web/social/youtube.svg"
                       width="27px"
                       height="27px" />
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
    padding-top: 39px;
    padding-bottom: 48px;
    .column {
      .col-title {
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 0;
        color: #212121;
        margin-bottom: 33px;
      }
      .col-content {
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

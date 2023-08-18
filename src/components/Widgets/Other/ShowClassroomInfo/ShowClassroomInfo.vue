<template>
  <div class="classroom">
    <q-banner v-if="!loading && !defaultOptions.profileMode"
              class="banner classroom-banner">
      دوره های آموزشی
      {{classroom.title}}
    </q-banner>
    <q-card v-if="!loading"
            flat
            class="classroom-card">
      <q-card-section class="info-box">
        <div class="row">
          <div class="col-md-4 col-12 classroom-thumbnail">
            <q-img :src="classroom.thumbnail" />
          </div>
          <div class="col-md-4 col-12 classroom-top-attributes">
            <div class="title">
              دوره آموزشی
              {{classroom.title}}:
            </div>
            <div class="attributes">
              <div class="attribute-item">{{getAudienceGenderType(classroom.audience_gender_type)}}</div>
              <div class="attribute-item">{{getHoldingType(classroom.holding_type)}}</div>
            </div>
          </div>
          <div class="col-md-4 col-12 classroom-action-col">
            <q-btn v-if="!defaultOptions.profileMode && !classroom.is_current_user_registered && classroom.is_enabled_adding"
                   color="primary"
                   class="btn-register"
                   @click="openRulesDialog">
              <svg data-name="Add User"
                   xmlns="http://www.w3.org/2000/svg"
                   width="20"
                   height="19.795"
                   viewBox="0 0 20 19.795"
                   class="q-mr-md">
                <path id="Combined_Shape"
                      data-name="Combined Shape"
                      d="M0,16.115c0-3.281,4.5-3.659,7.877-3.659,1.949,0,7.877,0,7.877,3.681,0,3.279-4.5,3.658-7.877,3.658C5.928,19.795,0,19.795,0,16.115Zm1.5,0c0,1.446,2.146,2.18,6.377,2.18s6.377-.726,6.377-2.158c0-1.447-2.146-2.181-6.377-2.181S1.5,14.683,1.5,16.115Zm14.954-5.436V9.424H15.16a.75.75,0,0,1,0-1.5h1.294V6.669a.75.75,0,1,1,1.5,0V7.924h1.3a.75.75,0,0,1,0,1.5h-1.3v1.255a.75.75,0,1,1-1.5,0Zm-8.609-.043a5.334,5.334,0,1,1,.031,0ZM4.06,5.318A3.8,3.8,0,0,0,7.849,9.136l.028.75v-.75A3.818,3.818,0,1,0,4.06,5.318Z"
                      transform="translate(0)"
                      fill="#fff" />
              </svg>
              ثبت نام
            </q-btn>
            <q-btn v-if="!defaultOptions.profileMode && !classroom.is_current_user_registered && classroom.is_enabled_enrolment"
                   color="primary"
                   class="btn-register"
                   :loading="enrolmentLoading"
                   @click="onEnrolment">
              <svg data-name="Add User"
                   xmlns="http://www.w3.org/2000/svg"
                   width="20"
                   height="19.795"
                   viewBox="0 0 20 19.795"
                   class="q-mr-md">
                <path id="Combined_Shape"
                      data-name="Combined Shape"
                      d="M0,16.115c0-3.281,4.5-3.659,7.877-3.659,1.949,0,7.877,0,7.877,3.681,0,3.279-4.5,3.658-7.877,3.658C5.928,19.795,0,19.795,0,16.115Zm1.5,0c0,1.446,2.146,2.18,6.377,2.18s6.377-.726,6.377-2.158c0-1.447-2.146-2.181-6.377-2.181S1.5,14.683,1.5,16.115Zm14.954-5.436V9.424H15.16a.75.75,0,0,1,0-1.5h1.294V6.669a.75.75,0,1,1,1.5,0V7.924h1.3a.75.75,0,0,1,0,1.5h-1.3v1.255a.75.75,0,1,1-1.5,0Zm-8.609-.043a5.334,5.334,0,1,1,.031,0ZM4.06,5.318A3.8,3.8,0,0,0,7.849,9.136l.028.75v-.75A3.818,3.818,0,1,0,4.06,5.318Z"
                      transform="translate(0)"
                      fill="#fff" />
              </svg>
              پیش ثبت نام
            </q-btn>
            <q-btn v-if="!defaultOptions.profileMode && classroom.is_current_user_registered"
                   color="primary"
                   class="btn-register"
                   :to="{name: 'UserPanel.Profile.ClassroomInfo', params: {id: classroom.id}}">
              <svg data-name="Add User"
                   xmlns="http://www.w3.org/2000/svg"
                   width="20"
                   height="19.795"
                   viewBox="0 0 20 19.795"
                   class="q-mr-md">
                <path id="Combined_Shape"
                      data-name="Combined Shape"
                      d="M0,16.115c0-3.281,4.5-3.659,7.877-3.659,1.949,0,7.877,0,7.877,3.681,0,3.279-4.5,3.658-7.877,3.658C5.928,19.795,0,19.795,0,16.115Zm1.5,0c0,1.446,2.146,2.18,6.377,2.18s6.377-.726,6.377-2.158c0-1.447-2.146-2.181-6.377-2.181S1.5,14.683,1.5,16.115Zm14.954-5.436V9.424H15.16a.75.75,0,0,1,0-1.5h1.294V6.669a.75.75,0,1,1,1.5,0V7.924h1.3a.75.75,0,0,1,0,1.5h-1.3v1.255a.75.75,0,1,1-1.5,0Zm-8.609-.043a5.334,5.334,0,1,1,.031,0ZM4.06,5.318A3.8,3.8,0,0,0,7.849,9.136l.028.75v-.75A3.818,3.818,0,1,0,4.06,5.318Z"
                      transform="translate(0)"
                      fill="#fff" />
              </svg>
              مشاهده دوره
            </q-btn>
            <q-btn v-if="defaultOptions.profileMode"
                   outline
                   color="primary"
                   class="btn-register"
                   @click="openRulesDialog">
              آیین نامه دوره
            </q-btn>
            <q-btn v-if="defaultOptions.profileMode && classroom.is_enabled_dropping"
                   outline
                   color="red"
                   class="btn-register q-ml-md"
                   :loading="dropLoading"
                   @click="onDropping">
              انصراف
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="info-box">
        <div class="row second-section">
          <div class="col-md-4 col-sm-6 col-12 attribute-column">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg"
                   width="17.058"
                   height="21.399"
                   viewBox="0 0 17.058 21.399">
                <path id="Combined_Shape"
                      data-name="Combined Shape"
                      d="M0,17.418c0-3.55,4.868-3.96,8.53-3.96,2.109,0,8.528,0,8.528,3.982,0,3.548-4.867,3.959-8.528,3.959C6.42,21.4,0,21.4,0,17.418Zm1.616,0c0,1.57,2.326,2.366,6.914,2.366s6.913-.789,6.913-2.345-2.326-2.366-6.913-2.366S1.616,15.862,1.616,17.418ZM8.5,11.436A5.718,5.718,0,0,1,8.53,0a5.718,5.718,0,0,1,0,11.436ZM4.349,5.718A4.171,4.171,0,0,0,8.5,9.9l.031.77V9.9a4.18,4.18,0,1,0-4.181-4.18Z"
                      transform="translate(0 0)"
                      fill="#aaa095" />
              </svg>
            </div>
            <div class="title">
              {{ classroom.professor }}
            </div>
          </div>
          <div class="col-md-4 col-sm-6 col-12 attribute-column">
            <div class="icon">
              <svg id="Calendar"
                   xmlns="http://www.w3.org/2000/svg"
                   width="21"
                   height="23.154"
                   viewBox="0 0 21 23.154">
                <path id="Combined_Shape"
                      data-name="Combined Shape"
                      d="M5.945,23.154c-3.668,0-5.945-2.26-5.945-5.9V7.51A5.382,5.382,0,0,1,5.347,1.721V.807a.808.808,0,0,1,1.616,0V1.7h7.084V.807a.807.807,0,1,1,1.615,0v.914a5.8,5.8,0,0,1,3.8,1.572A5.793,5.793,0,0,1,21,7.513v9.824c0,3.588-2.279,5.817-5.946,5.817Zm-4.33-5.9c0,2.762,1.537,4.284,4.33,4.284h9.109c2.792,0,4.331-1.493,4.331-4.2V9.59H1.616ZM19.385,7.974V7.51a4.159,4.159,0,0,0-1.063-3.074,4.164,4.164,0,0,0-2.66-1.094v1.01a.807.807,0,0,1-1.615,0V3.317H6.963V4.352a.808.808,0,0,1-1.616,0V3.341c-2.413.2-3.732,1.664-3.732,4.169v.464Zm-4.9,9.2a.8.8,0,0,1,.8-.807h.01a.807.807,0,1,1-.812.807Zm-4.778,0a.8.8,0,0,1,.8-.807h.01a.807.807,0,1,1-.812.807Zm-4.79,0a.8.8,0,0,1,.8-.807h.01a.807.807,0,1,1-.813.807Zm9.568-4.185a.8.8,0,0,1,.8-.808h.01a.808.808,0,1,1-.812.808Zm-4.778,0a.8.8,0,0,1,.8-.808h.01a.808.808,0,1,1-.812.808Zm-4.79,0a.8.8,0,0,1,.8-.808h.01a.808.808,0,1,1-.813.808Z"
                      transform="translate(0 0)"
                      fill="#aaa095" />
              </svg>
            </div>
            <div class="title">
              {{ getTerm(classroom) }}
            </div>
          </div>
          <div class="col-md-4 col-sm-6 col-12 attribute-column">
            <div class="icon">
              <svg data-name="Group 11306"
                   xmlns="http://www.w3.org/2000/svg"
                   width="21.539"
                   height="21.044"
                   viewBox="0 0 21.539 21.044">
                <g id="Buy"
                   transform="translate(0 0)">
                  <path id="Combined_Shape"
                        data-name="Combined Shape"
                        d="M16.3,19.649A1.395,1.395,0,1,1,17.7,21.044,1.4,1.4,0,0,1,16.3,19.649Zm-12.147,0a1.394,1.394,0,1,1,1.394,1.395A1.4,1.4,0,0,1,4.157,19.649ZM17.77,16.139H6.014A2.76,2.76,0,0,1,3.28,13.615L2.294,1.883.671,1.6A.812.812,0,0,1,.012.668.811.811,0,0,1,.815,0a.829.829,0,0,1,.13.011L3.186.4a.808.808,0,0,1,.666.729L4.1,4.143c15.367.007,15.424.014,15.5.022a2.254,2.254,0,0,1,1.912,2.553l-1.023,7.062a2.76,2.76,0,0,1-2.717,2.358ZM4.89,13.483a1.123,1.123,0,0,0,1.127,1.04H17.771a1.139,1.139,0,0,0,1.122-.972l1.024-7.064a.632.632,0,0,0-.121-.472.625.625,0,0,0-.418-.249c-.052,0-.6,0-1.677,0-1.693,0-4.455,0-7.291,0l-6.17,0ZM13.059,9.74a.808.808,0,0,1,0-1.616h2.985a.808.808,0,0,1,0,1.616Z"
                        transform="translate(0)"
                        fill="#aaa095" />
                </g>
              </svg>
            </div>
            <div class="title">
              {{ classroom.price ? classroom.price.toLocaleString('fa') : 0 }}
              تومان
            </div>
          </div>
        </div>
      </q-card-section>
      <div class="row q-col-gutter-lg four-sections">
        <div class="col-md-6 col-12">
          <div class="info-box detailes">
            <div class="info-box-title">
              <svg xmlns="http://www.w3.org/2000/svg"
                   width="17.054"
                   height="19.866"
                   viewBox="0 0 17.054 19.866">
                <path id="Combined_Shape"
                      data-name="Combined Shape"
                      d="M4.475,19.866A4.585,4.585,0,0,1,0,15.188V4.491A4.606,4.606,0,0,1,4.57.012h6.271a.758.758,0,0,1,.265,0h.131a.755.755,0,0,1,.541.23l5.065,5.277a.753.753,0,0,1,.209.519V15.2A4.615,4.615,0,0,1,12.6,19.865H4.475ZM1.5,4.509V15.2a3.091,3.091,0,0,0,3.009,3.162h8.064a3.109,3.109,0,0,0,2.979-3.155V6.984h-2.01a3.332,3.332,0,0,1-3.318-3.325V1.512H4.572A3.089,3.089,0,0,0,1.5,4.509Zm10.224-.85a1.828,1.828,0,0,0,1.82,1.824H14.73L11.724,2.353ZM5.387,14.108a.75.75,0,0,1,0-1.5h5.4a.75.75,0,0,1,0,1.5Zm0-3.752a.75.75,0,0,1,0-1.5H8.743a.75.75,0,0,1,0,1.5Z"
                      transform="translate(0.001)"
                      fill="#aaa095" />
              </svg>
              جزییات دوره
            </div>
            <div class="info-box-body">
              <div class="info-item">
                نام درس:
                {{ classroom.title }}
              </div>
              <div class="info-item">
                گروه آموزشی:
                {{ classroom.unit_info.category_info.title }}
              </div>
              <div class="info-item">
                زمان شروع ثبت نام گروه درسی:
                {{ getTime(classroom.beginning_registration_period) }}
              </div>
              <div class="info-item">
                زمان اتمام ثبت نام گروه درسی:
                {{ getTime(classroom.ending_registration_period) }}
              </div>
            </div>
          </div>
          <div class="info-box rules">
            <div class="info-box-title">
              <svg xmlns="http://www.w3.org/2000/svg"
                   width="16.968"
                   height="20.356"
                   viewBox="0 0 16.968 20.356">
                <path id="Combined_Shape"
                      data-name="Combined Shape"
                      d="M8.266,20.324c-.335-.1-8.205-2.55-8.205-9.445C.06,9,.036,7.621.019,6.616l0-.058c-.046-2.544-.055-3.074.6-3.73C1.4,2.04,7.349,0,8.483,0s7.078,2.04,7.865,2.828c.656.656.646,1.184.6,3.722l0,.062C16.929,7.619,16.9,9,16.9,10.879c0,6.895-7.87,9.344-8.205,9.445a.711.711,0,0,1-.217.032A.719.719,0,0,1,8.266,20.324ZM1.668,3.9c-.182.184-.189.5-.15,2.63l0,.065c.017,1.011.041,2.395.041,4.286,0,5.217,5.765,7.525,6.921,7.934C9.637,18.4,15.4,16.086,15.4,10.879c0-1.959.027-3.4.044-4.353.038-2.127.031-2.445-.162-2.637A30.988,30.988,0,0,0,8.483,1.5,31.027,31.027,0,0,0,1.668,3.9Zm5.577,8.4L5.353,10.406A.751.751,0,0,1,6.415,9.345l1.361,1.363,3.369-3.368A.75.75,0,0,1,12.2,8.4l-3.9,3.9a.749.749,0,0,1-1.061,0Z"
                      transform="translate(0.001)"
                      fill="#aaa095" />
              </svg>
              قوانین دوره
            </div>
            <div class="info-box-body">
              <div v-html="classroom.rules" />
              <div v-if="classroom.unit_info && classroom.unit_info.codes"
                   v-html="classroom.unit_info.codes" />
            </div>
          </div>
        </div>
        <div class="col-md-6 col-12">
          <div class="info-box class-time">
            <div class="info-box-title">
              <svg id="Time_Circle"
                   data-name="Time Circle"
                   xmlns="http://www.w3.org/2000/svg"
                   width="20"
                   height="20"
                   viewBox="0 0 20 20">
                <path id="Combined_Shape"
                      data-name="Combined Shape"
                      d="M0,10A10,10,0,1,1,10,20,10.011,10.011,0,0,1,0,10Zm1.5,0A8.5,8.5,0,1,0,10,1.5,8.51,8.51,0,0,0,1.5,10Zm11.547,3.587-3.77-2.249a.754.754,0,0,1-.366-.644V5.845a.75.75,0,0,1,1.5,0v4.422l3.4,2.03a.751.751,0,0,1-.769,1.29Z"
                      fill="#aaa095" />
              </svg>
              زمان برگزاری کلاس
            </div>
            <div class="info-box-body">
              <div v-if="classroom.sessions_info && classroom.sessions_info.length > 0 && classroom.sessions_info[0].starting_time"
                   class="info-item">
                اولین جلسه:
                {{ getTitledDateTime(classroom.sessions_info[0].starting_time) }}
              </div>
              <div v-if="false"
                   class="info-item">
                کلاس‌ها:
                روزهای دوشنبه ساعت 20:30 تا 22 به وقت ایران
              </div>
              <div v-if="classroom.sessions_info"
                   class="info-item">
                طول دوره:
                {{ classroom.sessions_info.length }}
                جلسه
              </div>
              <div v-if="false"
                   class="info-item">
                نوع برگزاری :
                {{getHoldingType(classroom.holding_type)}}
              </div>
            </div>
          </div>
          <div class="info-box books">
            <div v-if="false"
                 class="info-box-title">
              <svg xmlns="http://www.w3.org/2000/svg"
                   width="21.968"
                   height="15.702"
                   viewBox="0 0 21.968 15.702">
                <path id="import_contacts_FILL0_wght400_GRAD0_opsz48"
                      d="M7.192,20.482a10.817,10.817,0,0,1,2.609.312,11.579,11.579,0,0,1,2.484.936V11.07A9.5,9.5,0,0,0,9.851,9.91,8.819,8.819,0,0,0,7.192,9.5a7.353,7.353,0,0,0-1.86.237,17.989,17.989,0,0,0-1.835.587h0V21.156h0a7.045,7.045,0,0,1,1.76-.512A11.9,11.9,0,0,1,7.192,20.482Zm6.59,1.248a12.562,12.562,0,0,1,2.446-.936,10.07,10.07,0,0,1,2.546-.312,13.37,13.37,0,0,1,1.96.15,9.769,9.769,0,0,1,1.735.4h0V10.322h0a7.418,7.418,0,0,0-1.8-.624,9.187,9.187,0,0,0-1.9-.2,8.346,8.346,0,0,0-2.609.412,9.727,9.727,0,0,0-2.384,1.161ZM13.034,23.7a1.613,1.613,0,0,1-.362-.037.708.708,0,0,1-.287-.137,10.528,10.528,0,0,0-2.5-1.123,9.28,9.28,0,0,0-2.7-.4,7.188,7.188,0,0,0-1.8.225,17.621,17.621,0,0,0-1.747.549A1.07,1.07,0,0,1,2.537,22.7,1.122,1.122,0,0,1,2,21.7V10.147a1.381,1.381,0,0,1,.175-.686A1.192,1.192,0,0,1,2.7,8.974a9.65,9.65,0,0,1,2.184-.736A11.268,11.268,0,0,1,7.192,8a11.077,11.077,0,0,1,3.058.424,9.758,9.758,0,0,1,2.783,1.3,9.477,9.477,0,0,1,2.733-1.3A10.725,10.725,0,0,1,18.775,8a11.088,11.088,0,0,1,2.3.237,9.691,9.691,0,0,1,2.172.736,1.272,1.272,0,0,1,.537.487,1.309,1.309,0,0,1,.187.686V21.7a1.183,1.183,0,0,1-.562,1.061.956.956,0,0,1-1.111.012,11.887,11.887,0,0,0-1.722-.562,7.589,7.589,0,0,0-1.8-.212,8.949,8.949,0,0,0-2.646.4,10.183,10.183,0,0,0-2.446,1.123.708.708,0,0,1-.287.137A1.613,1.613,0,0,1,13.034,23.7ZM7.891,15.764Z"
                      transform="translate(-2 -8)"
                      fill="#aaa095" />
              </svg>
              کتاب ها
            </div>
            <div class="info-box-body"
                 v-html="classroom.description" />
          </div>
        </div>
      </div>
    </q-card>

    <q-skeleton v-if="loading"
                type="circle"
                size="100px"
                class="q-mt-md" />
    <q-skeleton v-if="loading"
                width="150px"
                class="q-mt-md" />
    <q-skeleton v-if="loading"
                height="150px"
                class="q-mt-md" />

    <q-dialog v-model="rulesDialog"
              class="rulesDialog"
              full-width>
      <q-card>
        <q-card-section>
          <div class="text-h6">آیین نامه</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh"
                        class="scroll">
          <div v-html="classroom.rules" />
          <div v-if="classroom.unit_info && classroom.unit_info.codes"
               v-html="classroom.unit_info.codes" />
        </q-card-section>

        <q-separator />

        <q-card-actions class="rulesDialog-actions">
          <div v-if="!defaultOptions.profileMode"
               class="rulesDialog-accept-chk">
            <q-checkbox v-model="rulesAccept"
                        label="آیین نامه دوره آموزشی را خواندم و قصد ثبت نام در دوره را دارم" />
          </div>
          <div class="rulesDialog-btns q-gutter-md">
            <q-btn v-if="defaultOptions.profileMode"
                   v-close-popup
                   label="بستن"
                   color="primary"
                   outline />
            <q-btn v-if="!defaultOptions.profileMode"
                   v-close-popup
                   label="انصراف"
                   color="primary"
                   outline />
            <q-btn v-if="!defaultOptions.profileMode"
                   label="تایید و ادامه"
                   color="primary"
                   :disable="!rulesAccept"
                   @click="acceptAndContinue" />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Enums from 'src/assets/Enums/Enums.js'
import ShamsiDate from 'src/assets/ShamsiDate.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Classroom } from 'src/models/Classroom.js'

export default {
  name: 'ShowClassroomInfo',
  mixins: [mixinWidget],
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data: () => ({
    defaultOptions: {
      profileMode: false
    },
    enrolmentLoading: false,
    dropLoading: false,
    rulesAccept: false,
    rulesDialog: false,
    loading: true,
    classroom: new Classroom()
  }),
  mounted () {
    this.getClassroom()
  },
  methods: {
    getTitledDateTime (dateTime) {
      return ShamsiDate.getTitledDateTime(dateTime)
    },
    acceptAndContinue () {
      this.$store.commit('Shop/updateOnRegisterClassroom', this.classroom)
      this.$router.push({ name: 'UserPanel.ShopCompleteInfo' })
    },
    onEnrolment () {
      this.$q.dialog({
        title: 'توجه',
        message: 'آیا از پیش ثبت نام این دوره اطمینان دارید؟' + '\n' + this.classroom.unit_info.codes,
        html: true,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.enrolmentLoading = true
        const classroomId = this.$route.params.id
        APIGateway.classroom.enrollByUser(classroomId)
          .then(() => {
            this.enrolmentLoading = false
            this.getClassroom()
          })
          .catch(() => {
            this.enrolmentLoading = false
          })
      })
    },
    onDropping () {
      this.$q.dialog({
        title: 'توجه',
        message: 'آیا از حذف نام این دوره اطمینان دارید؟',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.dropLoading = true
        const classroomId = this.$route.params.id
        APIGateway.classroom.dropByUser(classroomId)
          .then(() => {
            this.dropLoading = false
            this.getClassroom()
          })
          .catch(() => {
            this.dropLoading = false
          })
      })
    },
    openRulesDialog () {
      this.rulesDialog = true
    },
    getHoldingType (type) {
      const target = Enums.classroomHoldingTypes.find(item => item.value === type)
      if (target) {
        return target.label
      }
      return '-'
    },
    getAudienceGenderType (type) {
      const target = Enums.genders.find(item => item.value === type)
      if (target) {
        return target.label
      }
      return '-'
    },
    getTime (time) {
      return ShamsiDate.getDateTime(time)
    },
    getTerm (classroom) {
      if (!classroom.beginning_registration_period) {
        return '-'
      }
      return ShamsiDate.getTerm(classroom.beginning_registration_period)
    },
    getClassroom () {
      this.loading = true
      APIGateway.classroom.get(this.$route.params.id)
        .then(classroom => {
          this.classroom = new Classroom(classroom)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.classroom {
  .classroom-banner {
    margin-top: 52px;
    margin-bottom: 42px;
  }
  .classroom-card {
    background-color: #F5F5F5;
    padding: 20px 30px 40px 30px;
    .four-sections {
      .info-box {
        height: 353px;
        overflow: auto;
        &.detailes {
          //margin-right: 24px;
        }
        &.rules {
          //margin-right: 24px;
        }
        .info-box-title {
          margin-bottom: 29px;
          display: flex;
          flex-flow: row;
          svg {
            margin-right: 8px;
          }
        }
        .info-box-body {
          .info-item {
            margin-bottom: 27px;
          }
        }
      }
    }
    .info-box {
      background-color: #FFFFFF;
      border-radius: 8px;
      padding: 26px;
      margin-bottom: 24px;
      .classroom-thumbnail {
        padding-right: 42px;
      }
      .classroom-top-attributes {
        .attributes {
          padding-top: 27px;
          .attribute-item {
            margin-bottom: 20px;
            position: relative;
            padding-left: 15px;
            &:before {
              content: ' ';
              background-color: #EAC38A;
              width: 8px;
              height: 8px;
              border-radius: 100%;
              position: absolute;
              left: 0;
              top: 10px;
            }
          }
        }
      }
      .classroom-action-col {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        flex-wrap: wrap;
        .btn-register {
          width: 220px;
        }
        @media screen and (max-width: 700px) {
          width: 100%;
          .q-btn {
            width: 100% !important;
            margin-left: 0;
            margin-bottom: 8px;
          }
        }
      }
      .second-section {
        .attribute-column {
          display: flex;
          flex-flow: row;
          .icon {
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.rulesDialog {
  .rulesDialog-actions {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    .rulesDialog-accept-chk {}
    .rulesDialog-btns {}
  }
}
</style>

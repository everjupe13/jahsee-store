export const TRACKER_SLUGS = {
  PROCEED_AUTH_PHONE: 'proceed_auth_phone',
  PROCEED_AUTH_LOGIN: 'proceed_auth_login',
  AUTH_PHONE: 'auth_phone',
  AUTH_LOGIN: 'auth_login',
  AUTH_DONE: 'auth_done',
  REG_USER_INFO: 'reg_user_info',
  REG_LEGALINFO: 'reg_legalinfo',
  REG_DONE: 'reg_done',
  ROUTE_PROFILE: 'route_profile',
  ROUTE_PROFILE_MANAGEMENT: 'route_profile_management',
  USER_CHANGE_PASSWORD: 'user_change_password',
  ROUTE_EXIT: 'route_exit',
  ENTRY_SCHEDULE_APPOINTMENT: 'entry_schedule_appointment',
  RESCHEDULE_APPOINTMENT: 'reschedule_appointment',
  CANCEL_SCHEDULE_APPOINTMENT: 'cancel_schedule_appointment',
  PROCEED_VISIT: 'proceed_visit',
  RESCHEDULE_VISIT: 'reschedule_visit',
  CANCEL_VISIT: 'cancel_visit',
  FILTER_VISITS_HISTORY_CLINICS: 'filter_visits_history_clinics',
  FILTER_VISITS_HISTORY_DATE: 'filter_visits_history_date',
  FILTER_VISITS_HISTORY_DOCTOR_NAME: 'filter_visits_history_doctor_name',
  FILTER_VISITS_HISTORY_DOCTOR_SPEC: 'filter_visits_history_doctor_spec',
  PROCEED_ANALYSES_RESULT: 'proceed_analysis_result',
  SHOW_ANALYSES_RESULT: 'show_analysis_result',
  FILTER_ANALYSES_DATE: 'filter_analysis_date',
  FILTER_ANALYSES_STATUS: 'filter_analysis_status',
  FILTER_ANALYSES_DOCTOR_SPEC: 'filter_analysis_doctor_spec',
  FILTER_ANALYSES_TYPE: 'filter_analysis_type',
  PROCEED_DIAGNOSTIC_RESULT: 'proceed_diagnostic_result',
  SHOW_DIAGNOSTIC_RESULT: 'show_diagnostic_result',
  FILTER_DIAGNOSTIC_DATE: 'filter_diagnostic_date',
  FILTER_DIAGNOSTIC_DOCTOR_SPEC: 'filter_diagnostic_doctor_spec',
  CREATE_APPOINTMENT: 'create_appointment',
  CONFIRM_APPOINTMENT: 'confirm_appointment',
  DONE_APPOINTMENT: 'appointment_done',
  FILTER_APPOINTMENT_CLINICS: 'filter_appointment_clinics',
  FILTER_APPOINTMENT_DOCTOR_NAME: 'filter_appointment_doctor_name',
  FILTER_APPOINTMENT_DATE: 'filter_appointment_date',
  FILTER_APPOINTMENT_CITY: 'filter_appointment_city',
  APPOINTMENT_DATE: 'appointment_date',
  APPOINTMENT_TIME: 'appointment_time',
  PROCEED_CLINIC_FIND: 'proceed_clinic_find',
  CLINIC_FIND: 'clinic_find',
  CLINIC_NEW_APPOINTMENT: 'clinic_new_appointment',
  CONSULTANT_CHAT: 'open_consultant_chat',
  PROCEED_MOBILE_STORE_APPSTORE: 'proceed_mobile_store_app_store',
  PROCEED_MOBILE_STORE_GOOGLEPLAY: 'proceed_mobile_store_google_play',
  PROCEED_MOBILE_STORE_APPGALLERY: 'proceed_mobile_store_app_gallery',
  GOFAQ: 'GO_FAQ'
}

// eslint-disable-next-line unicorn/numeric-separators-style
export const YM_USER_ID = 95590253

export const YM_USER_CONFIG = {
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: true,
  defer: true
}

export const EVENT_TYPES = {
  GOAL: 1,
  ROUTE_CHANGING: 2
}

export const EVENT_SLUGS = {
  [EVENT_TYPES.GOAL]: {
    YM: 'reachGoal'
  },
  [EVENT_TYPES.ROUTE_CHANGING]: {
    YM: 'hit'
  }
}

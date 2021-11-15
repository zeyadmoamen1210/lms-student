import Vue from 'vue'

import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import 'moment/locale/ar';
Vue.use(VueMoment, {
    moment,
})
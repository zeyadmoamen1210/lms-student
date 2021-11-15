import Vue from 'vue';
import { LayoutPlugin,ProgressPlugin  } from 'bootstrap-vue'
import { BContainer } from 'bootstrap-vue'
Vue.component('b-container', BContainer)


import { TabsPlugin } from 'bootstrap-vue'
Vue.use(TabsPlugin)
Vue.use(ProgressPlugin)

Vue.use(LayoutPlugin)

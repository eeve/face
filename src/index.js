import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import RouterLink from './RouterLink';
Vue.component('router-link', RouterLink);

import 'vue-ydui/dist/ydui.flexible';
// import YDUI from 'vue-ydui';
// import 'vue-ydui/dist/ydui.rem.css';
// Vue.use(YDUI);

import 'vue-ydui/dist/ydui.base.css';

import { GridsItem, GridsGroup } from 'vue-ydui/dist/lib.rem/grids';
Vue.component(GridsItem.name, GridsItem);
Vue.component(GridsGroup.name, GridsGroup);

import { FlexBox, FlexBoxItem } from 'vue-ydui/dist/lib.rem/flexbox';
Vue.component(FlexBox.name, FlexBox);
Vue.component(FlexBoxItem.name, FlexBoxItem);

import { Button, ButtonGroup } from 'vue-ydui/dist/lib.rem/button';
Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);

import { CellItem, CellGroup } from 'vue-ydui/dist/lib.rem/cell';
Vue.component(CellItem.name, CellItem);
Vue.component(CellGroup.name, CellGroup);

import { ScrollTab, ScrollTabPanel } from 'vue-ydui/dist/lib.rem/scrolltab';
Vue.component(ScrollTab.name, ScrollTab);
Vue.component(ScrollTabPanel.name, ScrollTabPanel);

import { Toast, Notify } from 'vue-ydui/dist/lib.rem/dialog';
Vue.prototype.$dialog = {
  toast: Toast,
  notify: Notify
};

import { Input } from 'vue-ydui/dist/lib.rem/input';
Vue.component(Input.name, Input);

import { Popup } from 'vue-ydui/dist/lib.rem/popup';
Vue.component(Popup.name, Popup);

import { Icons } from 'vue-ydui/dist/lib.rem/icons';
Vue.component(Icons.name, Icons);

new Vue({
  el: '#app',
  render: h => h(App)
});

import Vue from "vue";
import {
  Button,
  Row,
  Col,
  Card,
  Icon,
  TabPane,
  Tabs,
  Form,
  FormItem,
  Input,
  Message,
  Menu,
  Submenu,
  MenuItem,
  Modal,
  Poptip,
  Select,
  Option
} from "view-design";

import VueClipboard from "vue-clipboard2";

Vue.component("Button", Button);
Vue.component("Row", Row);
Vue.component("Col", Col);
Vue.component("Card", Card);
Vue.component("Icon", Icon);
Vue.component("TabPane", TabPane);
Vue.component("Tabs", Tabs);
Vue.component("Form", Form);
Vue.component("FormItem", FormItem);
Vue.component("Input", Input);
Vue.component("Menu", Menu);
Vue.component("Submenu", Submenu);
Vue.component("MenuItem", MenuItem);
Vue.component("Modal", Modal);
Vue.component("Poptip", Poptip);
Vue.component("Select", Select);
Vue.component("Option", Option);
Vue.prototype.$Message = Message;

Vue.use(VueClipboard);

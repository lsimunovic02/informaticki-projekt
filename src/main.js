import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import router from "./router";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
});

createApp(App)
  .use(router)
  .use(vuetify)
  .use(Toast, {
    position: "top-right",
    timeout: 3000,
    pauseOnHover: true,
  })
  .mount("#app");

<script>
import { mapActions } from "pinia";
import useAuthStore from "@/stores/auth";
import { useMeta } from "vue-meta";

export default {
  provide() {
    return {
      notify: (msg, status = true) => this.notify(msg, status),
    };
  },
  setup() {
    useMeta({
      htmlAttrs: {
        lang: "en",
      },
    });
  },
  async created() {
    try {
      await this.a$setUserInfo();
    } catch (error) {
      this.notify(error, false);
    }
  },
  methods: {
    ...mapActions(useAuthStore, ["a$setUserInfo"]),
  },
};
</script>

<template>
  <metainfo>
    <template #title="{ content }"
      >{{ content }} | {{ siteMeta.title }}</template
    >
  </metainfo>
  <router-view />
</template>

<style>
.bg-gradient-argon {
  background: linear-gradient(87deg, #006329 0, #7eb918 100%) !important;
}
.text-success {
  color: #006329 !important;
}
.btn-success1 {
  background-color: #006329 !important;
}
.bg-success {
  background-color: #006329 !important;
}
.btn-register {
  background-color: #0074cc !important;
}
.btn-register-without-activate {
  background-color: #0074cc !important;
}
.btn-exit {
  background-color: #ff0000 !important;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: #006329 !important;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff !important;
}

.nav-pills .nav-link {
  color: #525f7f !important;
}
.vueperslides__bullets--outside {
  position: absolute !important;
}
</style>

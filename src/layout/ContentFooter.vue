<template>
  <footer
    class="px-4 mx-auto mb-4"
    :class="[
      isLoggedIn && $route.name !== '404' ? 'container-fluid' : 'container',
    ]"
  >
    <div class="row align-items-center justify-content-center">
      <div class="col">
        <div class="copyright text-center text-muted">
          {{ currentYear }} &mdash; <strong>{{ siteMeta.title }}</strong>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>

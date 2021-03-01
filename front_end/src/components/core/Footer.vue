<template>
  <v-footer
    id="core-footer"
    app
    absolute
    height="50"
  >
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href=""
        target="_blank">Grupo A</a>, challenge full stack
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: 'Home', Link: '/dashboard' },
      { name: 'Demo', Link: 'https://clintoxx.github.io/vuetify-admin-dashboard/' },
      { name: 'GitHub', Link: 'https://github.com/ClintOxx' }
    ]
  })
}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
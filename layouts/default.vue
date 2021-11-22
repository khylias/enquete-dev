<template>
  <div>
    <header-main />
    <Nuxt />
    <footer-main />
  </div>
</template>

<script>
import FooterVue from "../components/Footer.vue";
import HeaderVue from "../components/Header.vue";
export default {
    components: {
        "header-main": HeaderVue,
        "footer-main": FooterVue,
    },
}
</script>

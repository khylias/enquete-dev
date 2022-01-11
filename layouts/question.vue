<template>
  <div>
    <header-main />
        <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <Nuxt/>
        </main>
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

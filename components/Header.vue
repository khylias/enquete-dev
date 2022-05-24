<template>
    <header class="flex justify-between container mx-auto mt-2">
        <h1 class="font-medium text-gray-700">
            <NuxtLink to="/">Enquete.dev</NuxtLink>
        </h1>
        <div>
            <NuxtLink to="/comment-ca-marche">Comment ça marche ?</NuxtLink>
            <login-button class="ml-8"></login-button>
        </div>
    </header>
</template>
<script>
import LoginButton from './LoginButton.vue';
export default {
    components: {
        LoginButton
    },
}
</script>

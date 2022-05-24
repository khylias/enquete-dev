<template>
    <button
        class="border rounded py-1.5 px-2"
        @click="connect"
    >
        <span v-if="!$auth.$state.user"> Se connecter </span>
        <span v-else>Bonjour, {{$auth.user.login }}</span>
    </button>
</template>

<script>
// import GithubService from '@/services/github.service';
import GoTrue from 'gotrue-js'
import { get } from 'http'
const isLocal = true

// Instantiate the library, passing in the live API URL
// and whether it should save cookies
const auth = new GoTrue({
    APIUrl: 'https://enquete.dev/.netlify/identity',
    setCookie: !isLocal,
})

// Get the current user object, or null if no-ones logged in
const user = auth.currentUser()

// Log it for next time around
console.log(user);

export default {
    created() {},
    mounted() {
    },
    methods: {
        async connect() {
            window.location = auth.loginExternalUrl('github');
        },
        async logout() {
            await this.$auth.logout()
        },
        connexion() {},
    },
}
</script>

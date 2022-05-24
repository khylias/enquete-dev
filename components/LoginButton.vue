<template>
  <!-- <button class="border rounded py-1.5 px-2" @click="connect">
    <span v-if="!$auth.$state.user"> Se connecter </span>
    <span v-else>Bonjour, {{$auth.user.login }}</span>
  </button> -->
  <button @click="connexion">Connexion</button>
</template>

<script>
import NetlifyIdentity from 'netlify-identity-widget';
// import GithubService from '@/services/github.service';
export default {
    created() {
        },
    mounted() {
    
        NetlifyIdentity.init({
            container: '#netlify-auth-modal',
            locale: 'fr'
        })
        let user = NetlifyIdentity.currentUser();
        console.log('USER', user)

        // NetlifyIdentity redirect to prod after login instead of localhost.


        NetlifyIdentity.on('init', user => console.log('init', user));
        NetlifyIdentity.on('login', user => console.log('login', user));
        NetlifyIdentity.on('logout', () => console.log('Logged out'));
        NetlifyIdentity.on('error', err => console.error('Error', err));
        NetlifyIdentity.on('open', () => console.log('Widget opened'));
        NetlifyIdentity.on('close', () => console.log('Widget closed'));

    },
    methods: {
        async connect() {
            await this.$auth.loginWith('github');
        },
        async logout() {
            await this.$auth.logout()
        },
        connexion() {
            NetlifyIdentity.open()
        }
    },
}
</script>

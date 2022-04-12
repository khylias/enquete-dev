<template>
  <button class="border rounded py-1.5 px-2" @click="connect">
    <span v-if="!$auth.$state.user"> Se connecter </span>
    <span v-else>Bonjour, {{$auth.user.login }}</span>
  </button>
</template>

<script>
// import GithubService from '@/services/github.service';
export default {
    methods: {
        async connect() {
            await this.$auth.loginWith('github');
        },
        async logout() {
            await this.$auth.logout()
        }
    }
}
</script>

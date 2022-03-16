<template>
  <button class="border rounded py-1.5 px-2" @click="connect">
    <span v-if="!$auth.state.user"> Se connecter </span>
    <span v-else>Bonjour, {{$auth.user.login }}</span>
  </button>
</template>

<script>
export default {
    methods: {
        connect() {
            this.$auth.loginWith('github');
        }
    }
}
</script>

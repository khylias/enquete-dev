<template>
    <p>Logged in...</p>
</template>

<script>
import GithubService from '@/services/github.service';
export default {
    created() {
        this.getAccessToken();
    },
    methods: {
        async getAccessToken() {
            const paramsString = window.location.search;
            const searchParams = new URLSearchParams(paramsString);
            await GithubService.getAccessToken(searchParams.get('code'));
        },

    }
}
</script>
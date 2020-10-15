<template>
    <header class="flex-row mx-3 ai-center">
        <router-link to="/">
            <h1>enquete.dev</h1>
        </router-link>
        <ul class="flex-item-right flex-row ai-center">
            <li>
                <button class="btn"><i class="material-icons fs-3">help_outline</i></button>
            </li>
            <li class="ml-4">
                <router-link to="/account">
                    {{ labelAuth }}
                </router-link>
            </li>
        </ul>
    </header>
</template>
<script>
export default {
    data() {
        return {
            isLogged: false
        }
    },
    computed: {
        labelAuth() {
            return this.isLogged ? 'Compte' : 'Se connecter';
        }
    }
}
</script>

<style lang="scss" scoped> 
    header {
        height: 50px;
    }
</style>
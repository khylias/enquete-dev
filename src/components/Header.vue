<template>
    <header class="flex-row mx-3 ai-center">
        <h1>enquete.dev</h1>
        <ul class="flex-item-right flex-row">
            <li><a href=""><i class="material-icons">help_outline</i></a></li>
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
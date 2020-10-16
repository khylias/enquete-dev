<template>
    <section class="container mt-6">
        <header class="switch-button flexbox">
        </header>
        <form v-if="login" class="flex-column">
            <div class="mb-2 flex-column">
                <label for="id" class="mb-1">Email</label>
                <input type="text" id="id">
            </div>
            <div class="mb-4 flex-column">
                <label for="pwd" class="mb-1">Mot de passe</label>
                <input type="password" id="pwd">
            </div>

            <button class="btn-primary mb-2" type="submit">Se connecter</button>
            <button class="btn link" @click="login = false">S'inscrire</button>
        </form>
        <form v-else class="flex-column">
            <div class="mb-2 flex-column">
                <label class="mb-1" for="email">Email</label>
                <input type="text" id="email">
            </div>
            <div class="mb-2 flex-column">
                <label class="mb-1" for="username">Pseudo</label>
                <input type="text" id="username">
            </div>
            <div class="mb-2 flex-column">
                <label class="mb-1" for="passwd">Mot de passe</label>
                <input type="password" id="passwd">
            </div>
            <div class="mb-4 flex-column">
                <label class="mb-1" for="passwdConfirm">Mot de passe</label>
                <input type="password" id="passwdConfirm">
            </div>

            <button class="btn-primary mb-2" type="submit">S'inscrire</button>
            <button class="btn link" @click="login = true">Se connecter</button>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            login: true,
            formCreate: {
                email: '',
                username: '',
                password: '',
                passwdConfirm: ''
            }
        }
    },
    computed: {
        strengthPwd() {
            const password = this.formCreate.password;
            let strength = 0;
            if (password.match(/[a-z]+/)) {
                strength += 1;
            }
            if (password.match(/[A-Z]+/)) {
                strength += 1;
            }
            if (password.match(/[0-9]+/)) {
                strength += 1;
            }
            if (password.match(/[$@#&!]+/)) {
                strength += 1;

            }

            return strength;
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        width: 350px;
        background-color: white;
    }

    .switch-button {
        button {
            background-color: transparent;
            border: none;
            width: 50%
        }
    }
    
</style>
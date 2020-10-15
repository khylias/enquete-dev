<template>
    <div class="searchbar-container">
        <div class="searchbar-head">
            <h2>Enquête.dev</h2>
            <p>Les réponses à vos questions sur le métier de dev</p>
        </div>
        <form @submit.prevent="submit" ref="form" class="search-form mb-6 flex-row" :model="form" label-position="top">
            <input class="search-input fs-3" placeholder="Tapez votre question..." v-model="form.keyword"/>
            <button type="submit" class="search-btn" @click="submit"><i class="material-icons">search</i></button>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                keyword: ''
            },
            loading: false
        }
    },
    methods: {
        submit() {
            this.loading = true;

            setTimeout(() => {
                this.loading = false;
            }, 1000)
        },
    }
}
</script>

<style lang="scss" scoped>
    @import '../theme/_variables.scss';

    .searchbar-container {
        background-color: #00a5f8;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='97.2' stroke-opacity='0.06' %3E%3Ccircle fill='%2300a5f8' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23059ff2' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%230b99ed' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%231093e7' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23148de2' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%231787dc' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%231a82d6' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%231d7cd0' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%231f76ca' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%232170c5' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23236bbf' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%232565b9' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%232660b3' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23275aad' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%232854a6' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23294fa0' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%232a499a' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%232a4494' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
        background-attachment: fixed;
        background-size: cover;
        position: relative;
        border-radius: 15px;
        margin-top: 75px;
    }

    .searchbar-head {
        color: $white;
        text-align: center;
        padding: 45px 0 80px;

        h2 {
            font-weight: bold;
            margin-bottom: 5px;
        }
    }

    .search{ 
        &-form {
            box-shadow: 0px 0px 3px 0px #9b9b9b;
            width: 66%;
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            margin: 0 auto;
        }
        &-input {
            width: 100%;
            height: 50px;
            padding: 0 10px;
            border: none;
        }

        &-btn {
            border: none;
            width: 50px;
        }
    }
</style>
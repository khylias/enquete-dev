<template>
  <div>
    <app-header></app-header>
    <search-bar class="container"></search-bar>
    <div class="container px-3">
        <question class="details mb-3" v-for="question in questions" :question="question" :key="question.id"></question>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import SearchBar from './components/SearchBar.vue';
import Question from './components/Question.vue';

export default {
    name: 'App',
      data() {
        return {
            questions: [],
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getQuestions();
        },
        async getQuestions() {
            await this.$http.get('/questions').then(response => this.questions = response.data);
        },
    },
    components: {
        'app-header': Header,
        SearchBar,
        Question
    }
}
</script>

<style lang="scss" scoped>
    .container {
        margin-top: 50px;
    }
</style>
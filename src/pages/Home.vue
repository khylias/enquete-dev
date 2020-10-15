<template>
  <div>
    <search-bar class="container"></search-bar>
    <vs-collapse class="container px-3" type="margin">
        <vs-collapse-item  v-for="(question, index) in questions" :key="question.id" icon-arrow="arrow_downward">
            <template slot="header" @click="open">
                {{ question.label }} <span class="ml-3 fs-2"><i class="material-icons">comment</i> {{ question.nbAnswers }} réponses</span>
            </template>
            <question class="ask mb-3" :question="question" :index="index"></question>
        </vs-collapse-item>
    </vs-collapse>
  </div>
</template>

<script>
import SearchBar from './../components/SearchBar.vue';
import Question from './../components/Question.vue';

export default {
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
        open() {
            console.log('hello')
        }
    },
    components: {
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
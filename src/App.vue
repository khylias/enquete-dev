<template>
  <div>
    <app-header></app-header>
    <form @submit.prevent="submit" ref="form" class="form-search mb-6" :model="form" label-position="top">
        <input class="input-search fs-3" placeholder="" @focus="typedElement.destroy()" v-model="form.keyword"/>
        <button type="submit" class="submit-search" @click="submit"><i class="material-icons">send</i></button>
    </form>
    <div class="container px-3">
        <details class="details mb-3" v-for="(ask, index) in questions" :name="index" :key="ask.id">
            <summary class="ask mb-1 p-3">
                {{ ask.label }} <span class="ml-3 fs-2"><i class="material-icons">comment</i> {{ ask.nbAnswers }} réponses</span>
            </summary>
            <template v-for="(answer, index) in ask.answers"> 
                <div :key="answer.id" class="answer mt-3 mb-2 p-3 pb-5" :class="{'mt-5': index > 0}">
                    <p>{{ answer.content }}</p>
                    <rate-action class="rates" :answer="answer"></rate-action>
                </div>
            </template>
        </details>
    </div>
  </div>
</template>

<script>
import RateAction from './components/RateAction.vue';
import Header from './components/Header.vue';
import Typed from 'typed.js';

export default {
  name: 'App',
  data() {
    return {
      form: {
        keyword: ''
      },
      options: {
        strings: ['Quelle formation pour un dev ?', 'La journée type...', 'Salarié ou freelance ?', 'Tapez votre question...'],
        typeSpeed: 60,
        backSpeed: 10
      },
      typedElement: null,
      loading: false, 
      questions: [],
    }
  },
  created() {
        this.init();
  },
  mounted() {
    this.typedElement = new Typed('.input-search', this.options);
  },
  methods: {
    init() {
        this.getQuestions();
    },
    async getQuestions() {
        await this.$http.get('/questions').then(response => this.questions = response.data);
    },
    submit() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
      }, 1000)
    },
  },
  components: {
    RateAction,
    'app-header': Header
  }
}
</script>
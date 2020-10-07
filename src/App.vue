<template>
  <div>
    <app-header></app-header>
      <form @submit.prevent="submit" ref="form" :model="form" label-position="top">
          <input class="input-search" placeholder="" v-model="form.keyword"/>
          <button type="submit" @click="submit">Rechercher</button>
      </form>
      <div class="container">
          <details v-for="(ask, index) in questions" :name="index" :key="ask.id">
            <summary>
              {{ ask.label }} <span class="title-response"><i class="el-icon-edit"></i> {{ ask.nbAnswers }} réponses</span>
            </summary>
            <div>
                <template v-for="(answer) in ask.answers"> 
                  <div :key="answer.id">
                    <p>{{ answer.content }}</p>
                    <rate-action :answer="answer"></rate-action>
                  </div>
                </template>
            </div>
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
      questions: [
        {
          id: 1,
          label: 'Journée type du développeur',
          nbAnswers: 110,
          answers: [
            {
              id: 2,
              content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ad facilis odit, totam, eius ex sit nam, ut exercitationem in doloremque perspiciatis quam asperiores consectetur aliquam ipsam dicta ratione quod',
              rate: 14
            },
            {
              id: 3,
              content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ad facilis odit, totam, eius ex sit nam, ut exercitationem in doloremque perspiciatis quam asperiores consectetur aliquam ipsam dicta ratione quod',
              rate: 0
            },
            {
              id: 5,
              content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ad facilis odit, totam, eius ex sit nam, ut exercitationem in doloremque perspiciatis quam asperiores consectetur aliquam ipsam dicta ratione quod',
              rate: -20
            }
          ]
        },
        {
          id: 2,
          label: 'Formation suivie',
          nbAnswers: 4,
        }
      ],
    }
  },
  mounted() {
    this.typedElement = new Typed('.input-search', this.options);
  },
  methods: {
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

<style lang="scss">
.el-collapse {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.title-response {
  margin-left: 14px;
}

details summary::-webkit-details-marker {
  display: none;
}

</style>

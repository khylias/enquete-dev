<template>
  <el-main id="app">
     <el-row>
      <el-col :span="12" :offset="6">
        <el-form @submit.prevent.native="submit" ref="form" :model="form" label-position="top">
          <el-form-item label="Votre question :">
            <el-input placeholder="" v-model="form.keyword"/>
          </el-form-item>
          <el-button type="submit" @click="submit">Rechercher</el-button>
        </el-form>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-container v-loading="loading" v-model="activesQuestions">
      <el-collapse>
        <el-collapse-item v-for="(ask, index) in questions" :key="ask.id" :name="index">
          <template v-slot:title>{{ ask.label }} <span class="title-response"><i class="el-icon-edit"></i> {{ ask.nbAnswers }} réponses</span></template>
          <div v-for="(answer, index) in ask.answers" :key="index">
            <p>{{ answer.content }}</p>
            <rate-action :answer="answer"></rate-action>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-container>
  </el-main>
</template>

<script>
import RateAction from './components/RateAction.vue';
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
      activesQuestions: [],
    }
  },
  mounted() {
    this.typedElement = new Typed('.el-input__inner', this.options);
  },
  methods: {
    submit() {
      console.log(this.form.keyword);
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
      }, 1000)
    },
  },
  components: {
    RateAction
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
</style>

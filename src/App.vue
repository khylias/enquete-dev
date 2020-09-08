<template>
  <el-main id="app">
     <el-row>
      <el-col :span="12" :offset="6">
        <el-form @submit.prevent.native="submit" ref="form" :model="form" label-position="top">
          <el-form-item label="Votre question :">
            <el-input placeholder="" v-model="form.keyword"/>
          </el-form-item>
          <el-button type="submit">Rechercher</el-button>
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
            <el-button :type="hasRateDown(answer.id) ? 'danger': 'default'" size="mini" @click="decrementRate(answer)" :disabled="hasRateDown(answer.id)"><i class="el-icon-remove-outline"></i></el-button>
            <el-tag :type="getTypeRated(answer.rate)">{{ answer.rate }}</el-tag>
            <el-button :type="hasRateUp(answer.id) ? 'success': 'default'" size="mini" @click="incrementRate(answer)" :disabled="hasRateUp(answer.id)"><i class="el-icon-circle-plus-outline"></i></el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-container>
  </el-main>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      form: {
        keyword: ''
      },
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
      storageKey: {
        rated: 'enquete.dev:rated'
      }
    }
  },
  methods: {
    submit() {
      console.log(this.form.keyword);
    },
    getTypeRated(rate) {
      if(rate > 0) return 'success';
      if(rate < 0) return 'warning';
      return 'info';
    },
    incrementRate(answer) {
      answer.rate++;
      this.setStorageRate(answer.id, 'up');
    },
    decrementRate(answer) {
      answer.rate--;
      this.setStorageRate(answer.id, 'down');
    },
    setStorageRate(id, state) {
      let alreadyRated = JSON.parse(localStorage.getItem(this.storageKey.rated));
      const rateIndex = alreadyRated?.findIndex(rate => rate.id === id);
      console.log(rateIndex);
      if(alreadyRated && alreadyRated.length) {
        if(rateIndex !== -1) {
          alreadyRated[rateIndex].state = state;
        } else {
          alreadyRated.push({ id, state: state });
        }
        localStorage.setItem(this.storageKey.rated, JSON.stringify(alreadyRated));
      } else {
        localStorage.setItem(this.storageKey.rated, JSON.stringify([{ id, state: state }]));
      }
    },
    getStorageRate() {
      return JSON.parse(localStorage.getItem(this.storageKey.rated));
    },
    hasRateUp(id) {
      const rated = this.getStorageRate();
      const rate = rated?.find(rate => rate.id === id);
      return rate && rate?.state === 'up';
    },
    hasRateDown(id) {
      const rated = this.getStorageRate();
      const rate = rated?.find(rate => rate.id === id);
      return rate && rate?.state === 'down';
    }
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

<template>
  <div>
    {{ question.title }}
    <p v-for="answer in answers" :key="answer.slug">
        <nuxt-content :document="answer"/>
    </p>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const question = await $content('questions', params.question).fetch();
    const answers = await $content('answers')
      .where({
        'question': {
          $eq: params.question
        }
      })
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      question,
      answers,
    }
  },
  data() {
      return {
          question: {}
      }
  }
}
</script>

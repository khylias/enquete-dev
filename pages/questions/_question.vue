<template>
  <div>
    <div class="text-center">
      <h2
        class="
          text-4xl
          tracking-tight
          font-extrabold
          text-gray-900
          sm:text-5xl
          md:text-6xl
        "
      >
        <span class="block"> {{ question.title }}</span>
      </h2>
    </div>

    <div class="grid grid-cols-3 gap-4 mt-24">
        <div v-for="answer in answers" :key="answer.slug" class="border w-full bg-white dark:bg-gray-800 shadow-lg mx-auto rounded-xl p-4">
            <nuxt-content :document="answer" class="text-gray-600 dark:text-white"/>
            <div class="flex items-center mt-4">
                <div class="flex flex-col ml-2 justify-between">
                    <span class="font-semibold text-indigo-500 text-sm">
                        Jean Miguel
                    </span>
                </div>
            </div>
        </div>
    </div>

    <p v-for="answer in answers" :key="answer.slug">
    </p>
  </div>
</template>

<script>
export default {
  layout: 'question',
  async asyncData({ $content, params }) {
    const question = await $content('questions', params.question).fetch()
    const answers = await $content('answers')
      .where({
        question: {
          $eq: params.question,
        },
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
      question: {},
    }
  },
}
</script>

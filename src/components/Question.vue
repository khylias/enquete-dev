<template>
    <div class="details mb-3">
        <answer class="ask-details" :style="`--animation-delay:${index}`" v-for="(answer, index) in question.answers" :key="index" :answer="answer"></answer>
    </div>
</template>

<script>
import Answer from './Answer.vue';
export default {
    props: {
        question: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            open: false
        }
    },
    methods: {
        toggleDetails() {
            setTimeout(() => {
                this.open = !this.open
            }, 2000);
        }
    },
    components: {
        Answer
    }
}
</script>

<style lang="scss" scoped>
    .ask-details {
       opacity: 0;
       transform: translate3d(0);
    }
</style>
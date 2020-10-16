<template>
    <div class="mb-3">
        <answer class="ask-details" :style="`--animation-delay:${index}`" v-for="(answer, index) in question.answers" :key="index" :answer="answer"></answer>
        <reply @reply="addReply" :questionIndex="index" :questionId="question.id"></reply>
    </div>
</template>

<script>
import Answer from './Answer.vue';
import Reply from './Reply.vue';
export default {
    props: {
        question: {
            type: Object,
            required: true
        },
        index: {
            type: Number
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
        },
        addReply(content) {
            this.question.answers.push(content);
        }
    },
    components: {
        Answer,
        Reply
    }
}
</script>

<template>
    <details class="details mb-3" :class="{'open': open}" @click="toggleDetails">
        <summary class="ask mb-1 p-3">
            {{ question.label }} <span class="ml-3 fs-2"><i class="material-icons">comment</i> {{ question.nbAnswers }} réponses</span>
        </summary>
        <answer class="ask-details" v-for="(answer, index) in question.answers" :key="index" :answer="answer"></answer>
    </details>
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
    @import '../theme/_variables.scss';
    details summary::-webkit-details-marker {
        display: none;
    }

    details.open {
        .ask-details {
            opacity: 1;
            transform: translateY(0px); // implicit, but good to specify explicitly
        }
    }

    .ask {
        background-color: lighten($color: $darkColor, $amount: 5) ;
        color: $white;
        border-radius: 5px;

        &-details {
            opacity: 0;
            animation: 1s ease-in-out forwards fadeInDown;
        }
    }

    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translate3d(0, -100%, 0);
        }

        to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
    }
</style>
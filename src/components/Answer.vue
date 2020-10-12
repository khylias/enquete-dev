<template>
    <div class="answer mt-3 mb-2 p-3 flex-row" :class="{'mt-5': index > 0}">
        <rate-action class="rates" :answer="answer"></rate-action>
        <p class="ml-2">{{ answer.content }}</p>
    </div>
</template>

<script>
import RateAction from './RateAction.vue';
export default {
    props: {
        answer: {
            type: Object,
            required: true
        }
    },
    components: {
        RateAction
    }
}
</script>

<style lang="scss" scoped>
    @import '../theme/_variables.scss'; 
    .answer {
        background-color: $tonicColor;
        border-radius: 5px;
        margin: 20px 15px 0;
        position: relative;

        &:before {
            content: '';
            position: absolute;
            border: 8px solid transparent;
            top: -16px;
            left: 8px;
            border-bottom-color: $tonicColor;
        }
    }
</style>
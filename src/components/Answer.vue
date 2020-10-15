<template>
    <div class="answer mt-3 mb-2 p-3 flex-row" :class="{'is-new': answer.isNew}">
        <!-- <rate-action class="rates" :answer="answer"></rate-action> -->
        <p class="ml-2">{{ answer.content }}</p>
    </div>
</template>

<script>
// import RateAction from './RateAction.vue';
export default {
    props: {
        answer: {
            type: Object,
            required: true
        }
    },
    components: {
        // RateAction
    }
}
</script>

<style lang="scss" scoped>
    @import '../theme/_variables.scss'; 
    .answer {
        background-color: $rice;
        border-radius: 5px;
        margin: 20px 0;
        position: relative;
        color: $black;

        &:before {
            content: '';
            position: absolute;
            border: 8px solid transparent;
            top: -16px;
            left: 8px;
            border-bottom-color: $rice;
        }

        &.is-new {
            background-color: $tonicColor;
            color: $white;

            &:before {
                border-bottom-color: $tonicColor;
                bottom: 10px;
                right: -16px;
                top: unset;
                left: unset;
                transform: rotate(90deg);
            }
        }
    }
</style>
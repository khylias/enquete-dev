<template>
    <div class="flexbox">
        <button class="material-icons flex-item-right btn-primary btn-round fs-4" v-if="showAction" @click="toggleAction">insert_comment</button>
        <form class="reply flex-column" v-else @submit.prevent="submit">
            <textarea v-model="reply" name="reply" class="reply-content p-2" placeholder="Votre réponse..."></textarea>
            <div class="flex-item-right flex-row mt-2">
                <button type="button" class="btn flex-item-left" @click="showAction = true">Annuler</button>
                <button type="submit" class="btn-primary btn-icon flex-row jc-center ai-center"><span>Répondre</span> <i class="material-icons ml-1">send</i></button> 
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        questionIndex: {
            type: Number
        }
    },
    data() {
        return {
            showAction: true,
            reply: ''
        }
    },
    methods: {
        submit() {
            console.log('submit');
            this.$emit('reply', this.reply);
        },
        toggleAction() {
            console.log(document.getElementsByClassName('vs-collapse-item--content'));
            this.showAction = !this.showAction;
            setTimeout(() => {
                document.getElementsByClassName('vs-collapse-item--content')[this.questionIndex].scrollTo({
                    top: document.getElementsByClassName('vs-collapse-item--content')[this.questionIndex].scrollHeight,
                    behavior: 'smooth'
                });
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../theme/_variables.scss'; 

    .reply-content {
        background-color: $white;
        border-radius: 5px;
        min-height: 100px;
        resize: vertical;
    }

    .reply,
    .reply-content,
    .reply > div  {
        width: 100%
    }
</style>
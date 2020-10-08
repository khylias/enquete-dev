<template>
    <div>
        <button class="rate fs-1" 
                :class="{'active': hasRate}" 
                @click="incrementRate(answer)">
                {{ answer.rate }}
        </button>
    </div>    
</template>
<script>
import Storage from '../services/storage';
export default {
    props: {
        answer: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            localStore: new Storage('enquete.dev:rated')
        }
    },
    computed: {
        hasRate() {
            return !!this.getRateById();
        },
    },
    methods: {
        incrementRate() {
            this.answer.rate++;
            this.setStorageRate(this.answer.id);
        },
        setStorageRate() {
            let alreadyRated = this.localStore.getStorageItem();
            const rateIndex = alreadyRated?.findIndex(rate => rate === this.answer.id);
            if(alreadyRated && alreadyRated.length) {
                console.log(alreadyRated, rateIndex);
                if(rateIndex !== -1) {
                    alreadyRated[rateIndex] = this.answer.id;
                } else {
                    alreadyRated.push(this.answer.id);
                }
                this.localStore.setStorageItem(alreadyRated);
            } else {
                this.localStore.setStorageItem([this.answer.id]);
            }
        },
        getRateById() {
            const rated = this.localStore.getStorageItem();
            const rate = rated?.includes(this.answer.id);
            return rate;
        } 
    }
}
</script>

<style lang="scss" scoped>
    @import '../theme/_variables';
    .rate {
        background-color: darken($color: $darkColor, $amount: 10);
        border-radius: 8px;
        height: 20px;
        padding: 2px 8px;
        border: none;
        transition: all 0.25s;
        cursor: pointer;

        &:hover,
        &.active {
            background-color: $tonicColor;
            color: $white;
        }
    }

</style>
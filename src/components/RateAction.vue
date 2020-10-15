<template>
    <div>
        <button class="rate flex-row ai-center" 
                :class="{'active': hasRate}" 
                @click="incrementRate(answer)">
                <i class="material-icons trending-up fs-3">trending_flat</i>
                <span>{{ answer.rate }}</span>
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
        background-color: transparent;
        border: none;
        color: $white;
        height: 100%;
        &:hover {
            cursor: pointer;
            .trending-up {
                transform: rotate(-90deg) translateX(2px);
            }
        }
    }

    .trending-up {
        transform: rotate(-90deg);
        transition: all .3s ease;
    }
 
</style>
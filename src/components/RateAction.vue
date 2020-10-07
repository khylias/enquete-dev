<template>
    <div>
        <button :class="hasRateByState(answer.id, 'down') ? 'danger': 'default'" @click="decrementRate(answer)" :disabled="hasRateByState(answer.id, 'down')">-</button>
        <div class="tag tag--mini" :type="getTypeRated(answer.rate)">{{ answer.rate }}</div>
        <button :class="hasRateByState(answer.id, 'up') ? 'success': 'default'" @click="incrementRate(answer)" :disabled="hasRateByState(answer.id, 'up')">+</button></div>    
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
    methods: {
        getTypeRated(rate) {
            if(rate > 0) return 'success';
            if(rate < 0) return 'warning';
            return 'info';
        },
        incrementRate(answer) {
            answer.rate++;
            this.setStorageRate(answer.id, 'up');
        },
        decrementRate(answer) {
            answer.rate--;
            this.setStorageRate(answer.id, 'down');
        },
        setStorageRate(id, state) {
            let alreadyRated = this.localStore.getStorageItem();
            const rateIndex = alreadyRated?.findIndex(rate => rate.id === id);
            if(alreadyRated && alreadyRated.length) {
                if(rateIndex !== -1) {
                alreadyRated[rateIndex].state = state;
                } else {
                alreadyRated.push({ id, state: state });
                }
                this.localStore.setStorageItem(alreadyRated);
            } else {
                this.localStore.setStorageItem([{ id, state: state }]);
            }
        },
        hasRateByState(id, state) {
            return this.getRateById(id) && this.getRateById(id)?.state === state;
        },
        getRateById(id) {
            const rated = this.localStore.getStorageItem();
            const rate = rated?.find(rate => rate.id === id);
            return rate;
        } 
    }
}
</script>
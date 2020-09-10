<template>
    <div>
        <el-button :type="hasRateByState(answer.id, 'down') ? 'danger': 'default'" size="mini" @click="decrementRate(answer)" :disabled="hasRateByState(answer.id, 'down')"><i class="el-icon-remove-outline"></i></el-button>
        <el-tag :type="getTypeRated(answer.rate)">{{ answer.rate }}</el-tag>
        <el-button :type="hasRateByState(answer.id, 'up') ? 'success': 'default'" size="mini" @click="incrementRate(answer)" :disabled="hasRateByState(answer.id, 'up')"><i class="el-icon-circle-plus-outline"></i></el-button></div>    
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
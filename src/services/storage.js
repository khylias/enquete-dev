export default class Storage {
    constructor(key) {
        this.key = key;
    }
    
    getStorageItem() {
        return JSON.parse(localStorage.getItem(this.key));
    }

    setStorageItem(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }
}
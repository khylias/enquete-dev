import Storage from './storage';

const authStorage = new Storage('enquete.dev:auth_token')
const isAuthenticate = () => {
    console.log(!!authStorage.getStorageItem())
    return !!authStorage.getStorageItem();
}

export {
    isAuthenticate
}
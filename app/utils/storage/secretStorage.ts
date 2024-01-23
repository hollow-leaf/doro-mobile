import * as SecureStore from 'expo-secure-store';

export async function secretSave(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}

export async function loadSecretValue(key: string) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result
    } else {
        alert('Not created the Mina key yet');
        return ""
    }
}

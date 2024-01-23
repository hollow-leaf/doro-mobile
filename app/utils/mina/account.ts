import { secretSave, loadSecretValue } from "../storage"

export const generateKey = () => {
    secretSave("MinaKey", "TEMPKEY").then(() => {
        console.log("Generate Wallet")
        return "TEMPKEY"
    }).catch(function (error) {
        console.log(error);
    });
}

export const getMinaWallet = async () => {
    const privateKey = await loadSecretValue("MinaKey")
    if (privateKey != "") {
        return {
            // pub: PrivateKey.fromBase58(privateKey).toPublicKey(),
            pub: "",
            key: privateKey
        }
    }
    return null

}
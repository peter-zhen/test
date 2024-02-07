import erc20Abi from "../abi/usdtAbi.json";
export const enum ERC20INFO {
  USDT = "USDT",
  USDTgoerli = "USDTgoerli",
  USDTpolygon = "USDTpolygon",
}
export const erc20Info = {
  [ERC20INFO.USDT]: {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    abi: erc20Abi,
    decimals: 6
  },
  [ERC20INFO.USDTgoerli]: {
    address: '0x6b52e40149a500eDdE2B6A6f6aaF03e3c7435185',
    abi: erc20Abi,
    decimals: 6
  }
}

export const trc20Info = {
  [ERC20INFO.USDT]: {
    address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    abi: erc20Abi,
    decimals: 6
  },
}

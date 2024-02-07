/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - -  */
/* This file will contains functions for manaing a tron grid networks             (c) Sachin Suthar 2002-2019  */
/*                                                                                                ISC Licence  */
/* https://www.trongrid.io/                                                                                       */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - -  */
/* eslint no-irregular-whitespace: [2, { skipComments: true }] */

const tronWeb = window.tronWeb;

/**
 * Sending raw  transaction of tron network
 *  - This api will transaction info object. Containing a transaction details .
 *
 * @private
 * @returns {object} apdapter . TronLink Adapter
 * @returns {string} contractAddress .   Contract Address
 * @returns {amount} amount. Amount in TRX
 */

const onSignTransaction = async (
  adapter: any,
  contractAddress: any,
  amount: number
) => {
  try {
    const tronWeb = (window.tron as any).tronWeb as any;
    const transaction = await tronWeb.transactionBuilder.sendTrx(
      contractAddress,
      tronWeb.toSun(amount),
      adapter.address
    );
    const signedTransaction = await adapter.signTransaction(transaction);
    const res = await tronWeb.trx.sendRawTransaction(signedTransaction);
    console.log("Sign Tron Transaction Successfully", res);
    return res;
  } catch (err) {
    console.log("An error occured when sending a raw transaction. ", err);
    return null;
  }
};

/**
 * Getting an account balance  from tron network
 *  - This api will return balance in TRX .
 *
 * @private
 * @returns {string} account . Account Address
 */

export const getBalance = async (tronWeb: any,address: string) => {
  try {
    return await tronWeb.trx
      .getBalance(address)
      .then((balance: number) => {
        const toTrxBalance = tronWeb.fromSun(balance);
        return toTrxBalance;
      })
      .catch(() => {
        return 0;
      });
  } catch (error) {
    return 0;
  }
};

/**
 *    This function will be used to get a balance from tron network. This will generate a smart contract and fetch current balance
 *  - This api will return balance in SUN .
 *
 * @private
 * @returns {string} account . Account Address
 */

export const tringgerSmartContract = async (account: string) => {
  try {
    const contract = await tronWeb.contract().at(account);
    const result = await contract.balanceOf(account).call();
    console.log("Get balance", result);
    return result / 1000000;
  } catch (error) {
    console.log(
      "An error occured when fetching account balance from tron network",
      error
    );
    return null;
  }
};

export default {
  onSignTransaction,
  getBalance,
  tringgerSmartContract,
  tronWeb,
};

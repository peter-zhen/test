import React, { useState, useEffect } from "react";

import ReactGA from "react-ga4";
import { event } from "../../utils/gtag";
import { useNavigate } from "react-router";

import {
  ConnectionsEnum,
  useConnectionType,
} from "../../providers/ConnectionTypeProvider";
import { usePayment } from "../../providers/PaymentProvider";

import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import { Tabs } from "./components/Tabs";
import { TabContent } from "./components/TabContent/TabContent";
import { SubmitButton } from "./components/SubmitButton";
import { Heading } from "./components/Heading/Heading";
import { CalculatePayment } from "./components/CalculatePayment/CalculatePayment";
import { CustomParagraph } from "../../components/customs";
import { PaymentInformation } from "./components/PaymentInformation";
import { FullScreenLoading } from "../../components/loadings/FullScreenLoading/FullScreenLoading";

import { validateDonation } from "../../utils/validations";

import {
  CURRENCIES_TRC,
  CURRENCIES_ERC,
  CurrencyType,
  CurrencyDataType,
  CurrencyEnum,
} from "../../constant";

import "./styles.css";

const MEASUREMENT_ID = "G-LTMZH3LQ6K";
ReactGA.initialize(MEASUREMENT_ID ? MEASUREMENT_ID : "");

const TAB_CONTENT_LIST: CurrencyType[] = [CURRENCIES_TRC, CURRENCIES_ERC];

const HomePage = () => {
  const navigate = useNavigate();
  const { changeConnectionType, isRedirecting, connectionType } = useConnectionType();

  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { quantity, handleQuantityChange } = usePayment();

  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );
  const [selectedOptionValue, setSelectedOptionValue] =
    useState<CurrencyDataType | null>(null);

  const SELECTED_TAB = TAB_CONTENT_LIST[selectedTab - 1];

  useEffect(() => {
    ReactGA.event({
      action: "载入钱包页面",
      category: "钱包页面",
      label: `${selectedOptionValue?.id}`,
      value: parseInt(quantity),
    });
  }, []);

  useEffect(() => {
    if (isConnected) {
      changeConnectionType(ConnectionsEnum.Eth);
      navigate("/payment");
    }
  }, [isConnected, navigate, changeConnectionType]);

  const handleTabChange = (id: number) => {
    setSelectedTab(id);
    setSelectedOptionIndex(null);
    setSelectedOptionValue(null);
  };

  const handleOptionChange = (
    optionIndex: number,
    optionValue: CurrencyDataType
  ) => {
    setSelectedOptionIndex(optionIndex);
    setSelectedOptionValue(optionValue);
  };

  const handleValidate = () => {
    event({action: 'connectWallet',describe: `Connect wallet to ${connectionType}`, label: 'walletName', value: selectedOptionValue?.title })
    validateDonation(quantity, selectedOptionIndex, handleSubmit);
  };

  const handleSubmit = () => {
    ReactGA.event({
      action: "唤起钱包",
      category: "钱包页面",
      label: "钱包编号: " + selectedOptionValue?.id,
      value: parseInt(quantity),
    });

    handleDonation();
  };

  const handleDonation = () => {
    const currencyHandlers = {
      [CurrencyEnum.Erc]: handleErc,
      [CurrencyEnum.Trc]: handleTrc,
    };

    const selectedHandler = currencyHandlers[SELECTED_TAB.type];

    if (selectedHandler) selectedHandler();
  };

  const handleErc = () => {
    if (selectedOptionValue?.id == 10 || selectedOptionValue?.id == 9) {
      changeConnectionType(ConnectionsEnum.Eth);
      window.location.href = selectedOptionValue.deeplink!;
    } else {
      open();
    }
  };

  const handleTrc = () => {
    const queryParameterWithAmpersand = `&qty=${quantity}`;
    const encodedQuery = encodeURIComponent(queryParameterWithAmpersand);
    let deeplinkURL = "";

    if (selectedOptionValue?.params) {
      deeplinkURL =
        selectedOptionValue?.id === 7 || selectedOptionValue?.id === 13
          ? selectedOptionValue?.deeplink!.replace("donatenumber", quantity)
          : selectedOptionValue
              ?.deeplink!.replace("donatenumber", quantity)
              .replace("&", "%26");
    } else {
      deeplinkURL = selectedOptionValue?.deeplink + encodedQuery;
    }

    changeConnectionType(ConnectionsEnum.Trc);
    window.location.href = deeplinkURL;
  };

  if (isRedirecting) {
    return <FullScreenLoading />;
  }

  return (
    <div className="homepage-container">
      <Heading />
      <CalculatePayment
        quantity={quantity}
        handleChange={handleQuantityChange}
      />
      <PaymentInformation suffix={SELECTED_TAB.type} />
      <TabContent
        tabContentData={SELECTED_TAB.data}
        selectedOptionIndex={selectedOptionIndex}
        handleOptionChange={handleOptionChange}
      />
      <CustomParagraph className="homepage-footer-text">
      建议使用谷歌或手机自带浏览器，连接Metamask, Trust wallet, Imtoken等钱包app应用后请返回浏览器完成支付
      </CustomParagraph>
      <Tabs handleChange={handleTabChange} selectedTab={selectedTab} />
      <SubmitButton onSubmit={handleValidate} />
      <CustomParagraph className="homepage-footer-text">
        由于国内渠道风控严重，我们目前只接受TRC-20和ERC-20代币的支付。
      </CustomParagraph>
    </div>
  );
};

export default HomePage;

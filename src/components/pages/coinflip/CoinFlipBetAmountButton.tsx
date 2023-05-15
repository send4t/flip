import { useEtherBalance, useEthers } from '@usedapp/core';
import { utils } from 'ethers/lib/ethers';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { getNetworkLogo } from '@/lib/helpers';

import Button from '@/components/buttons/Button';

import { useCoinFlipContext } from '@/contexts/CoinFlipContext';
import { useCurrentNetworkContext } from '@/contexts/CurrentNetwork';

interface CoinFlipBetAmountButtonPropsType {
  betAmount: number;
  setCurrentSelectedBetAmount: (betAmount: number) => void;
  isCurrentSelectedBetAmount: boolean;
}
const CoinFlipBetAmountButton = (props: CoinFlipBetAmountButtonPropsType) => {
  const { betAmount, setCurrentSelectedBetAmount, isCurrentSelectedBetAmount } = props;
  const { coinFlipState } = useCoinFlipContext();
  const { account } = useEthers();
  const { currentNetwork } = useCurrentNetworkContext();
  const accountBalance = useEtherBalance(account);
  const doesPlayerHasInsufficiantBalanceForBet =
    accountBalance && parseFloat(utils.formatEther(accountBalance)) < betAmount;
  const doesSCHasInsufficiantBalanceForBet = betAmount >= coinFlipState.maxPoolBetAmount;
  const [isHover, setIsHover] = useState(false);
  const isDisabled = doesSCHasInsufficiantBalanceForBet || doesPlayerHasInsufficiantBalanceForBet;

  const onButtonClick = () => {
    if (doesSCHasInsufficiantBalanceForBet) {
      toast.dark(`Insufficient smart contract balance to allow this bet amount`, {
        type: toast.TYPE.WARNING,
      });
    } else if (doesPlayerHasInsufficiantBalanceForBet) {
      toast.dark(`Insufficient ${currentNetwork.currencySymbol} balance in your account`, {
        type: toast.TYPE.WARNING,
      });
    } else {
      setCurrentSelectedBetAmount(betAmount);
    }
  };
  return (
    <Button
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      variant={isCurrentSelectedBetAmount ? 'outline' : 'primary'}
      onClick={onButtonClick}
      className={`box-border flex w-full justify-center text-xs uppercase text-white md:text-lg  ${
        isDisabled && isHover ? 'text-[0.55em]' : ''
      } ${isDisabled ? 'bg-moonbeam-grey-light text-white' : 'font-bold '}`}
    >
      {doesSCHasInsufficiantBalanceForBet && isHover ? (
        <div className='text-xs'>Insufficient pool balance</div>
      ) : doesPlayerHasInsufficiantBalanceForBet && isHover ? (
        'Insufficient balance'
      ) : (
        <div className='flex items-center justify-center'>
          <div className='mr-3 scale-[1.2] md:scale-[1.5]'>{getNetworkLogo(currentNetwork.network.chainId)}</div>
          {betAmount} {currentNetwork.currencySymbol}
        </div>
      )}
    </Button>
  );
};

export default CoinFlipBetAmountButton;

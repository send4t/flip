import { addressEqual, useEthers } from '@usedapp/core';
import Image from 'next/image';
import React from 'react';

import ticketBody from '../../../../public/images/ticket-body.png';
import ticketHead from '../../../../public/images/ticket-head.png';
import ticketHeadOwned from '../../../../public/images/ticket-head-owned.png';

import { RaffleTicketType } from '@/types';

interface RaffleTicketPropsType {
  ticket: RaffleTicketType;
  toggleSelectedRaffleTickets: (ticket: RaffleTicketType) => void;
  removeHead?: boolean;
  displayShimmer?: boolean;
}
const RaffleTicket = (props: RaffleTicketPropsType) => {
  const { ticket, toggleSelectedRaffleTickets, removeHead, displayShimmer } = props;
  const { account } = useEthers();

  const renderRaffleTicketHead = () => {
    const isRaffleTicketOwnedByCurrentAccount = account && ticket.owner && addressEqual(ticket.owner, account);

    return (
      <div className='absolute flex h-[210px] min-w-[100px] drop-shadow-[0_9px_3px_rgba(255,255,255,0.10)] md:h-[350px] md:min-w-[170px]'>
        {isRaffleTicketOwnedByCurrentAccount && (
          <div className='absolute left-[14px] top-[23px] z-10 font-secondary text-sm font-bold text-white md:top-[35px] md:left-[40px] md:text-lg'>
            Your Ticket
          </div>
        )}
        <div className='absolute left-[18px] top-[40px] z-10 font-secondary text-xs text-white md:top-[60px] md:left-[40px] md:text-base'>
          No. :{String(ticket.id).padStart(6, '0')}
        </div>
        <Image
          src={isRaffleTicketOwnedByCurrentAccount ? ticketHeadOwned : ticketHead}
          layout='fill'
          objectFit='contain'
          alt=''
        />
      </div>
    );
  };

  const renderRaffleTicketBody = () => {
    return (
      <div
        className={`absolute flex h-[210px] min-w-[100px] transition-all duration-150 md:min-w-[170px] ${
          ticket.isSelected || removeHead ? 'mt-4 md:mt-8' : 'md:hover:mt-8'
        } ${
          displayShimmer ? ' brightness-0' : 'cursor-pointer drop-shadow-[0_9px_3px_rgba(255,255,255,0.10)]'
        } " md:h-[350px]`}
      >
        <div className='absolute left-[25px] top-[130px] z-10 rotate-270 font-secondary text-xs text-white md:top-[240px] md:left-[50px] md:text-xl'>
          No. :{String(ticket.id).padStart(6, '0')}
        </div>
        <Image src={ticketBody} layout='fill' objectFit='contain' alt='' />
      </div>
    );
  };

  if (ticket.owner) {
    return (
      <div className='relative flex h-[210px] min-w-[100px] md:h-[350px] md:min-w-[170px]'>
        {renderRaffleTicketHead()}
      </div>
    );
  }

  // RaffleTicket is not owned
  return (
    <div
      onClick={() => !displayShimmer && toggleSelectedRaffleTickets(ticket)}
      className='relative flex h-[240px] min-w-[100px] md:h-[390px] md:min-w-[170px]'
    >
      {!removeHead && renderRaffleTicketHead()}
      {renderRaffleTicketBody()}
    </div>
  );
};

export default RaffleTicket;

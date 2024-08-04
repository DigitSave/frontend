import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  SavingsAccountOwnershipTransfered,
  SavingsContractCreated
} from "../generated/DigitSaveFactory/DigitSaveFactory"

export function createSavingsAccountOwnershipTransferedEvent(
  oldUser: Address,
  newOwner: Address,
  date: BigInt
): SavingsAccountOwnershipTransfered {
  let savingsAccountOwnershipTransferedEvent =
    changetype<SavingsAccountOwnershipTransfered>(newMockEvent())

  savingsAccountOwnershipTransferedEvent.parameters = new Array()

  savingsAccountOwnershipTransferedEvent.parameters.push(
    new ethereum.EventParam("oldUser", ethereum.Value.fromAddress(oldUser))
  )
  savingsAccountOwnershipTransferedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )
  savingsAccountOwnershipTransferedEvent.parameters.push(
    new ethereum.EventParam("date", ethereum.Value.fromUnsignedBigInt(date))
  )

  return savingsAccountOwnershipTransferedEvent
}

export function createSavingsContractCreatedEvent(
  user: Address,
  savingsContract: Address,
  date: BigInt
): SavingsContractCreated {
  let savingsContractCreatedEvent = changetype<SavingsContractCreated>(
    newMockEvent()
  )

  savingsContractCreatedEvent.parameters = new Array()

  savingsContractCreatedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  savingsContractCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "savingsContract",
      ethereum.Value.fromAddress(savingsContract)
    )
  )
  savingsContractCreatedEvent.parameters.push(
    new ethereum.EventParam("date", ethereum.Value.fromUnsignedBigInt(date))
  )

  return savingsContractCreatedEvent
}

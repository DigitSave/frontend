import {
  SavingsAccountOwnershipTransfered as SavingsAccountOwnershipTransferedEvent,
  SavingsContractCreated as SavingsContractCreatedEvent
} from "../generated/DigitSaveFactory/DigitSaveFactory"
import {
  SavingsAccountOwnershipTransfered,
  SavingsContractCreated
} from "../generated/schema"

export function handleSavingsAccountOwnershipTransfered(
  event: SavingsAccountOwnershipTransferedEvent
): void {
  let entity = new SavingsAccountOwnershipTransfered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldUser = event.params.oldUser
  entity.newOwner = event.params.newOwner
  entity.date = event.params.date

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSavingsContractCreated(
  event: SavingsContractCreatedEvent
): void {
  let entity = new SavingsContractCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.savingsContract = event.params.savingsContract
  entity.date = event.params.date

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

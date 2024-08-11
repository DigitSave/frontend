import {
  AssetAdded as AssetAddedEvent,
  AssetToppedUp as AssetToppedUpEvent,
  AssetWithdrawn as AssetWithdrawnEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  SavingCompleted as SavingCompletedEvent,
  SavingCreated as SavingCreatedEvent,
} from "../generated/DigitSaveAccount/DigitSaveAccount"
import {
  AssetAdded,
  AssetToppedUp,
  AssetWithdrawn,
  OwnershipTransferred,
  SavingCompleted,
  SavingCreated,
} from "../generated/schema"

export function handleAssetAdded(event: AssetAddedEvent): void {
  let entity = new AssetAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.assetId = event.params.assetId
  entity.date = event.params.date
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAssetToppedUp(event: AssetToppedUpEvent): void {
  let entity = new AssetToppedUp(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.assetId = event.params.assetId
  entity.date = event.params.date
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAssetWithdrawn(event: AssetWithdrawnEvent): void {
  let entity = new AssetWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.savingId = event.params.savingId
  entity.assetId = event.params.assetId
  entity.date = event.params.date
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSavingCompleted(event: SavingCompletedEvent): void {
  let entity = new SavingCompleted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.DigitSaveAccount_id = event.params.id
  entity.date = event.params.date

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSavingCreated(event: SavingCreatedEvent): void {
  let entity = new SavingCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.DigitSaveAccount_id = event.params.id
  entity.date = event.params.date

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

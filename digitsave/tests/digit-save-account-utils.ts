import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  AssetAdded,
  AssetToppedUp,
  AssetWithdrawn,
  OwnershipTransferred,
  SavingCompleted,
  SavingCreated
} from "../generated/DigitSaveAccount/DigitSaveAccount"

export function createAssetAddedEvent(
  assetId: BigInt,
  date: BigInt,
  amount: BigInt
): AssetAdded {
  let assetAddedEvent = changetype<AssetAdded>(newMockEvent())

  assetAddedEvent.parameters = new Array()

  assetAddedEvent.parameters.push(
    new ethereum.EventParam(
      "assetId",
      ethereum.Value.fromUnsignedBigInt(assetId)
    )
  )
  assetAddedEvent.parameters.push(
    new ethereum.EventParam("date", ethereum.Value.fromUnsignedBigInt(date))
  )
  assetAddedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return assetAddedEvent
}

export function createAssetToppedUpEvent(
  assetId: BigInt,
  date: BigInt,
  amount: BigInt
): AssetToppedUp {
  let assetToppedUpEvent = changetype<AssetToppedUp>(newMockEvent())

  assetToppedUpEvent.parameters = new Array()

  assetToppedUpEvent.parameters.push(
    new ethereum.EventParam(
      "assetId",
      ethereum.Value.fromUnsignedBigInt(assetId)
    )
  )
  assetToppedUpEvent.parameters.push(
    new ethereum.EventParam("date", ethereum.Value.fromUnsignedBigInt(date))
  )
  assetToppedUpEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return assetToppedUpEvent
}

export function createAssetWithdrawnEvent(
  savingId: BigInt,
  assetId: BigInt,
  date: BigInt,
  amount: BigInt
): AssetWithdrawn {
  let assetWithdrawnEvent = changetype<AssetWithdrawn>(newMockEvent())

  assetWithdrawnEvent.parameters = new Array()

  assetWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "savingId",
      ethereum.Value.fromUnsignedBigInt(savingId)
    )
  )
  assetWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "assetId",
      ethereum.Value.fromUnsignedBigInt(assetId)
    )
  )
  assetWithdrawnEvent.parameters.push(
    new ethereum.EventParam("date", ethereum.Value.fromUnsignedBigInt(date))
  )
  assetWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return assetWithdrawnEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createSavingCompletedEvent(
  id: BigInt,
  date: BigInt
): SavingCompleted {
  let savingCompletedEvent = changetype<SavingCompleted>(newMockEvent())

  savingCompletedEvent.parameters = new Array()

  savingCompletedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  savingCompletedEvent.parameters.push(
    new ethereum.EventParam("date", ethereum.Value.fromUnsignedBigInt(date))
  )

  return savingCompletedEvent
}

export function createSavingCreatedEvent(
  id: BigInt,
  date: BigInt
): SavingCreated {
  let savingCreatedEvent = changetype<SavingCreated>(newMockEvent())

  savingCreatedEvent.parameters = new Array()

  savingCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  savingCreatedEvent.parameters.push(
    new ethereum.EventParam("date", ethereum.Value.fromUnsignedBigInt(date))
  )

  return savingCreatedEvent
}

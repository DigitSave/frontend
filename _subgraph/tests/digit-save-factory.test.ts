import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { SavingsAccountOwnershipTransfered } from "../generated/schema"
import { SavingsAccountOwnershipTransfered as SavingsAccountOwnershipTransferedEvent } from "../generated/DigitSaveFactory/DigitSaveFactory"
import { handleSavingsAccountOwnershipTransfered } from "../src/digit-save-factory"
import { createSavingsAccountOwnershipTransferedEvent } from "./digit-save-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let oldUser = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newOwner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let date = BigInt.fromI32(234)
    let newSavingsAccountOwnershipTransferedEvent =
      createSavingsAccountOwnershipTransferedEvent(oldUser, newOwner, date)
    handleSavingsAccountOwnershipTransfered(
      newSavingsAccountOwnershipTransferedEvent
    )
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("SavingsAccountOwnershipTransfered created and stored", () => {
    assert.entityCount("SavingsAccountOwnershipTransfered", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "SavingsAccountOwnershipTransfered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "oldUser",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "SavingsAccountOwnershipTransfered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newOwner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "SavingsAccountOwnershipTransfered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "date",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

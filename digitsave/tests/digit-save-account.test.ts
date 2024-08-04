import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { AssetAdded } from "../generated/schema"
import { AssetAdded as AssetAddedEvent } from "../generated/DigitSaveAccount/DigitSaveAccount"
import { handleAssetAdded } from "../src/digit-save-account"
import { createAssetAddedEvent } from "./digit-save-account-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let assetId = BigInt.fromI32(234)
    let date = BigInt.fromI32(234)
    let amount = BigInt.fromI32(234)
    let newAssetAddedEvent = createAssetAddedEvent(assetId, date, amount)
    handleAssetAdded(newAssetAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AssetAdded created and stored", () => {
    assert.entityCount("AssetAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AssetAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "assetId",
      "234"
    )
    assert.fieldEquals(
      "AssetAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "date",
      "234"
    )
    assert.fieldEquals(
      "AssetAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

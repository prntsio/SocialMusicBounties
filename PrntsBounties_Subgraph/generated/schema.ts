// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Bounty extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Bounty entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Bounty must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Bounty", id.toString(), this);
    }
  }

  static load(id: string): Bounty | null {
    return changetype<Bounty | null>(store.get("Bounty", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get bountyId(): BigInt | null {
    let value = this.get("bountyId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set bountyId(value: BigInt | null) {
    if (!value) {
      this.unset("bountyId");
    } else {
      this.set("bountyId", Value.fromBigInt(<BigInt>value));
    }
  }

  get sender(): Bytes | null {
    let value = this.get("sender");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set sender(value: Bytes | null) {
    if (!value) {
      this.unset("sender");
    } else {
      this.set("sender", Value.fromBytes(<Bytes>value));
    }
  }

  get title(): string | null {
    let value = this.get("title");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set title(value: string | null) {
    if (!value) {
      this.unset("title");
    } else {
      this.set("title", Value.fromString(<string>value));
    }
  }

  get type(): string | null {
    let value = this.get("type");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set type(value: string | null) {
    if (!value) {
      this.unset("type");
    } else {
      this.set("type", Value.fromString(<string>value));
    }
  }

  get nftHash(): string | null {
    let value = this.get("nftHash");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set nftHash(value: string | null) {
    if (!value) {
      this.unset("nftHash");
    } else {
      this.set("nftHash", Value.fromString(<string>value));
    }
  }

  get fileHash(): string | null {
    let value = this.get("fileHash");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set fileHash(value: string | null) {
    if (!value) {
      this.unset("fileHash");
    } else {
      this.set("fileHash", Value.fromString(<string>value));
    }
  }

  get contributersType(): string | null {
    let value = this.get("contributersType");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set contributersType(value: string | null) {
    if (!value) {
      this.unset("contributersType");
    } else {
      this.set("contributersType", Value.fromString(<string>value));
    }
  }

  get spotifyPlays(): string | null {
    let value = this.get("spotifyPlays");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set spotifyPlays(value: string | null) {
    if (!value) {
      this.unset("spotifyPlays");
    } else {
      this.set("spotifyPlays", Value.fromString(<string>value));
    }
  }

  get instagramFollowers(): string | null {
    let value = this.get("instagramFollowers");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set instagramFollowers(value: string | null) {
    if (!value) {
      this.unset("instagramFollowers");
    } else {
      this.set("instagramFollowers", Value.fromString(<string>value));
    }
  }

  get email(): string | null {
    let value = this.get("email");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set email(value: string | null) {
    if (!value) {
      this.unset("email");
    } else {
      this.set("email", Value.fromString(<string>value));
    }
  }

  get description(): string | null {
    let value = this.get("description");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set description(value: string | null) {
    if (!value) {
      this.unset("description");
    } else {
      this.set("description", Value.fromString(<string>value));
    }
  }

  get estimatedTime(): string | null {
    let value = this.get("estimatedTime");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set estimatedTime(value: string | null) {
    if (!value) {
      this.unset("estimatedTime");
    } else {
      this.set("estimatedTime", Value.fromString(<string>value));
    }
  }

  get featureBountyType(): string | null {
    let value = this.get("featureBountyType");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set featureBountyType(value: string | null) {
    if (!value) {
      this.unset("featureBountyType");
    } else {
      this.set("featureBountyType", Value.fromString(<string>value));
    }
  }

  get bountyPrice(): string | null {
    let value = this.get("bountyPrice");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set bountyPrice(value: string | null) {
    if (!value) {
      this.unset("bountyPrice");
    } else {
      this.set("bountyPrice", Value.fromString(<string>value));
    }
  }

  get paymentDue(): string | null {
    let value = this.get("paymentDue");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set paymentDue(value: string | null) {
    if (!value) {
      this.unset("paymentDue");
    } else {
      this.set("paymentDue", Value.fromString(<string>value));
    }
  }

  get deadline(): BigInt | null {
    let value = this.get("deadline");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set deadline(value: BigInt | null) {
    if (!value) {
      this.unset("deadline");
    } else {
      this.set("deadline", Value.fromBigInt(<BigInt>value));
    }
  }

  get token(): Bytes | null {
    let value = this.get("token");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set token(value: Bytes | null) {
    if (!value) {
      this.unset("token");
    } else {
      this.set("token", Value.fromBytes(<Bytes>value));
    }
  }

  get fulfillmentId(): BigInt | null {
    let value = this.get("fulfillmentId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set fulfillmentId(value: BigInt | null) {
    if (!value) {
      this.unset("fulfillmentId");
    } else {
      this.set("fulfillmentId", Value.fromBigInt(<BigInt>value));
    }
  }

  get fulfillers(): string | null {
    let value = this.get("fulfillers");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set fulfillers(value: string | null) {
    if (!value) {
      this.unset("fulfillers");
    } else {
      this.set("fulfillers", Value.fromString(<string>value));
    }
  }

  get finalFulfiller(): string | null {
    let value = this.get("finalFulfiller");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set finalFulfiller(value: string | null) {
    if (!value) {
      this.unset("finalFulfiller");
    } else {
      this.set("finalFulfiller", Value.fromString(<string>value));
    }
  }

  get createdAt(): BigInt | null {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt | null) {
    if (!value) {
      this.unset("createdAt");
    } else {
      this.set("createdAt", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class PerformedAction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PerformedAction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PerformedAction must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PerformedAction", id.toString(), this);
    }
  }

  static load(id: string): PerformedAction | null {
    return changetype<PerformedAction | null>(store.get("PerformedAction", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get bountyId(): BigInt {
    let value = this.get("bountyId");
    return value!.toBigInt();
  }

  set bountyId(value: BigInt) {
    this.set("bountyId", Value.fromBigInt(value));
  }

  get sender(): Bytes | null {
    let value = this.get("sender");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set sender(value: Bytes | null) {
    if (!value) {
      this.unset("sender");
    } else {
      this.set("sender", Value.fromBytes(<Bytes>value));
    }
  }

  get fulfiller(): Bytes {
    let value = this.get("fulfiller");
    return value!.toBytes();
  }

  set fulfiller(value: Bytes) {
    this.set("fulfiller", Value.fromBytes(value));
  }

  get mode(): string | null {
    let value = this.get("mode");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set mode(value: string | null) {
    if (!value) {
      this.unset("mode");
    } else {
      this.set("mode", Value.fromString(<string>value));
    }
  }

  get fulfillerToAdd(): string | null {
    let value = this.get("fulfillerToAdd");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set fulfillerToAdd(value: string | null) {
    if (!value) {
      this.unset("fulfillerToAdd");
    } else {
      this.set("fulfillerToAdd", Value.fromString(<string>value));
    }
  }

  get finalFulfiller(): string | null {
    let value = this.get("finalFulfiller");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set finalFulfiller(value: string | null) {
    if (!value) {
      this.unset("finalFulfiller");
    } else {
      this.set("finalFulfiller", Value.fromString(<string>value));
    }
  }

  get createdAt(): BigInt | null {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt | null) {
    if (!value) {
      this.unset("createdAt");
    } else {
      this.set("createdAt", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class Fulfillment extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Fulfillment entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Fulfillment must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Fulfillment", id.toString(), this);
    }
  }

  static load(id: string): Fulfillment | null {
    return changetype<Fulfillment | null>(store.get("Fulfillment", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get bountyId(): BigInt {
    let value = this.get("bountyId");
    return value!.toBigInt();
  }

  set bountyId(value: BigInt) {
    this.set("bountyId", Value.fromBigInt(value));
  }

  get sender(): Bytes | null {
    let value = this.get("sender");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set sender(value: Bytes | null) {
    if (!value) {
      this.unset("sender");
    } else {
      this.set("sender", Value.fromBytes(<Bytes>value));
    }
  }

  get fulfillmentId(): BigInt | null {
    let value = this.get("fulfillmentId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set fulfillmentId(value: BigInt | null) {
    if (!value) {
      this.unset("fulfillmentId");
    } else {
      this.set("fulfillmentId", Value.fromBigInt(<BigInt>value));
    }
  }

  get approver(): Bytes {
    let value = this.get("approver");
    return value!.toBytes();
  }

  set approver(value: Bytes) {
    this.set("approver", Value.fromBytes(value));
  }

  get tokenAmounts(): string | null {
    let value = this.get("tokenAmounts");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set tokenAmounts(value: string | null) {
    if (!value) {
      this.unset("tokenAmounts");
    } else {
      this.set("tokenAmounts", Value.fromString(<string>value));
    }
  }

  get data(): string | null {
    let value = this.get("data");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set data(value: string | null) {
    if (!value) {
      this.unset("data");
    } else {
      this.set("data", Value.fromString(<string>value));
    }
  }

  get createdAt(): BigInt | null {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt | null) {
    if (!value) {
      this.unset("createdAt");
    } else {
      this.set("createdAt", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class Contribution extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Contribution entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Contribution must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Contribution", id.toString(), this);
    }
  }

  static load(id: string): Contribution | null {
    return changetype<Contribution | null>(store.get("Contribution", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get bountyId(): BigInt {
    let value = this.get("bountyId");
    return value!.toBigInt();
  }

  set bountyId(value: BigInt) {
    this.set("bountyId", Value.fromBigInt(value));
  }

  get sender(): Bytes | null {
    let value = this.get("sender");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set sender(value: Bytes | null) {
    if (!value) {
      this.unset("sender");
    } else {
      this.set("sender", Value.fromBytes(<Bytes>value));
    }
  }

  get contributionId(): BigInt {
    let value = this.get("contributionId");
    return value!.toBigInt();
  }

  set contributionId(value: BigInt) {
    this.set("contributionId", Value.fromBigInt(value));
  }

  get contributor(): Bytes {
    let value = this.get("contributor");
    return value!.toBytes();
  }

  set contributor(value: Bytes) {
    this.set("contributor", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get createdAt(): BigInt | null {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt | null) {
    if (!value) {
      this.unset("createdAt");
    } else {
      this.set("createdAt", Value.fromBigInt(<BigInt>value));
    }
  }
}
import {
  StakeIntentDeclared as StakeIntentDeclaredEvent,
  StakeProgressed as StakeProgressedEvent,
  RevertStakeIntentDeclared as RevertStakeIntentDeclaredEvent,
  StakeReverted as StakeRevertedEvent,
  RedeemIntentConfirmed as RedeemIntentConfirmedEvent,
  UnstakeProgressed as UnstakeProgressedEvent,
  RevertRedeemIntentConfirmed as RevertRedeemIntentConfirmedEvent,
  RevertRedeemComplete as RevertRedeemCompleteEvent,
  GatewayProven as GatewayProvenEvent,
  BountyChangeInitiated as BountyChangeInitiatedEvent,
  BountyChangeConfirmed as BountyChangeConfirmedEvent,
} from '../generated/Contract/EIP20Gateway';
import {
  StakeIntentDeclared,
  StakeProgressed,
  RevertStakeIntentDeclared,
  StakeReverted,
  RedeemIntentConfirmed,
  UnstakeProgressed,
  RevertRedeemIntentConfirmed,
  RevertRedeemComplete,
  GatewayProven,
  BountyChangeInitiated,
  BountyChangeConfirmed,
} from '../generated/EIP20GatewaySchema';

export function handleStakeIntentDeclared(
  event: StakeIntentDeclaredEvent,
): void {
  const entity = new StakeIntentDeclared(
    `${event.transaction.hash.toHex()}-${event.logIndex.toString()}`,
  );
  entity._messageHash = event.params._messageHash;
  entity._staker = event.params._staker;
  entity._stakerNonce = event.params._stakerNonce;
  entity._beneficiary = event.params._beneficiary;
  entity._amount = event.params._amount;
  entity.save();
}

export function handleStakeProgressed(event: StakeProgressedEvent): void {
  const entity = new StakeProgressed(
    `${event.transaction.hash.toHex()}-${event.logIndex.toString()}`,
  );
  entity._messageHash = event.params._messageHash;
  entity._staker = event.params._staker;
  entity._stakerNonce = event.params._stakerNonce;
  entity._amount = event.params._amount;
  entity._proofProgress = event.params._proofProgress;
  entity._unlockSecret = event.params._unlockSecret;
  entity.save();
}

export function handleRevertStakeIntentDeclared(
  event: RevertStakeIntentDeclaredEvent,
): void {
  const entity = new RevertStakeIntentDeclared(
    `${event.transaction.hash.toHex()}-${event.logIndex.toString()}`,
  );
  entity._messageHash = event.params._messageHash;
  entity._staker = event.params._staker;
  entity._stakerNonce = event.params._stakerNonce;
  entity._amount = event.params._amount;
  entity.save();
}

export function handleStakeReverted(event: StakeRevertedEvent): void {
  const entity = new StakeReverted(
    `${event.transaction.hash.toHex()}-${event.logIndex.toString()}`,
  );
  entity._messageHash = event.params._messageHash;
  entity._staker = event.params._staker;
  entity._stakerNonce = event.params._stakerNonce;
  entity._amount = event.params._amount;
  entity.save();
}

export function handleRedeemIntentConfirmed(
  event: RedeemIntentConfirmedEvent,
): void {
  const entity = new RedeemIntentConfirmed(
    `${event.transaction.hash.toHex()}-${event.logIndex.toString()}`,
  );
  entity._messageHash = event.params._messageHash;
  entity._redeemer = event.params._redeemer;
  entity._redeemerNonce = event.params._redeemerNonce;
  entity._beneficiary = event.params._beneficiary;
  entity._amount = event.params._amount;
  entity._blockHeight = event.params._blockHeight;
  entity._hashLock = event.params._hashLock;
  entity.save();
}

export function handleUnstakeProgressed(event: UnstakeProgressedEvent): void {
  const entity = new UnstakeProgressed(
    `${event.transaction.hash.toHex()}-${event.logIndex.toString()}`,
  );
  entity._messageHash = event.params._messageHash;
  entity._redeemer = event.params._redeemer;
  entity._beneficiary = event.params._beneficiary;
  entity._redeemAmount = event.params._redeemAmount;
  entity._unstakeAmount = event.params._unstakeAmount;
  entity._rewardAmount = event.params._rewardAmount;
  entity._proofProgress = event.params._proofProgress;
  entity._unlockSecret = event.params._unlockSecret;
  entity.save();
}

export function handleRevertRedeemIntentConfirmed(
  event: RevertRedeemIntentConfirmedEvent,
): void {
  const entity = new RevertRedeemIntentConfirmed(
    `${event.transaction.hash.toHex()}-${event.logIndex.toString()}`,
  );
  entity._messageHash = event.params._messageHash;
  entity._redeemer = event.params._redeemer;
  entity._redeemerNonce = event.params._redeemerNonce;
  entity._amount = event.params._amount;
  entity.save();
}

export function handleRevertRedeemComplete(
  event: RevertRedeemCompleteEvent,
): void {
  const entity = new RevertRedeemComplete(
    `${event.transaction.hash.toHex()}-${event.logIndex.toString()}`,
  );
  entity._messageHash = event.params._messageHash;
  entity._redeemer = event.params._redeemer;
  entity._redeemerNonce = event.params._redeemerNonce;
  entity._amount = event.params._amount;
  entity.save();
}

export function handleGatewayProven(event: GatewayProvenEvent): void {
  const entity = new GatewayProven(
    `${event.transaction.hash.toHex()}-${event.logIndex.toString()}`,
  );
  entity._gateway = event.params._gateway;
  entity._blockHeight = event.params._blockHeight;
  entity._storageRoot = event.params._storageRoot;
  entity._wasAlreadyProved = event.params._wasAlreadyProved;
  entity.save();
}

export function handleBountyChangeInitiated(
  event: BountyChangeInitiatedEvent,
): void {
  const entity = new BountyChangeInitiated(
    `${event.transaction.hash.toHex()}-${event.logIndex.toString()}`,
  );
  entity._currentBounty = event.params._currentBounty;
  entity._proposedBounty = event.params._proposedBounty;
  entity._unlockHeight = event.params._unlockHeight;
  entity.save();
}

export function handleBountyChangeConfirmed(
  event: BountyChangeConfirmedEvent,
): void {
  const entity = new BountyChangeConfirmed(
    `${event.transaction.hash.toHex()}-${event.logIndex.toString()}`,
  );
  entity._currentBounty = event.params._currentBounty;
  entity._changedBounty = event.params._changedBounty;
  entity.save();
}

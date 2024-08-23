// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RemoteParticipantState } from '@internal/calling-stateful-client';

/**
 * @private
 */
export const checkIsSpeaking = (participant: RemoteParticipantState, isRemoteAudioActive: boolean): boolean => {
  return (participant.isSpeaking || isRemoteAudioActive) && !participant.isMuted;
};

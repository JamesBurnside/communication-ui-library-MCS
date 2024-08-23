// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RemoteAudioStream, Volume } from '@azure/communication-calling';
import { CallContext } from './CallContext';
import { CallIdRef } from './CallIdRef';

/**
 * @private
 */
export class RemoteAudioStreamSubscriber {
  private _callIdRef: CallIdRef;
  private _remoteAudioStream: RemoteAudioStream;
  private _context: CallContext;
  private _volumeSubscribeCancelled: boolean = false;
  private _volumeApi?: Volume;

  constructor(callIdRef: CallIdRef, remoteAudioStream: RemoteAudioStream, context: CallContext) {
    this._callIdRef = callIdRef;
    this._remoteAudioStream = remoteAudioStream;
    this._context = context;
    const _volumeApiPromise = this._remoteAudioStream.getVolume();
    _volumeApiPromise.then((volumeApi) => {
      if (this._volumeSubscribeCancelled) {
        return;
      }
      this._volumeApi = volumeApi;
      this.subscribe();
    });
  }

  private subscribe = (): void => {
    if (!this._volumeApi) {
      throw new Error('Volume API not initialized');
    }
    this.volumeLevelChanged();
    this._volumeApi.on('levelChanged', this.volumeLevelChanged);
  };

  public unsubscribe = (): void => {
    this._volumeSubscribeCancelled = true;
    this._volumeApi?.off('levelChanged', this.volumeLevelChanged);
  };

  private volumeLevelChanged = (): void => {
    this._context.setRemoteAudioVolumeLevel(this._callIdRef.callId, this._volumeApi?.level);
  };
}

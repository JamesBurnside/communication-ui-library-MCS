// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Stack } from '@fluentui/react';
/* @conditional-compile-remove(spotlight) */
import { mergeStyles } from '@fluentui/react';
import { _formatString } from '@internal/acs-ui-common';
import React, { useMemo } from 'react';
import { OnRenderAvatarCallback, VideoStreamOptions, CreateVideoStreamViewResult } from '../types';
/* @conditional-compile-remove(reaction) */
import { Reaction } from '../types';
import { LocalVideoCameraCycleButton, LocalVideoCameraCycleButtonProps } from './LocalVideoCameraButton';
import { StreamMedia } from './StreamMedia';
import {
  useLocalVideoStreamLifecycleMaintainer,
  LocalVideoStreamLifecycleMaintainerProps
} from './VideoGallery/useVideoStreamLifecycleMaintainer';
import { VideoTile, VideoTileStylesProps } from './VideoTile';
/* @conditional-compile-remove(raise-hand) */
import { RaisedHand } from '../types';
/* @conditional-compile-remove(spotlight) */
import { useTheme } from '../theming';
/**
 * A memoized version of VideoTile for rendering local participant.
 *
 * @internal
 */
export const _LocalVideoTile = React.memo(
  (props: {
    userId?: string;
    onCreateLocalStreamView?: (options?: VideoStreamOptions) => Promise<void | CreateVideoStreamViewResult>;
    onDisposeLocalStreamView?: () => void;
    isAvailable?: boolean;
    isMuted?: boolean;
    renderElement?: HTMLElement;
    displayName?: string;
    initialsName?: string;
    localVideoViewOptions?: VideoStreamOptions;
    onRenderAvatar?: OnRenderAvatarCallback;
    showLabel: boolean;
    showMuteIndicator?: boolean;
    showCameraSwitcherInLocalPreview?: boolean;
    localVideoCameraCycleButtonProps?: LocalVideoCameraCycleButtonProps;
    localVideoCameraSwitcherLabel?: string;
    localVideoSelectedDescription?: string;
    styles?: VideoTileStylesProps;
    personaMinSize?: number;
    /* @conditional-compile-remove(raise-hand) */
    raisedHand?: RaisedHand;
    /* @conditional-compile-remove(reaction) */
    reaction?: Reaction;
    /* @conditional-compile-remove(spotlight) */
    isSpotlighted?: boolean;
  }) => {
    const {
      isAvailable,
      isMuted,
      onCreateLocalStreamView,
      onDisposeLocalStreamView,
      localVideoViewOptions,
      renderElement,
      userId,
      showLabel,
      displayName,
      initialsName,
      onRenderAvatar,
      showMuteIndicator,
      styles,
      showCameraSwitcherInLocalPreview,
      localVideoCameraCycleButtonProps,
      localVideoCameraSwitcherLabel,
      localVideoSelectedDescription,
      /* @conditional-compile-remove(raise-hand) */
      raisedHand,
      /* @conditional-compile-remove(reaction) */
      reaction,
      /* @conditional-compile-remove(spotlight) */
      isSpotlighted
    } = props;

    /* @conditional-compile-remove(spotlight) */
    const theme = useTheme();

    const localVideoStreamProps: LocalVideoStreamLifecycleMaintainerProps = useMemo(
      () => ({
        isMirrored: localVideoViewOptions?.isMirrored,
        isStreamAvailable: isAvailable,
        onCreateLocalStreamView,
        onDisposeLocalStreamView,
        renderElementExists: !!renderElement,
        scalingMode: localVideoViewOptions?.scalingMode
      }),
      [
        isAvailable,
        localVideoViewOptions?.isMirrored,
        localVideoViewOptions?.scalingMode,
        onCreateLocalStreamView,
        onDisposeLocalStreamView,
        renderElement
      ]
    );

    // Handle creating, destroying and updating the video stream as necessary
    useLocalVideoStreamLifecycleMaintainer(localVideoStreamProps);

    /* @conditional-compile-remove(spotlight) */
    const spotlightBorder = useMemo(
      () => (
        <Stack
          className={mergeStyles({
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: 100,
            border: `0.25rem solid ${theme.palette.black}`
          })}
        />
      ),
      [theme.palette.black]
    );

    const renderVideoStreamElement = useMemo(() => {
      // Checking if renderElement is well defined or not as calling SDK has a number of video streams limitation which
      // implies that, after their threshold, all streams have no child (blank video)
      if (!renderElement || !renderElement.childElementCount) {
        // Returning `undefined` results in the placeholder with avatar being shown
        return undefined;
      }

      return (
        <>
          <FloatingLocalCameraCycleButton
            showCameraSwitcherInLocalPreview={showCameraSwitcherInLocalPreview ?? false}
            localVideoCameraCycleButtonProps={localVideoCameraCycleButtonProps}
            localVideoCameraSwitcherLabel={localVideoCameraSwitcherLabel}
            localVideoSelectedDescription={localVideoSelectedDescription}
          />
          <StreamMedia videoStreamElement={renderElement} isMirrored={true} />
          {/* @conditional-compile-remove(spotlight) */ isSpotlighted && spotlightBorder}
        </>
      );
    }, [
      localVideoCameraCycleButtonProps,
      localVideoCameraSwitcherLabel,
      localVideoSelectedDescription,
      renderElement,
      showCameraSwitcherInLocalPreview,
      /* @conditional-compile-remove(spotlight) */ isSpotlighted,
      /* @conditional-compile-remove(spotlight) */ spotlightBorder
    ]);

    return (
      <>
        <VideoTile
          key={userId ?? 'local-video-tile'}
          userId={userId}
          renderElement={renderVideoStreamElement}
          showLabel={showLabel}
          displayName={displayName}
          initialsName={initialsName}
          styles={styles}
          onRenderPlaceholder={onRenderAvatar}
          isMuted={isMuted}
          showMuteIndicator={showMuteIndicator}
          personaMinSize={props.personaMinSize}
          /* @conditional-compile-remove(raise-hand) */
          raisedHand={raisedHand}
          /* @conditional-compile-remove(reaction) */
          reaction={reaction}
          /* @conditional-compile-remove(spotlight) */
          isSpotlighted={isSpotlighted}
        />
        {/* @conditional-compile-remove(spotlight) */ isSpotlighted && spotlightBorder}
      </>
    );
  }
);

const FloatingLocalCameraCycleButton = (props: {
  showCameraSwitcherInLocalPreview: boolean;
  localVideoCameraCycleButtonProps?: LocalVideoCameraCycleButtonProps;
  localVideoCameraSwitcherLabel?: string;
  localVideoSelectedDescription?: string;
}): JSX.Element => {
  const {
    showCameraSwitcherInLocalPreview,
    localVideoCameraCycleButtonProps,
    localVideoCameraSwitcherLabel,
    localVideoSelectedDescription
  } = props;
  const ariaDescription =
    localVideoCameraCycleButtonProps?.selectedCamera &&
    localVideoSelectedDescription &&
    _formatString(localVideoSelectedDescription, {
      cameraName: localVideoCameraCycleButtonProps.selectedCamera.name
    });
  return (
    <Stack horizontalAlign="end">
      {showCameraSwitcherInLocalPreview &&
        localVideoCameraCycleButtonProps?.cameras !== undefined &&
        localVideoCameraCycleButtonProps?.selectedCamera !== undefined &&
        localVideoCameraCycleButtonProps?.onSelectCamera !== undefined && (
          <LocalVideoCameraCycleButton
            cameras={localVideoCameraCycleButtonProps.cameras}
            selectedCamera={localVideoCameraCycleButtonProps.selectedCamera}
            onSelectCamera={localVideoCameraCycleButtonProps.onSelectCamera}
            label={localVideoCameraSwitcherLabel}
            ariaDescription={ariaDescription}
          />
        )}
    </Stack>
  );
};

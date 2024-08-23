// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { CSSProperties, useCallback, useEffect, useMemo } from 'react';
import { useRef } from 'react';
import {
  VideoGallery,
  VideoStreamOptions,
  CustomAvatarOptions,
  Announcer,
  VideoTileContextualMenuProps,
  VideoTileDrawerMenuProps
} from '@internal/react-components';
import { VideoGalleryLayout } from '@internal/react-components';
import { _useContainerWidth, _useContainerHeight } from '@internal/react-components';
import { usePropsFor } from '../hooks/usePropsFor';
import { AvatarPersona, AvatarPersonaDataCallback } from '../../common/AvatarPersona';
import { keyframes, memoizeFunction, mergeStyles, Stack } from '@fluentui/react';
import { useHandlers } from '../hooks/useHandlers';
import { useSelector } from '../hooks/useSelector';
import { localVideoCameraCycleButtonSelector } from '../selectors/LocalVideoTileSelector';
import { LocalVideoCameraCycleButton } from '@internal/react-components';
import { _formatString } from '@internal/acs-ui-common';
import { useParticipantChangedAnnouncement } from '../utils/MediaGalleryUtils';
import { RemoteVideoTileMenuOptions } from '../CallComposite';
import { LocalVideoTileOptions } from '../CallComposite';
import { useAdapter } from '../adapter/CallAdapterProvider';
import { PromptProps } from './Prompt';
import { useLocalSpotlightCallbacksWithPrompt, useRemoteSpotlightCallbacksWithPrompt } from '../utils/spotlightUtils';
import { VideoTilesOptions } from '@internal/react-components';

const VideoGalleryStyles = {
  root: {
    height: '100%',
    minHeight: '10rem', // space affordance to ensure media gallery is never collapsed
    minWidth: '6rem'
  }
};

const localVideoViewOptions = {
  scalingMode: 'Crop',
  isMirrored: true
} as VideoStreamOptions;

const remoteVideoViewOptions = {
  scalingMode: 'Crop'
} as VideoStreamOptions;

/**
 * @private
 */
export interface MediaGalleryProps {
  isVideoStreamOn?: boolean;
  isMicrophoneChecked?: boolean;
  onStartLocalVideo: () => Promise<void>;
  onFetchAvatarPersonaData?: AvatarPersonaDataCallback;
  isMobile?: boolean;
  drawerMenuHostId?: string;
  remoteVideoTileMenuOptions?: RemoteVideoTileMenuOptions;
  localVideoTileOptions?: boolean | LocalVideoTileOptions;
  userSetOverflowGalleryPosition?: 'Responsive' | 'horizontalTop';
  userSetGalleryLayout: VideoGalleryLayout;
  pinnedParticipants?: string[];
  setPinnedParticipants?: (pinnedParticipants: string[]) => void;
  setIsPromptOpen: (isOpen: boolean) => void;
  setPromptProps: (props: PromptProps) => void;
  hideSpotlightButtons?: boolean;
  videoTilesOptions?: VideoTilesOptions;
}

/**
 * @private
 */
export const MediaGallery = (props: MediaGalleryProps): JSX.Element => {
  const {
    pinnedParticipants = [],
    setPinnedParticipants,
    setIsPromptOpen,
    setPromptProps,
    hideSpotlightButtons,
    videoTilesOptions
  } = props;

  const videoGalleryProps = usePropsFor(VideoGallery);
  const cameraSwitcherCameras = useSelector(localVideoCameraCycleButtonSelector);
  const cameraSwitcherCallback = useHandlers(LocalVideoCameraCycleButton);
  const announcerString = useParticipantChangedAnnouncement();

  const adapter = useAdapter();
  const userRole = adapter.getState().call?.role;
  const isRoomsCall = adapter.getState().isRoomsCall;

  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = _useContainerWidth(containerRef);
  const containerHeight = _useContainerHeight(containerRef);
  const containerAspectRatio = containerWidth && containerHeight ? containerWidth / containerHeight : 0;
  const reactionResources = adapter.getState().reactions;

  const layoutBasedOnTilePosition: VideoGalleryLayout = getVideoGalleryLayoutBasedOnLocalOptions(
    (props.localVideoTileOptions as LocalVideoTileOptions)?.position
  );
  const cameraSwitcherProps = useMemo(() => {
    return {
      ...cameraSwitcherCallback,
      ...cameraSwitcherCameras
    };
  }, [cameraSwitcherCallback, cameraSwitcherCameras]);

  const remoteParticipantsAndIsSpeaking = useMemo(
    () =>
      videoGalleryProps.remoteParticipants.map((participant) => {
        return { id: participant.userId, isSpeaking: participant.isSpeaking };
      }),
    [videoGalleryProps.remoteParticipants]
  );

  const volumeLevel = React.useRef<number>(0.5);
  const pulseDiv = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    function updatePulse(volume: number): void {
      // const scale = 1 + volume * 0.5; // Scale between 1 and 1.5 based on volume
      const opacity = 1 - volume * 0.3; // Opacity decreases as volume increases

      pulseDiv.current?.style.setProperty('--scale', '1.1'); //scale.toString());
      pulseDiv.current?.style.setProperty('--opacity', opacity.toString());
    }

    updatePulse(volumeLevel.current);
  }, [pulseDiv, remoteParticipantsAndIsSpeaking]);

  const onRenderAvatar = useCallback(
    (userId?: string, options?: CustomAvatarOptions) => {
      const showSpeakingAnimation = remoteParticipantsAndIsSpeaking.some(
        (participant) => participant.id === userId && participant.isSpeaking
      );
      return (
        <Stack className={mergeStyles({ position: 'absolute', height: '100%', width: '100%' })}>
          <Stack styles={{ root: { margin: 'auto', maxHeight: '100%' } }}>
            {options?.coinSize && (
              <div
                className={showSpeakingAnimation ? pulsingAudioClassname : undefined}
                ref={showSpeakingAnimation ? pulseDiv : undefined}
              >
                <AvatarPersona userId={userId} {...options} dataProvider={props.onFetchAvatarPersonaData} />
              </div>
            )}
          </Stack>
        </Stack>
      );
    },
    [props.onFetchAvatarPersonaData, remoteParticipantsAndIsSpeaking]
  );

  const remoteVideoTileMenuOptions: false | VideoTileContextualMenuProps | VideoTileDrawerMenuProps = useMemo(() => {
    return props.remoteVideoTileMenuOptions?.isHidden
      ? false
      : props.isMobile
        ? { kind: 'drawer', hostId: props.drawerMenuHostId }
        : { kind: 'contextual' };
  }, [props.remoteVideoTileMenuOptions?.isHidden, props.isMobile, props.drawerMenuHostId]);

  const overflowGalleryPosition = useMemo(() => {
    /* @conditional-compile-remove(overflow-top-composite) */
    if (props.userSetOverflowGalleryPosition === 'horizontalTop') {
      return props.userSetOverflowGalleryPosition;
    }
    return containerWidth && containerHeight && containerWidth / containerHeight >= 16 / 9
      ? 'verticalRight'
      : 'horizontalBottom';
  }, [
    /* @conditional-compile-remove(overflow-top-composite) */ props.userSetOverflowGalleryPosition,
    containerWidth,
    containerHeight
  ]);

  const { onStartLocalSpotlight, onStopLocalSpotlight, onStartRemoteSpotlight, onStopRemoteSpotlight } =
    videoGalleryProps;

  const { onStartLocalSpotlightWithPrompt, onStopLocalSpotlightWithPrompt } = useLocalSpotlightCallbacksWithPrompt(
    onStartLocalSpotlight,
    onStopLocalSpotlight,
    setIsPromptOpen,
    setPromptProps
  );

  const { onStartRemoteSpotlightWithPrompt, onStopRemoteSpotlightWithPrompt } = useRemoteSpotlightCallbacksWithPrompt(
    onStartRemoteSpotlight,
    onStopRemoteSpotlight,
    setIsPromptOpen,
    setPromptProps
  );

  const onPinParticipant = useMemo(() => {
    return setPinnedParticipants
      ? (userId: string) => {
          if (!pinnedParticipants.includes(userId)) {
            setPinnedParticipants(pinnedParticipants.concat(userId));
          }
        }
      : undefined;
  }, [setPinnedParticipants, pinnedParticipants]);

  const onUnpinParticipant = useMemo(() => {
    return setPinnedParticipants
      ? (userId: string) => {
          setPinnedParticipants(pinnedParticipants.filter((participantId) => participantId !== userId));
        }
      : undefined;
  }, [setPinnedParticipants, pinnedParticipants]);

  const VideoGalleryMemoized = useMemo(() => {
    const layoutBasedOnUserSelection = (): VideoGalleryLayout => {
      return props.localVideoTileOptions ? layoutBasedOnTilePosition : props.userSetGalleryLayout;
      return layoutBasedOnTilePosition;
    };

    return (
      <VideoGallery
        {...videoGalleryProps}
        videoTilesOptions={videoTilesOptions}
        localVideoViewOptions={localVideoViewOptions}
        remoteVideoViewOptions={remoteVideoViewOptions}
        styles={VideoGalleryStyles}
        layout={layoutBasedOnUserSelection()}
        showCameraSwitcherInLocalPreview={props.isMobile}
        localVideoCameraCycleButtonProps={cameraSwitcherProps}
        onRenderAvatar={onRenderAvatar}
        remoteVideoTileMenu={remoteVideoTileMenuOptions}
        overflowGalleryPosition={overflowGalleryPosition}
        localVideoTileSize={
          props.localVideoTileOptions === false || userRole === 'Consumer' || (isRoomsCall && userRole === 'Unknown')
            ? 'hidden'
            : props.isMobile && containerAspectRatio < 1
              ? '9:16'
              : '16:9'
        }
        pinnedParticipants={pinnedParticipants}
        onPinParticipant={onPinParticipant}
        onUnpinParticipant={onUnpinParticipant}
        reactionResources={reactionResources}
        onStartLocalSpotlight={hideSpotlightButtons ? undefined : onStartLocalSpotlightWithPrompt}
        onStopLocalSpotlight={hideSpotlightButtons ? undefined : onStopLocalSpotlightWithPrompt}
        onStartRemoteSpotlight={hideSpotlightButtons ? undefined : onStartRemoteSpotlightWithPrompt}
        onStopRemoteSpotlight={hideSpotlightButtons ? undefined : onStopRemoteSpotlightWithPrompt}
        /* @conditional-compile-remove(soft-mute) */
        onMuteParticipant={
          ['Unknown', 'Organizer', 'Presenter', 'Co-organizer'].includes(userRole ?? '')
            ? videoGalleryProps.onMuteParticipant
            : undefined
        }
      />
    );
  }, [
    videoGalleryProps,
    props.isMobile,
    props.localVideoTileOptions,
    cameraSwitcherProps,
    onRenderAvatar,
    remoteVideoTileMenuOptions,
    overflowGalleryPosition,
    userRole,
    isRoomsCall,
    containerAspectRatio,
    props.userSetGalleryLayout,
    pinnedParticipants,
    onPinParticipant,
    onUnpinParticipant,
    layoutBasedOnTilePosition,
    reactionResources,
    onStartLocalSpotlightWithPrompt,
    onStopLocalSpotlightWithPrompt,
    onStartRemoteSpotlightWithPrompt,
    onStopRemoteSpotlightWithPrompt,
    hideSpotlightButtons,
    videoTilesOptions
  ]);

  return (
    <div ref={containerRef} style={mediaGalleryContainerStyles}>
      <Announcer announcementString={announcerString} ariaLive={'polite'} />
      {VideoGalleryMemoized}
    </div>
  );
};

const mediaGalleryContainerStyles: CSSProperties = { width: '100%', height: '100%' };

const getVideoGalleryLayoutBasedOnLocalOptions = (localTileOptions?: string): VideoGalleryLayout => {
  return localTileOptions === 'grid' ? 'default' : 'floatingLocalVideo';
};

/** @private */
export const pulseFrames = memoizeFunction(() =>
  keyframes({
    '0%': { transform: 'scale(1)', opacity: 1 },
    '50%': { transform: 'scale(var(--scale))', opacity: 'var(--opacity)' },
    '100%': { transform: 'scale(1)', opacity: 1 }
  })
);

/** @private */
export const pulsingAudioClassname = mergeStyles({
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  padding: '1rem',
  '::before': {
    content: '""',
    width: '100%',
    height: '100%',
    // backgroundColor: 'rgba(7, 127, 171, 0.7)',
    border: '0.25rem solid rgba(7, 127, 171, 0.7)',
    borderRadius: '50%',
    position: 'absolute',
    animationName: pulseFrames(),
    animationDuration: '1.5s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out'
  }
});

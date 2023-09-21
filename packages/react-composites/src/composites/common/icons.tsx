// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CallEnd20Filled,
  CallMissed20Filled,
  CameraSwitch24Regular,
  Chat20Filled,
  Chat20Regular,
  Info20Filled,
  MicOff20Filled,
  Mic20Filled,
  Mic20Regular,
  People20Regular,
  PersonDelete20Filled,
  Speaker220Filled,
  Speaker220Regular,
  Video20Filled,
  VideoOff20Filled,
  WifiWarning20Filled
} from '@fluentui/react-icons';
/* @conditional-compile-remove(capabilities) */
import { MicProhibited20Filled, VideoProhibited20Filled } from '@fluentui/react-icons';
/* @conditional-compile-remove(gallery-layouts) */
import { Grid20Regular } from '@fluentui/react-icons';
/* @conditional-compile-remove(PSTN-calls) */
import { PersonAdd20Regular, Dialpad20Regular, Call20Regular } from '@fluentui/react-icons';
import { DEFAULT_COMPONENT_ICONS } from '@internal/react-components';
import React from 'react';
// eslint-disable-next-line no-restricted-imports
import { FontIcon, IIconProps, Spinner, SpinnerSize } from '@fluentui/react';
/* @conditional-compile-remove(file-sharing) */
import { Attach20Regular } from '@fluentui/react-icons';
/* @conditional-compile-remove(video-background-effects) */
import { VideoBackgroundEffect20Regular, VideoPerson20Filled } from '@fluentui/react-icons';
/* @conditional-compile-remove(gallery-layouts) */
import {
  PersonCircle20Regular,
  WindowHeaderHorizontal20Regular,
  TableSimple20Regular,
  PictureInPicture20Regular,
  ContentView20Regular,
  Table20Regular
} from '@fluentui/react-icons';

const SpinnerIcon = (): JSX.Element => <Spinner size={SpinnerSize.large} />;

/**
 * The default set of icons used by the composites directly (i.e. not via the components defined in this library).
 *
 * @public
 */
export const COMPOSITE_ONLY_ICONS: CompositeIcons = {
  ChevronLeft: undefined,
  Link: undefined,
  LobbyScreenConnectingToCall: <SpinnerIcon />,
  LobbyScreenWaitingToBeAdmitted: <SpinnerIcon />,
  LocalDeviceSettingsCamera: <Video20Filled />,
  LocalDeviceSettingsMic: <Mic20Filled />,
  LocalDeviceSettingsSpeaker: <Speaker220Filled />,
  LocalPreviewPlaceholder: <VideoOff20Filled />,
  LocalCameraSwitch: <CameraSwitch24Regular />,
  ControlBarChatButtonActive: <Chat20Filled />,
  ControlBarChatButtonInactive: <Chat20Regular />,
  /* @conditional-compile-remove(capabilities) */
  ControlButtonCameraProhibited: <VideoProhibited20Filled />,
  /* @conditional-compile-remove(capabilities) */
  ControlButtonMicProhibited: <MicProhibited20Filled />,
  ControlBarPeopleButton: <People20Regular />,
  MoreDrawerMicrophones: <Mic20Regular />,
  MoreDrawerPeople: <People20Regular />,
  MoreDrawerSpeakers: <Speaker220Regular />,
  MoreDrawerSelectedMicrophone: <Mic20Filled />,
  MoreDrawerSelectedSpeaker: <Speaker220Filled />,
  Muted: <MicOff20Filled />,
  NetworkReconnectIcon: <CallMissed20Filled />,
  NoticePageAccessDeniedTeamsMeeting: <PersonDelete20Filled />,
  NoticePageJoinCallFailedDueToNoNetwork: <WifiWarning20Filled />,
  NoticePageLeftCall: <CallEnd20Filled />,
  NoticePageRemovedFromCall: <Info20Filled />,
  /* @conditional-compile-remove(file-sharing) */
  SendBoxAttachFile: <Attach20Regular />,
  /* @conditional-compile-remove(PSTN-calls) */
  PeoplePaneAddPerson: <PersonAdd20Regular />,
  /* @conditional-compile-remove(PSTN-calls) */
  PeoplePaneOpenDialpad: <Dialpad20Regular />,
  /* @conditional-compile-remove(PSTN-calls) */
  DialpadStartCall: <Call20Regular />,
  /* @conditional-compile-remove(rooms) */
  NoticePageAccessDeniedRoomsCall: <Info20Filled />,
  /* @conditional-compile-remove(video-background-effects) */
  BlurVideoBackground: <VideoBackgroundEffect20Regular />,
  /* @conditional-compile-remove(video-background-effects) */
  RemoveVideoBackgroundEffect: <VideoPerson20Filled />,
  /* @conditional-compile-remove(gallery-layouts) */
  GalleryOptions: <Grid20Regular />,
  /* @conditional-compile-remove(gallery-layouts) */
  OverflowGalleryTop: <WindowHeaderHorizontal20Regular />,
  /* @conditional-compile-remove(gallery-layouts) */
  SpeakerGalleryLayout: <PersonCircle20Regular />,
  /* @conditional-compile-remove(gallery-layouts) */
  DefaultGalleryLayout: <TableSimple20Regular />,
  /* @conditional-compile-remove(gallery-layouts) */
  FloatingLocalVideoGalleryLayout: <PictureInPicture20Regular />,
  /* @conditional-compile-remove(gallery-layouts) */
  FocusedContentGalleryLayout: <ContentView20Regular />,
  /* @conditional-compile-remove(gallery-layouts) */
  LargeGalleryLayout: <Table20Regular />
};

/**
 * The default set of icons that are available to used in the Composites.
 *
 * @public
 */
export const DEFAULT_COMPOSITE_ICONS = {
  ...DEFAULT_COMPONENT_ICONS,
  ...COMPOSITE_ONLY_ICONS
};

/** @private */
export type CompositeIconProps<Icons> = IIconProps & { iconName: keyof Icons };

/**
 * Icons that can be overridden for {@link ChatComposite}.
 *
 * @public
 */
export type ChatCompositeIcons = {
  EditBoxCancel?: JSX.Element;
  EditBoxSubmit?: JSX.Element;
  MessageDelivered?: JSX.Element;
  MessageEdit?: JSX.Element;
  MessageFailed?: JSX.Element;
  MessageRemove?: JSX.Element;
  MessageSeen?: JSX.Element;
  MessageSending?: JSX.Element;
  ParticipantItemOptions?: JSX.Element;
  ParticipantItemOptionsHovered?: JSX.Element;
  SendBoxSend?: JSX.Element;
  SendBoxSendHovered?: JSX.Element;
  /* @conditional-compile-remove(file-sharing) */
  SendBoxAttachFile?: JSX.Element;
};

/**
 * Icon wrapper to use when including customizable icons inside the ChatComposite.
 * This wrapper ensures the icon name is being type-checked helping ensure no typos
 * and ensure that icon is customizable through the composite API.
 *
 * @private
 */
export const ChatCompositeIcon = (props: CompositeIconProps<ChatCompositeIcons>): JSX.Element => (
  <FontIcon {...props} />
);

/**
 * Icons that can be overridden for {@link CallComposite}.
 *
 * @public
 */
export type CallCompositeIcons = {
  ControlBarPeopleButton?: JSX.Element;
  ControlButtonCameraOff?: JSX.Element;
  ControlButtonCameraOn?: JSX.Element;
  ControlButtonEndCall?: JSX.Element;
  ControlButtonMicOff?: JSX.Element;
  ControlButtonMicOn?: JSX.Element;
  ControlButtonOptions?: JSX.Element;
  ControlButtonParticipants?: JSX.Element;
  ControlButtonScreenShareStart?: JSX.Element;
  ControlButtonScreenShareStop?: JSX.Element;
  /* @conditional-compile-remove(capabilities) */
  ControlButtonCameraProhibited?: JSX.Element;
  /* @conditional-compile-remove(capabilities) */
  ControlButtonMicProhibited?: JSX.Element;
  /* @conditional-compile-remove(raise-hand) */
  ControlButtonRaiseHand?: JSX.Element;
  /* @conditional-compile-remove(raise-hand) */
  ControlButtonLowerHand?: JSX.Element;
  /* @conditional-compile-remove(raise-hand) */
  RaiseHandContextualMenuItem?: JSX.Element;
  /* @conditional-compile-remove(raise-hand) */
  LowerHandContextualMenuItem?: JSX.Element;
  ErrorBarCallCameraAccessDenied?: JSX.Element;
  ErrorBarCallCameraAlreadyInUse?: JSX.Element;
  ErrorBarCallLocalVideoFreeze?: JSX.Element;
  ErrorBarCallMacOsCameraAccessDenied?: JSX.Element;
  ErrorBarCallMacOsMicrophoneAccessDenied?: JSX.Element;
  ErrorBarCallMicrophoneAccessDenied?: JSX.Element;
  ErrorBarCallMicrophoneMutedBySystem?: JSX.Element;
  ErrorBarCallMicrophoneUnmutedBySystem?: JSX.Element;
  ErrorBarCallNetworkQualityLow?: JSX.Element;
  ErrorBarCallNoMicrophoneFound?: JSX.Element;
  ErrorBarCallNoSpeakerFound?: JSX.Element;
  ErrorBarClear?: JSX.Element;
  HorizontalGalleryLeftButton?: JSX.Element;
  HorizontalGalleryRightButton?: JSX.Element;
  LobbyScreenConnectingToCall?: JSX.Element;
  LobbyScreenWaitingToBeAdmitted?: JSX.Element;
  LocalDeviceSettingsCamera?: JSX.Element;
  LocalDeviceSettingsMic?: JSX.Element;
  LocalDeviceSettingsSpeaker?: JSX.Element;
  LocalPreviewPlaceholder?: JSX.Element;
  Muted?: JSX.Element;
  NetworkReconnectIcon?: JSX.Element;
  NoticePageAccessDeniedTeamsMeeting?: JSX.Element;
  NoticePageJoinCallFailedDueToNoNetwork?: JSX.Element;
  NoticePageLeftCall?: JSX.Element;
  NoticePageRemovedFromCall?: JSX.Element;
  OptionsCamera?: JSX.Element;
  OptionsMic?: JSX.Element;
  OptionsSpeaker?: JSX.Element;
  ParticipantItemMicOff?: JSX.Element;
  ParticipantItemOptions?: JSX.Element;
  ParticipantItemOptionsHovered?: JSX.Element;
  ParticipantItemScreenShareStart?: JSX.Element;
  VideoTileMicOff?: JSX.Element;
  LocalCameraSwitch?: JSX.Element;
  /* @conditional-compile-remove(PSTN-calls) */
  PeoplePaneAddPerson?: JSX.Element;
  /* @conditional-compile-remove(PSTN-calls) */
  PeoplePaneOpenDialpad?: JSX.Element;
  /* @conditional-compile-remove(PSTN-calls) */
  DialpadStartCall?: JSX.Element;
  /* @conditional-compile-remove(rooms) */
  NoticePageAccessDeniedRoomsCall?: JSX.Element;
  /* @conditional-compile-remove(video-background-effects) */
  BlurVideoBackground?: JSX.Element;
  /* @conditional-compile-remove(video-background-effects) */
  RemoveVideoBackgroundEffect?: JSX.Element;
  /* @conditional-compile-remove(gallery-layouts) */
  GalleryOptions?: JSX.Element;
  /* @conditional-compile-remove(gallery-layouts) */
  SpeakerGalleryLayout?: JSX.Element;
  /* @conditional-compile-remove(gallery-layouts) */
  FloatingLocalVideoGalleryLayout?: JSX.Element;
  /* @conditional-compile-remove(gallery-layouts) */
  DefaultGalleryLayout?: JSX.Element;
  /* @conditional-compile-remove(gallery-layouts) */
  FocusedContentGalleryLayout?: JSX.Element;
  /* @conditional-compile-remove(gallery-layouts) */
  OverflowGalleryTop?: JSX.Element;
  /* @conditional-compile-remove(gallery-layouts) */
  LargeGalleryLayout?: JSX.Element;
};

/**
 * Icon wrapper to use when including customizable icons inside the CallComposite.
 * This wrapper ensures the icon name is being type-checked helping ensure no typos
 * and ensure that icon is customizable through the composite API.
 *
 * @private
 */
export const CallCompositeIcon = (props: CompositeIconProps<CallCompositeIcons>): JSX.Element => (
  <FontIcon {...props} />
);

/**
 * Icons that can be overridden for {@link CallWithChatComposite}.
 *
 * @public
 */
export type CallWithChatCompositeIcons = {
  // CallWithChat Specific Icons
  ChevronLeft?: JSX.Element;
  ControlBarChatButtonActive?: JSX.Element;
  ControlBarChatButtonInactive?: JSX.Element;
  ControlBarPeopleButton?: JSX.Element;
  Link?: JSX.Element;
  MoreDrawerMicrophones?: JSX.Element;
  MoreDrawerPeople?: JSX.Element;
  MoreDrawerSelectedMicrophone?: JSX.Element;
  MoreDrawerSelectedSpeaker?: JSX.Element;
  MoreDrawerSpeakers?: JSX.Element;

  // Call icons
  ControlButtonCameraOff?: JSX.Element;
  ControlButtonCameraOn?: JSX.Element;
  ControlButtonEndCall?: JSX.Element;
  ControlButtonMicOff?: JSX.Element;
  ControlButtonMicOn?: JSX.Element;
  ControlButtonOptions?: JSX.Element;
  ControlButtonScreenShareStart?: JSX.Element;
  ControlButtonScreenShareStop?: JSX.Element;
  /* @conditional-compile-remove(capabilities) */
  ControlButtonCameraProhibited?: JSX.Element;
  /* @conditional-compile-remove(capabilities) */
  ControlButtonMicProhibited?: JSX.Element;
  ErrorBarCallCameraAccessDenied?: JSX.Element;
  ErrorBarCallCameraAlreadyInUse?: JSX.Element;
  ErrorBarCallLocalVideoFreeze?: JSX.Element;
  ErrorBarCallMacOsCameraAccessDenied?: JSX.Element;
  ErrorBarCallMacOsMicrophoneAccessDenied?: JSX.Element;
  ErrorBarCallMicrophoneAccessDenied?: JSX.Element;
  ErrorBarCallMicrophoneMutedBySystem?: JSX.Element;
  ErrorBarCallMicrophoneUnmutedBySystem?: JSX.Element;
  ErrorBarCallNetworkQualityLow?: JSX.Element;
  ErrorBarCallNoMicrophoneFound?: JSX.Element;
  ErrorBarCallNoSpeakerFound?: JSX.Element;
  ErrorBarClear?: JSX.Element;
  HorizontalGalleryLeftButton?: JSX.Element;
  HorizontalGalleryRightButton?: JSX.Element;
  LobbyScreenConnectingToCall?: JSX.Element;
  LobbyScreenWaitingToBeAdmitted?: JSX.Element;
  LocalDeviceSettingsCamera?: JSX.Element;
  LocalDeviceSettingsMic?: JSX.Element;
  LocalDeviceSettingsSpeaker?: JSX.Element;
  LocalPreviewPlaceholder?: JSX.Element;
  Muted?: JSX.Element;
  NetworkReconnectIcon?: JSX.Element;
  NoticePageAccessDeniedTeamsMeeting?: JSX.Element;
  NoticePageJoinCallFailedDueToNoNetwork?: JSX.Element;
  NoticePageLeftCall?: JSX.Element;
  NoticePageRemovedFromCall?: JSX.Element;
  OptionsCamera?: JSX.Element;
  OptionsMic?: JSX.Element;
  OptionsSpeaker?: JSX.Element;
  ParticipantItemMicOff?: JSX.Element;
  ParticipantItemScreenShareStart?: JSX.Element;
  VideoTileMicOff?: JSX.Element;
  LocalCameraSwitch?: JSX.Element;
  /* @conditional-compile-remove(PSTN-calls) */
  PeoplePaneAddPerson?: JSX.Element;
  /* @conditional-compile-remove(PSTN-calls) */
  PeoplePaneOpenDialpad?: JSX.Element;
  /* @conditional-compile-remove(PSTN-calls) */
  DialpadStartCall?: JSX.Element;

  // Chat icons
  EditBoxCancel?: JSX.Element;
  EditBoxSubmit?: JSX.Element;
  MessageDelivered?: JSX.Element;
  MessageEdit?: JSX.Element;
  MessageFailed?: JSX.Element;
  MessageRemove?: JSX.Element;
  MessageSeen?: JSX.Element;
  MessageSending?: JSX.Element;
  SendBoxSend?: JSX.Element;
  SendBoxSendHovered?: JSX.Element;
  SendBoxAttachFile?: JSX.Element;

  // Icons common to Call and Chat.
  ParticipantItemOptions?: JSX.Element;
  ParticipantItemOptionsHovered?: JSX.Element;
};

/**
 * Icon wrapper to use when including customizable icons inside the CallWithChatComposite.
 * This wrapper ensures the icon name is being type-checked helping ensure no typos
 * and ensure that icon is customizable through the composite API.
 *
 * @private
 */
export const CallWithChatCompositeIcon = (props: CompositeIconProps<CallWithChatCompositeIcons>): JSX.Element => (
  <FontIcon {...props} />
);

/**
 * Icons that can be overridden in one of the composites exported by this library.
 *
 * See {@link ChatCompositeIcons}, {@link CallCompositeIcons} and {@link CallWithChatCompositeIcons} for more targeted types.
 *
 * @public
 */
export type CompositeIcons = ChatCompositeIcons & CallCompositeIcons & CallWithChatCompositeIcons;

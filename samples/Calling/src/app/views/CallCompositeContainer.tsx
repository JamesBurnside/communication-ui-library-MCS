// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GroupCallLocator, TeamsMeetingLinkLocator } from '@azure/communication-calling';
import {
  AvatarPersonaData,
  CallAdapterLocator,
  CallComposite,
  CallCompositeOptions,
  CommonCallAdapter,
  toFlatCommunicationIdentifier
} from '@azure/communication-react';
import { Spinner, Stack } from '@fluentui/react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useSwitchableFluentTheme } from '../theming/SwitchableFluentThemeProvider';
import { useIsMobile } from '../utils/useIsMobile';
import { CallScreenProps } from './CallScreen';

export type CallCompositeContainerProps = CallScreenProps & { adapter?: CommonCallAdapter };

export const CallCompositeContainer = (props: CallCompositeContainerProps): JSX.Element => {
  const { adapter } = props;
  const { currentTheme, currentRtl } = useSwitchableFluentTheme();
  const isMobileSession = useIsMobile();

  useEffect(() => {
    /**
     * We want to make sure that the page is up to date. If for example a browser is dismissed
     * on mobile, the page will be stale when opened again. This event listener will reload the page
     */
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    });
    return () => {
      window.removeEventListener('pageshow', () => {
        window.location.reload();
      });
    };
  }, []);

  const options: CallCompositeOptions = useMemo(
    () =>
      ({
        configurationPage: {
          audioOnly: true
        },
        callControls: {
          cameraButton: false,
          raiseHandButton: false,
          screenShareButton: false,
          moreButton: true,
          reactionButton: false,
          galleryViewButton: false,
          dtmfDialerButton: false,
          captionsButton: false,
          holdButton: false,
          peopleButton: false
        },
        deviceChecks: {
          camera: 'doNotPrompt',
          microphone: 'required'
        },
        autoShowDtmfDialer: true,
        galleryOptions: {
          isSpeakingDecoration: 'pulse'
        }
      }) as CallCompositeOptions,
    []
  );

  // Dispose of the adapter in the window's before unload event.
  // This ensures the service knows the user intentionally left the call if the user
  // closed the browser tab during an active call.
  useEffect(() => {
    const disposeAdapter = (): void => adapter?.dispose();
    window.addEventListener('beforeunload', disposeAdapter);
    return () => window.removeEventListener('beforeunload', disposeAdapter);
  }, [adapter]);

  const userId = adapter?.getState().userId;
  const setCopilotImage = useCallback(
    async (uId: string): Promise<AvatarPersonaData> => {
      // If the user is not the current user - assume to be the copilot bot.
      // Ideally we know the bot MRI and can directly check for this.
      if (userId && uId !== toFlatCommunicationIdentifier(userId)) {
        return {
          text: 'Copilot',
          imageUrl: 'https://r.bing.com/rp/nthuaHo_0CMpu-jrRrRx7PLDd10.svg'
        };
      } else {
        return {};
      }
    },
    [userId]
  );

  if (!adapter) {
    return (
      <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { height: '100%' } }}>
        <Spinner label={'Creating adapter'} ariaLive="assertive" labelPosition="top" />
      </Stack>
    );
  }

  let callInvitationUrl: string | undefined = window.location.href;
  // Only show the call invitation url if the call is a group call or Teams call, do not show for Rooms, 1:1 or 1:N calls
  if (props.callLocator && !isGroupCallLocator(props.callLocator) && !isTeamsMeetingLinkLocator(props.callLocator)) {
    callInvitationUrl = undefined;
  }

  return (
    <CallComposite
      adapter={adapter}
      fluentTheme={currentTheme.theme}
      rtl={currentRtl}
      callInvitationUrl={callInvitationUrl}
      formFactor={isMobileSession ? 'mobile' : 'desktop'}
      options={options}
      onFetchAvatarPersonaData={setCopilotImage}
    />
  );
};

const isTeamsMeetingLinkLocator = (locator: CallAdapterLocator): locator is TeamsMeetingLinkLocator => {
  return 'meetingLink' in locator;
};

const isGroupCallLocator = (locator: CallAdapterLocator): locator is GroupCallLocator => {
  return 'groupId' in locator;
};

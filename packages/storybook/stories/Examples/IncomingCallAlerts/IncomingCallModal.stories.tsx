// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Meta } from '@storybook/react/types-6-0';
import React, { useState } from 'react';
import { EXAMPLES_FOLDER_PREFIX } from '../../constants';
import { controlsToAdd, hiddenControl } from '../../controlsUtils';
import { useVideoStreams } from '../../utils';
import { IncomingCallModal as IncomingCallModalComponent } from './components';
import { getModalDocs } from './IncomingCallAlertsDocs';

const IncomingCallModalStory = (args): JSX.Element => {
  const videoStreamElements = useVideoStreams(args.localVideoStreamEnabled ? 1 : 0);
  const videoStreamElement = videoStreamElements[0] ? videoStreamElements[0] : null;

  const [showLocalVideo, setShowLocalVideo] = useState<boolean>(false);

  return (
    <IncomingCallModalComponent
      callerName={args.callerName}
      callerNameAlt={args.callerNameAlt}
      callerTitle={args.callerTitle}
      alertText={args.alertText}
      avatar={args.images.length > 0 ? args.images[0] : undefined}
      onClickVideoToggle={() => setShowLocalVideo(!showLocalVideo)}
      onClickAccept={() => null}
      onClickReject={() => null}
      localParticipantDisplayName={args.localParticipantDisplayName}
      localVideoInverted={args.localVideoInverted}
      localVideoStreamElement={showLocalVideo ? videoStreamElement : null}
    />
  );
};

export const IncomingCallModal = IncomingCallModalStory.bind({});

export default {
  id: `${EXAMPLES_FOLDER_PREFIX}-incomingcallalerts-incomingcallmodal`,
  title: `${EXAMPLES_FOLDER_PREFIX}/Incoming Call Alerts/Incoming Call Modal`,
  component: IncomingCallModalComponent,
  argTypes: {
    alertText: controlsToAdd.callModalAlertText,
    callerName: controlsToAdd.callerName,
    callerNameAlt: controlsToAdd.callerNameAlt,
    callerTitle: controlsToAdd.callerTitle,
    images: controlsToAdd.callerImages,
    localParticipantDisplayName: controlsToAdd.localParticipantDisplayName,
    localVideoStreamEnabled: controlsToAdd.localVideoStreamEnabled,
    localVideoInverted: controlsToAdd.localVideoInverted,
    // Hiding auto-generated controls
    avatar: hiddenControl,
    onClickAccept: hiddenControl,
    onClickReject: hiddenControl,
    localVideoStreamElement: hiddenControl,
    onClickVideoToggle: hiddenControl
  },
  parameters: {
    docs: {
      page: () => getModalDocs()
    }
  }
} as Meta;

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* @conditional-compile-remove(rich-text-editor-image-upload) */
/**
 * Convert a base64 string to a Blob.
 * @internal
 */
export const _base64ToBlob = (dataURI: string): Blob => {
  const byteString = atob(dataURI.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([arrayBuffer]);
};

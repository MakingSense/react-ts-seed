import { aphroditeSerializer } from 'jest-aphrodite-react';
import { StyleSheetTestUtils } from 'aphrodite/no-important';

expect.addSnapshotSerializer(aphroditeSerializer);

afterEach(() => {
  return new Promise(resolve => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    return process.nextTick(resolve);
  });
});

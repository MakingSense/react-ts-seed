import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { aphroditeSerializer } from 'jest-aphrodite-react';
import { StyleSheetTestUtils } from 'aphrodite/no-important';

expect.addSnapshotSerializer(aphroditeSerializer);

configure({ adapter: new Adapter() });

afterEach(() => {
  return new Promise(resolve => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    return process.nextTick(resolve);
  });
});

import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { configure, addDecorator } from '@storybook/react';

import 'bootstrap/dist/css/bootstrap.min.css';

addDecorator(withInfo({ inline: true }));
addDecorator(withKnobs);
addDecorator((storyFn) => <div style={{ textAlign: 'center'}}>{storyFn()}</div>);

const req = require.context('../src/stories', false, /.story.tsx$/);

function loadStories() {
    req.keys().forEach(req);
}

configure(loadStories, module);

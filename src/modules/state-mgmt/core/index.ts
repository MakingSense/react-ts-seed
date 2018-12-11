import { EpicRegistry } from '../EpicRegistry';
import { actions, ActionType } from './actions';
import { epics } from './epics';

export const coreState = { actions, ActionType, epics };

epics.forEach(epic => EpicRegistry.addEpic(epic));

import { useState } from 'react';

import {
  AppRoot,
  Panel,
  PanelHeader,
  SplitLayout,
  usePlatform,
  View,
} from '@vkontakte/vkui';

import { AgeByName } from './components/AgeByName';
import { FunnyFact } from './components/FunnyFact';
import { page1, page2 } from './constants';

import '@vkontakte/vkui/dist/vkui.css';

export function App() {
  const platform = usePlatform();
  const [activePanel, setActivePanel] = useState(page1);

  return (
    <AppRoot>
      <SplitLayout
        header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}
      >
        <View activePanel={activePanel}>
          <Panel id={page1}>
            <FunnyFact setActivePanel={setActivePanel} />
          </Panel>
          <Panel id={page2}>
            <AgeByName setActivePanel={setActivePanel} />
          </Panel>
        </View>
      </SplitLayout>
    </AppRoot>
  );
}

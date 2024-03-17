import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  AppRoot,
  Button,
  CellButton,
  Group,
  Header,
  Input,
  Panel,
  PanelHeader,
  SimpleCell,
  Spacing,
  Spinner,
  SplitCol,
  SplitLayout,
  View,
  usePlatform,
} from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { AgeByName } from './components/AgeByName';
import { page1, page2 } from './constants';
import { FunnyFact } from './components/FunnyFact';

export const App = () => {
  const platform = usePlatform();
  const [activePanel, setActivePanel] = useState(page1);

  return (
    <AppRoot>
      <SplitLayout
        header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}
      >
        <View activePanel={activePanel} >
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
};

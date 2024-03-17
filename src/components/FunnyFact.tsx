import { useQuery } from '@tanstack/react-query';
import {
  Button,
  CellButton,
  Group,
  Input,
  Panel,
  PanelHeader,
  Spacing,
  Spinner,
  View,
  usePlatform,
} from '@vkontakte/vkui';
import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { page1, page2 } from '../constants';

type PropsType = {
  setActivePanel: (val: string) => void;
};

export const FunnyFact = ({ setActivePanel }: PropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInputValue] = useState('');
  const { isFetching, data, refetch } = useQuery({
    queryKey: ['funnyFact'],
    enabled: false,
    queryFn: async () => {
      const res = await axios.get<{ fact: string }>(
        'https://catfact.ninja/fact'
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return res;
    },
  });

  const handleClick = () => {
    refetch();
  };

  useEffect(() => {
    if (data?.data) {
      const input = inputRef.current;
      const fact = data.data.fact;
      setInputValue(fact);

      const firstSpaceIndex = fact.indexOf(' ');

      const timerId = setTimeout(() => {
        if (!input) return;
        input.focus();

        if (firstSpaceIndex !== -1) {
          input.setSelectionRange(firstSpaceIndex, firstSpaceIndex);
        } else {
          input.setSelectionRange(fact.length, fact.length);
        }

        input.scrollLeft = 0;
      });

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [data]);

  return (
    <>
      <PanelHeader>Funny fact</PanelHeader>
      <Group style={{ margin: '0 16px'}}>
        <Input
          getRef={inputRef}
          value={input}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Here will be some funny fact"
          before={isFetching && <Spinner size="small"></Spinner>}
        />

        <Spacing size={16} />

        <Button onClick={handleClick}>Load funny fact</Button>

        <Spacing size={16} />

        <CellButton onClick={() => setActivePanel(page2)}>
          Go to the "Get Age By Name" page
        </CellButton>
      </Group>
    </>
  );
};

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import {
  Button,
  CellButton,
  Group,
  Input,
  PanelHeader,
  Spacing,
  Spinner,
} from '@vkontakte/vkui';

import { page2 } from '../constants';

type PropsType = {
  setActivePanel: (val: string) => void;
};

export function FunnyFact({ setActivePanel }: PropsType) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInputValue] = useState('');
  const { isFetching, data, refetch } = useQuery({
    queryKey: ['funnyFact'],
    enabled: false,
    queryFn: () => axios.get<{ fact: string }>('https://catfact.ninja/fact'),
  });

  const handleClick = () => {
    refetch();
  };

  useEffect(() => {
    if (data?.data) {
      const inputEl = inputRef.current;
      const { fact } = data.data;
      setInputValue(fact);

      const firstSpaceIndex = fact.indexOf(' ');

      const timerId = setTimeout(() => {
        if (!inputEl) return;
        inputEl.focus();

        if (firstSpaceIndex !== -1) {
          inputEl.setSelectionRange(firstSpaceIndex, firstSpaceIndex);
        } else {
          inputEl.setSelectionRange(fact.length, fact.length);
        }

        inputEl.scrollLeft = 0;
      });

      return () => {
        clearTimeout(timerId);
      };
    }

    return undefined;
  }, [data]);

  return (
    <>
      <PanelHeader>Funny fact</PanelHeader>
      <Group style={{ margin: '0 16px' }}>
        <Input
          getRef={inputRef}
          value={input}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Here will be some funny fact"
          before={isFetching && <Spinner size="small" />}
        />

        <Spacing size={16} />

        <Button onClick={handleClick}>Load funny fact</Button>

        <Spacing size={16} />

        <CellButton onClick={() => setActivePanel(page2)}>
          Go to the &quot;Get Age By Name&quot; page
        </CellButton>
      </Group>
    </>
  );
}

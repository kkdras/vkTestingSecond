import {
  PanelHeader,
  Group,
  Input,
  Spacing,
  CellButton,
  FormItem,
  Text,
  Spinner,
  Button
} from '@vkontakte/vkui';
import { page1, schema } from '../constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import axios from 'axios';

type PropsType = {
  setActivePanel: (val: string) => void;
};

type FormData = {
  name: string;
};

const groupOptions = (name: string) => {
  return queryOptions({
    queryKey: ['getAgeByName', name],
    enabled: false,
    queryFn: async () => {
      const res = await axios.get<{ age: number }>(
        `https://api.agify.io/?name=${name}`
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return res;
    },
  });
};

export const AgeByName = ({ setActivePanel }: PropsType) => {
  const { watch, handleSubmit, register, formState } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const timeoutId = useRef<number>();
  const name = watch('name');
  const { isFetching, data, refetch } = useQuery(groupOptions(name));

  const onSubmit = () => {
    debugger
    refetch();
    if (timeoutId.current) clearTimeout(timeoutId.current);
  };

  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 3000)
  }, [name])

  return (
    <>
      <PanelHeader>Get age by name</PanelHeader>
      <Group style={{ margin: '0 16px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormItem
            htmlFor="name"
            top="Name"
            status={formState.errors.name ? 'valid' : 'error'}
            bottomId="name"
          >
            <Input
              aria-labelledby="name"
              id="name"
              type="string"
              required
              {...register('name')}
            />
          </FormItem>

          <Button type='submit' style={{ marginLeft: '16px' }}>Check your age</Button>
        </form>

        <Spacing size={16} />

        {isFetching && <Spinner />}

        {data?.data && <Text>Your age is {data.data.age}</Text>}

        <Spacing size={16} />

        <CellButton onClick={() => setActivePanel(page1)}>
          Go to the "Funny fact" page
        </CellButton>
      </Group>
    </>
  );
};

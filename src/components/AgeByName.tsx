import axios from 'axios';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { queryOptions, useQuery } from '@tanstack/react-query';
import {
  Button,
  CellButton,
  FormItem,
  Group,
  Input,
  PanelHeader,
  Spacing,
  Spinner,
  Text,
} from '@vkontakte/vkui';

import { page1, schema } from '../constants';

type PropsType = {
  setActivePanel: (val: string) => void;
};

type FormData = {
  name: string;
};

const groupOptions = (name: string) =>
  queryOptions({
    queryKey: ['getAgeByName', name],
    enabled: false,
    queryFn: () =>
      axios.get<{ age: number }>(`https://api.agify.io/?name=${name}`),
  });

export function AgeByName({ setActivePanel }: PropsType) {
  const { watch, handleSubmit, control, formState } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { name: '' },
  });

  const timeoutId = useRef<number>();
  const name = watch('name');
  const { isFetching, data, refetch } = useQuery(groupOptions(name));

  const onSubmit = () => {
    refetch();
    if (timeoutId.current) clearTimeout(timeoutId.current);
  };

  useEffect(() => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 3000);
  }, [name]);

  return (
    <>
      <PanelHeader>Get age by name</PanelHeader>
      <Group style={{ margin: '0 16px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormItem
            htmlFor="name"
            top="Name"
            status={formState?.errors?.name ? 'error' : 'valid'}
            bottomId="name"
          >
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  aria-labelledby="name"
                  id="name"
                  type="string"
                  onChange={onChange} // send value to hook form
                  onBlur={onBlur} // notify when input is touched/blur
                  value={value}
                />
              )}
            />
          </FormItem>
          <Button type="submit" style={{ marginLeft: '16px' }}>
            Check your age
          </Button>
        </form>

        <Spacing size={16} />

        {isFetching && <Spinner style={{ marginLeft: '16px' }} />}

        {data?.data && (
          <Text style={{ marginLeft: '16px', display: 'block' }}>
            Your age is {data.data.age}
          </Text>
        )}

        <Spacing size={16} />

        <CellButton onClick={() => setActivePanel(page1)}>
          Go to the &quot;Funny fact&quot; page
        </CellButton>
      </Group>
    </>
  );
}

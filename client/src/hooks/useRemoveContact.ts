import { User } from '@/types';
import { del } from '@/api';
import { useMutation } from '@tanstack/react-query';
import queryClient from '@/queryClient';
import { QUERY_KEY_CONTACTS } from '@/constants';
import useAbortController from './useAbortController';

const useRemoveContact = (user: User) => {
  const { prepareAbortController, getSignal, abort } = useAbortController();

  const { mutate, ...rest } = useMutation({
    mutationFn: () => {
      prepareAbortController();
      return del(`/contacts/${user.id}`, { signal: getSignal() });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY_CONTACTS] });
      const prevContacts = queryClient.getQueryData([QUERY_KEY_CONTACTS]);
      queryClient.setQueryData([QUERY_KEY_CONTACTS], (oldContacts) =>
        Array.isArray(oldContacts)
          ? oldContacts.filter((contact) => contact.id !== user.id)
          : [],
      );
      return { prevContacts };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData([QUERY_KEY_CONTACTS], context?.prevContacts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CONTACTS] });
    },
  });

  return {
    removeContact: mutate,
    abort,
    ...rest,
  };
};

export default useRemoveContact;

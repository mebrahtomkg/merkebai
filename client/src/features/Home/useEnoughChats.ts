import useChats from '@/hooks/useChats';

const useEnoughChats = () => {
  const realChats = useChats();

  return realChats;
};

export default useEnoughChats;

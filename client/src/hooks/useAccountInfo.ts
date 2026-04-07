import { useMemo } from 'react';
import { calculateFullName, calculateNameInitials } from '../utils';
import { useAccount } from '.';

const useAccountInfo = () => {
  const account = useAccount();

  const { firstName, lastName } = account;

  const fullName = useMemo(
    () => calculateFullName(firstName, lastName),
    [firstName, lastName],
  );

  const nameInitials = useMemo(
    () => calculateNameInitials(firstName, lastName),
    [firstName, lastName],
  );

  return {
    ...account,
    fullName,
    nameInitials,
  };
};

export default useAccountInfo;

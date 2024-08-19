import { useContext } from 'react';

type TConfig = {
  contextName: string;
  providerName: string;
}

export default function useContextWrapper<T>(
  ReactContext: React.Context<T>,
  config: TConfig,
) {
  const context = useContext(ReactContext);
  const { contextName, providerName } = config;

  if (!context) throw new Error(`${contextName} must be used within a ${providerName}`);

  return context;
}
import type { getConfig } from '@/wagmi';

export type ChainId = ReturnType<typeof getConfig>['chains'][number]['id'];

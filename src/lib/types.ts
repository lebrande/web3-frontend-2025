import type { config } from '@/wagmi';

export type ChainId = (typeof config.chains)[number]['id'];

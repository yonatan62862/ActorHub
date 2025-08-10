import NodeCache from 'node-cache';
import config from '../config/config';

const cache = new NodeCache({ stdTTL: config.cacheTtlSeconds });
export default cache;
export const keys = { cast: 'cast' };

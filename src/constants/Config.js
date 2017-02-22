import URL from 'url';

var query = URL.parse(document.location.search, true).query;
export const HOST = query.url || 'http://52.41.223.84:8080';
export const LIST_ID = query.id || '1';
export const NODE_ID = query.nodeId || (Math.floor(Math.random() * 0xF0000000) + 0x10000000).toString(16);
// lib/sanity.server.js
import { client } from "./sanity";

// Houd dezelfde API als je in sitemap gebruikt:
export const getClient = () => client;

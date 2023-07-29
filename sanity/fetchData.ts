import { client } from "./lib/client";

export async function getProducts() {
    const res = await client.fetch(`*[_type == "products"]`);
    return res;
  }
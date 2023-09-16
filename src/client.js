import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || "rcf6hjd6",
  dataset: "production",
  apiVersion: "2021-11-16",
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN || "skUQiH4rRXxi9ojJzm8fCanFs6psdXSstNNgcmJXZekcqQCy2AtdqfQgcAiLESIPaNXwwwEQJsIXYEKsYrvp8i86wjhnaKsvDMJYjBaWRiYkcDYC417iqZT1ZPmAk2nperQMayOLgFPZsCvUcSYxnSPcbMEnHyKpKTKLX1v4M1s435bRC5Ag",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

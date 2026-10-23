import type { DetailedHTMLProps, HTMLAttributes, Ref } from "react";

type TavusEmbedProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  "deployment-id": string;
  allow?: string;
  layout?: string;
  ref?: Ref<HTMLElement>;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "tavus-embed": TavusEmbedProps;
    }
  }
}

export {};

import { permanentRedirect } from "next/navigation";

export default function DocsPage() {
  permanentRedirect("/docs/getting-started/introduction");
}


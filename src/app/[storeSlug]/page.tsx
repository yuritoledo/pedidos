import { redirect } from 'next/navigation';

export default function StoreRedirect({
  params,
}: {
  params: { storeSlug: string };
}) {
  redirect(`/${params.storeSlug}/produtos`);
}

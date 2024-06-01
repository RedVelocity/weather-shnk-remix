import { LoaderFunctionArgs, redirect } from '@remix-run/cloudflare';

export const loader = ({ context }: LoaderFunctionArgs) => {
  const { city, region, country } = context.cloudflare.cf;
  return redirect(`/${city},${region},${country}`);
};

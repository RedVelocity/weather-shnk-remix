import { LoaderFunctionArgs, redirect } from '@remix-run/cloudflare';

export const loader = ({ context }: LoaderFunctionArgs) => {
  const { city, region, country } = context.cloudflare.cf;
  if (city && region && country)
    return redirect(`/${city},${region},${country}`);
  return redirect('/Scranton,Pennsylvania,US');
};

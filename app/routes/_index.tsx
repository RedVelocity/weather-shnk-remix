import { LoaderFunctionArgs, redirect } from '@remix-run/cloudflare';
import getLocationPath from '~/lib/utils/getLocationPath';

export const loader = ({ context }: LoaderFunctionArgs) => {
  const { city, region, country } = context.cloudflare.cf;
  if (city && region && country)
    return redirect(getLocationPath(city, `${region},${country}`));
  return redirect('/Scranton,Pennsylvania,US');
};

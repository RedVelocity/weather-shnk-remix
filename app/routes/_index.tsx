import {
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from '@remix-run/cloudflare';

export const loader = ({ context }: LoaderFunctionArgs) => {
  const { city, region, country } = context.cloudflare.cf;
  return redirect(`/${city},${region},${country}`);
};

export const meta: MetaFunction<typeof loader> = () => {
  return [
    {
      title: 'Weather | redvelo.site',
      description: 'Check weather for any place through redvelo.site!',
      keywords: [
        'weather',
        'Next.js',
        'React',
        'JavaScript',
        'Weather',
        'redvelo',
        'vercel weather',
        'weather vercel',
        'weather redvelocity',
        'redvelo.site',
        'redvelocity',
        'redvelocity.site',
        'redvelo.city',
        'red velocity',
        'weather red velocity',
      ],
      authors: [{ name: 'RedVelocity', url: 'https://redvelo.site' }],
      creator: 'RedVelocity',
      publisher: 'RedVelocity',
    },
  ];
};

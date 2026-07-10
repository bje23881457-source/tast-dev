import { MDXRemote } from 'next-mdx-remote/rsc';

// Renders MDX body content. Styling comes from the `.prose-silla` wrapper (globals.css).
export default function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-silla">
      <MDXRemote source={source} />
    </div>
  );
}

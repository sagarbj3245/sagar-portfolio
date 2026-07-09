import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-4 font-serif text-5xl text-foreground">
        This page drifted off into space.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist — but my work does.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent-strong"
      >
        Back to home
      </Link>
    </div>
  );
}

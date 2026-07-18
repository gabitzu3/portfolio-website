import type { Profile } from "@/types";

interface HeroSectionProps {
  profile: Profile | null;
}

export function HeroSection({ profile }: HeroSectionProps) {

  return (

    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-3xl space-y-6">

          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Portfolio
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {profile?.full_name ?? "Your Name"}
          </h1>

          <p className="text-xl text-muted-foreground">
            {profile?.title ?? "Professional title goes here"}
          </p>

          {profile?.bio ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              {profile.bio}

            </p>
          ) : null}

        </div>

      </div>

    </section>

  );

}

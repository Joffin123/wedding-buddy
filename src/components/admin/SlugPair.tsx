"use client";

import { useState } from "react";
import { slugify } from "@/lib/slugify";
import { fieldClass, labelClass } from "@/components/admin/ui";

export default function SlugPair({
  defaultName,
  defaultSlug,
  namePlaceholder,
  slugPlaceholder,
}: {
  defaultName?: string;
  defaultSlug?: string;
  namePlaceholder?: string;
  slugPlaceholder: string;
}) {
  const [name, setName] = useState(defaultName ?? "");
  const [slug, setSlug] = useState(defaultSlug ?? "");
  // Once the slug field has been edited by hand (or we're editing an existing
  // record with a slug already set), stop auto-deriving it from the name.
  const [slugTouched, setSlugTouched] = useState(Boolean(defaultSlug));

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className={labelClass} htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          required
          value={name}
          placeholder={namePlaceholder}
          onChange={(e) => {
            const value = e.target.value;
            setName(value);
            if (!slugTouched) setSlug(slugify(value));
          }}
          className={fieldClass}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="slug">Slug (URL-safe, unique)</label>
        <input
          id="slug"
          name="slug"
          required
          value={slug}
          placeholder={slugPlaceholder}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(slugify(e.target.value));
          }}
          className={fieldClass}
        />
      </div>
    </div>
  );
}

// Maps the free-text `region` values used in the Supabase `venues` table
// (set via the admin form's datalist — town/area names like "Kochi" or
// "Kumarakom") to the 14 official Kerala district slugs used for the
// public /venues/[district] browsing pages.
//
// NOTE: two admin-selectable regions have no district mapping yet because
// no Kerala district covers them 1:1 by name — "Pathanamthitta" and
// "Malappuram" have no matching region option in the admin form at all, so
// venues can never be tagged into those two districts today.
export const REGION_TO_DISTRICT: Record<string, string> = {
  Thiruvananthapuram: "thiruvananthapuram",
  Varkala: "thiruvananthapuram",
  Kollam: "kollam",
  Alappuzha: "alappuzha",
  Kumarakom: "kottayam",
  Munnar: "idukki",
  Thekkady: "idukki",
  Kochi: "ernakulam",
  Thrissur: "thrissur",
  Palakkad: "palakkad",
  Kozhikode: "kozhikode",
  Wayanad: "wayanad",
  Kannur: "kannur",
  Kasaragod: "kasaragod",
};

export function regionsForDistrictSlug(slug: string): string[] {
  return Object.entries(REGION_TO_DISTRICT)
    .filter(([, district]) => district === slug)
    .map(([region]) => region);
}

export function districtSlugForRegion(region: string): string | null {
  return REGION_TO_DISTRICT[region] ?? null;
}

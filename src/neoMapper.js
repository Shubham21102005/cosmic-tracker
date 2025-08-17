/**
 * Convert NASA's raw feed into a cleaner format for UI
 */
export function mapNeoFeed(rawFeed) {
  const mapped = {};

  for (const date in rawFeed) {
    mapped[date] = rawFeed[date].map((neo) => {
      // avg diameter
      const km = neo.estimated_diameter.kilometers;
      const avgDiameter =
        (km.estimated_diameter_min + km.estimated_diameter_max) / 2;

      // first approach info (there can be many)
      const approach = neo.close_approach_data[0];

      return {
        id: neo.id,
        name: neo.name,
        jplUrl: neo.nasa_jpl_url,
        hazardous: neo.is_potentially_hazardous_asteroid,
        diameterKmAvg: avgDiameter,
        approach: {
          date: approach.close_approach_date_full,
          velocityKps: Number(approach.relative_velocity.kilometers_per_second),
          missDistanceKm: Number(approach.miss_distance.kilometers),
          orbitingBody: approach.orbiting_body,
        },
      };
    });
  }

  return mapped;
}

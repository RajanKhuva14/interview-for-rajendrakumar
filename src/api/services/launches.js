import { API } from "../axios";

function indexBy(arr, key = "id") {
  return arr.reduce((map, item) => {
    map[item[key]] = item;
    return map;
  }, {});
}

export const getMergedLaunches = async () => {
  try {
    const [
      { data: launches },
      { data: rockets },
      { data: launchpads },
      { data: capsules },
      { data: payloads },
      { data: landpads },
    ] = await Promise.all([
      API.get("/launches"),
      API.get("/rockets"),
      API.get("/launchpads"),
      API.get("/capsules"),
      API.get("/payloads"),
      API.get("/landpads"),
    ]);

    const byRocket = indexBy(rockets);
    const byPad = indexBy(launchpads);
    const byCapsule = indexBy(capsules);
    const byPayload = indexBy(payloads);
    const byLandpad = indexBy(landpads);

    const merged = launches.map((l) => {
      const status = l.upcoming ? "Upcoming" : l.success ? "Success" : "Failed";

      return {
        id: l.id,
        flight_number: l.flight_number,
        mission_name: l.name,
        launch_date_utc: l.date_utc,
        launch_status: status,
        patch: l.links.patch,
        rocket: {
          id: l.rocket,
          name: byRocket[l.rocket]?.name,
          version: byRocket[l.rocket]?.engines.version,
          manufacturer: byRocket[l.rocket]?.company,
          nationality: byRocket[l.rocket]?.country,
        },
        launch_site: {
          id: l.launchpad,
          ...byPad[l.launchpad],
        },
        orbit: byPayload[l.payloads[0]]?.orbit,
        capsules: l.capsules.map((cid) => byCapsule[cid]),
        payloads: l.payloads.map((pid) => byPayload[pid]),
        cores: l.cores.map((c) => ({
          flight: c.flight,
          landing_success: c.landing_success,
          landing_type: c.landing_type,
          landpad: byLandpad[c.landpad],
        })),
        details: l.details,
        links: {
          wikipedia: l.links.wikipedia,
          article: l.links.article,
          webcast: l.links.webcast,
          presskit: l.links.presskit,
        },
      };
    });

    return { data: merged, error: null };
  } catch (error) {
    console.error("Error fetching merged launches:", error);
    return { data: null, error };
  }
};

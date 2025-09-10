import type { PitchFilters } from "~/types/pitch";

/**
 * Formats pitch filters into a URL query string
 * @param filters - The pitch filters object
 * @returns Formatted query string (e.g., "?location=Achimota&minPrice=100&maxPrice=200&pitchType=11-a-side&amenities=parking,floodlights")
 */
export function formatQuery(filters: PitchFilters) {
  const params = new URLSearchParams();
  const pureParams: string[] = [];

  // Add each filter to the query string if it has a value
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        // For array values (amenities, pitchType), join with commas
        if (value.length > 0) {
          const arrayValue = value.join(",");
          params.append(key, arrayValue);
          pureParams.push(`${key}=${arrayValue}`);
        }
      } else {
        // For primitive values, convert to string and add
        const stringValue = String(value);
        params.append(key, stringValue);
        pureParams.push(`${key}=${stringValue}`);
      }
    }
  });

  const queryString = params.toString();
  const pureString = pureParams.join("&");

  return {
    queryString: queryString ? `?${queryString}` : "",
    pureString: pureString ? `?${pureString}` : "",
  };
}

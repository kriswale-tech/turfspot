// Represents the browser's geolocation permission state.
export type GeolocationPermission = "granted" | "prompt" | "denied" | "unknown";

// Strongly-typed structure for geolocation coordinates and related metadata.
type LocationCoordinates = {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number;
};

// Standardized result for any location attempt, including success state,
// coordinates (if available), error description, and permission state.
export type GetLocationResult = {
  success: boolean;
  coords?: LocationCoordinates;
  error?: string;
  permission: GeolocationPermission;
};

// Cache of the last-known permission state to avoid redundant permission queries.
let cachedPermissionState: GeolocationPermission | null = null;

// Queries the Permissions API (when available) for the current geolocation permission.
// Falls back to "unknown" on unsupported environments or exceptions.
async function queryGeolocationPermission(): Promise<GeolocationPermission> {
  if (cachedPermissionState) return cachedPermissionState;

  if (typeof window === "undefined") return "unknown";

  const permissions = (navigator as Navigator & { permissions?: Permissions })
    .permissions;
  if (!permissions || typeof permissions.query !== "function") {
    cachedPermissionState = "unknown";
    return cachedPermissionState;
  }

  try {
    const status = await permissions.query({
      name: "geolocation" as PermissionName,
    });
    cachedPermissionState =
      (status?.state as GeolocationPermission) ?? "unknown";
    return cachedPermissionState;
  } catch {
    // Some browsers (older Safari) may throw for geolocation queries
    cachedPermissionState = "unknown";
    return cachedPermissionState;
  }
}

// Extracts and normalizes coordinates from a GeolocationPosition,
// ensuring optional fields resolve to null instead of undefined.
function readCoordinates(position: GeolocationPosition): LocationCoordinates {
  const {
    latitude,
    longitude,
    accuracy,
    altitude,
    altitudeAccuracy,
    heading,
    speed,
  } = position.coords;
  return {
    latitude,
    longitude,
    accuracy,
    altitude: altitude ?? null,
    altitudeAccuracy: altitudeAccuracy ?? null,
    heading: heading ?? null,
    speed: speed ?? null,
    timestamp: position.timestamp,
  };
}

// Vue composable exposing geolocation helpers for components to consume.
export function useUserGeolocation() {
  // Attempts to get the user's current position with sensible defaults and
  // returns a structured result with coordinates or a human-readable error.
  const getLocation = async (
    options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  ): Promise<GetLocationResult> => {
    if (typeof window === "undefined") {
      return {
        success: false,
        error: "Geolocation is only available in the browser.",
        permission: "unknown",
      };
    }

    if (!("geolocation" in navigator)) {
      return {
        success: false,
        error: "Your browser does not support geolocation.",
        permission: "unknown",
      };
    }

    return new Promise<GetLocationResult>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          cachedPermissionState = "granted";
          resolve({
            success: true,
            coords: readCoordinates(position),
            permission: "granted",
          });
        },
        (err) => {
          let errorMessage =
            "An unknown error occurred while fetching your location.";
          if (err.code === err.PERMISSION_DENIED) {
            cachedPermissionState = "denied";
            errorMessage =
              "Location permission denied. Enable location access in your browser settings and try again.";
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            errorMessage =
              "Location information is unavailable. Check your network/GPS and ensure you have a clear signal.";
          } else if (err.code === err.TIMEOUT) {
            errorMessage =
              "Location request timed out. Try again from an open area with better signal.";
          }
          resolve({
            success: false,
            error: errorMessage,
            permission: cachedPermissionState || "unknown",
          });
        },
        options
      );
    });
  };

  // Triggers/requests geolocation permission by invoking getCurrentPosition.
  // Resolves with a best-known permission state based on the outcome.
  const requestPermission = async (
    options: PositionOptions = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 0,
    }
  ): Promise<GeolocationPermission> => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      return "unknown";
    }

    // Clear cache to ensure we trigger a fresh permission check
    cachedPermissionState = null;

    return new Promise<GeolocationPermission>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        () => {
          cachedPermissionState = "granted";
          resolve("granted");
        },
        async (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            cachedPermissionState = "denied";
            resolve("denied");
            return;
          }
          // For other errors (e.g., timeout), report the current permission state
          const state = await queryGeolocationPermission();
          resolve(state);
        },
        options
      );
    });
  };

  // Public API: provide geolocation helpers for use in UI components.
  return { getLocation, requestPermission };
}

type GeolocationPermission = "granted" | "prompt" | "denied" | "unknown";

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

type LocationFailure = {
  code: number | null;
  name: string;
  message: string;
};

type GetLocationResult = {
  success: boolean;
  coords?: LocationCoordinates;
  error?: LocationFailure;
  permission: GeolocationPermission;
};

let cachedPermissionState: GeolocationPermission | null = null;

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

function toFriendlyError(
  error: GeolocationPositionError | Error
): LocationFailure {
  if ("code" in error) {
    const code = error.code;
    let message = "";
    switch (code) {
      case error.PERMISSION_DENIED:
        message =
          "Location permission denied. Enable location access in your browser settings and try again.";
        break;
      case error.POSITION_UNAVAILABLE:
        message =
          "Location information is unavailable. Check your network/GPS and ensure you have a clear signal.";
        break;
      case error.TIMEOUT:
        message =
          "Location request timed out. Try again from an open area with better signal.";
        break;
      default:
        message = "An unknown error occurred while fetching your location.";
    }
    return { code, name: "GeolocationPositionError", message };
  }

  return { code: null, name: error.name || "Error", message: error.message };
}

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

export function useUserGeolocation() {
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
        error: {
          code: null,
          name: "SSRUnsupported",
          message: "Geolocation is only available in the browser.",
        },
        permission: "unknown",
      };
    }

    if (!("geolocation" in navigator)) {
      return {
        success: false,
        error: {
          code: null,
          name: "GeolocationUnsupported",
          message: "Your browser does not support geolocation.",
        },
        permission: "unknown",
      };
    }

    let permission: GeolocationPermission = await queryGeolocationPermission();

    if (permission === "denied") {
      return {
        success: false,
        error: {
          code: GeolocationPositionError.PERMISSION_DENIED,
          name: "GeolocationPermissionDenied",
          message:
            "Location permission is denied. Please enable location access for this site in your browser settings.",
        },
        permission,
      };
    }

    return new Promise<GetLocationResult>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Permission is implicitly granted or allowed for this call
          cachedPermissionState = "granted";
          resolve({
            success: true,
            coords: readCoordinates(position),
            permission: "granted",
          });
        },
        (err) => {
          // If user dismisses or denies at prompt, surface a friendly error
          const failure = toFriendlyError(err);
          // Update cached permission when possible
          if (err.code === err.PERMISSION_DENIED) {
            cachedPermissionState = "denied";
            permission = "denied";
          }
          resolve({ success: false, error: failure, permission });
        },
        options
      );
    });
  };

  const checkPermission = async (): Promise<GeolocationPermission> => {
    return queryGeolocationPermission();
  };

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

  return { getLocation, checkPermission, requestPermission };
}

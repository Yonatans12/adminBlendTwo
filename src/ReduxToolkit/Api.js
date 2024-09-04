const DevelopmentUrl = "https://devapi.blendtwo.com";
const ProductionUrl = "https://api.blendtwo.com";

let ProjectMode = "prod";

export const BaseUrl = ProjectMode === "dev" ? DevelopmentUrl : ProductionUrl;

export const authdata = JSON.parse(localStorage.getItem("Blendtwo_admin"));

export let config = {
  headers: { apikey: authdata?.apikey, token: authdata?.token },
};

export const setAuthData = (authdata) => {
  localStorage.setItem("Blendtwo_admin", JSON.stringify(authdata));
};

export function formatTime(datetimeString) {
  const date = new Date(datetimeString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  let period = " am";

  if (hours >= 12) {
    period = " pm";
    if (hours > 12) {
      hours -= 12;
    }
  }

  if (hours === 0) {
    hours = 12;
  }

  let formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}${period}`;

  return formattedTime;
}

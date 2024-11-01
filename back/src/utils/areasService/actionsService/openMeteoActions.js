import fetch from "node-fetch";

export const actionsTriggersOpenMeteo = async (type, data) => {
  if (type === "on_evrest_melt") {
    if ((await openMeteoActionsEvrestMelt()) === true) {
      return true;
    }
    return false;
  }
  if (type === "on_evrest_almost_melting") {
    if ((await openMeteoActionsEvrestAlmostMelting()) === true) {
      return true;
    }
    return false;
  }
  return false;
};

const openMeteoActionsEvrestMelt = async () => {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=27.9881&longitude=86.9250&current_weather=true",
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const result = await response.json();
      const temperature = result.current_weather.temperature;
      if (temperature > 0) {
        console.log("Evrest is melting");
        return true;
      }
      return false;
    } else {
      console.log("Error :", response.status + " " + response.statusText);
    }
  } catch (error) {
    console.log(error.status);
    return false;
  }
  return false;
};

const openMeteoActionsEvrestAlmostMelting = async () => {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=27.9881&longitude=86.9250&current_weather=true",
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const result = await response.json();
      const temperature = result.current_weather.temperature;
      if (temperature > -10) {
        console.log("Evrest is almost melting");
        return true;
      }
      return false;
    } else {
      console.log("Error :", response.status + " " + response.statusText);
    }
  } catch (error) {
    console.log(error.status);
    return false;
  }
  return false;
};

export default { actionsTriggersOpenMeteo };

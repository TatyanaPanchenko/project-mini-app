import { retrieveLaunchParams } from "@telegram-apps/sdk";

const { initDataRaw } = retrieveLaunchParams();

export default class Services {
  static async getAuth() {
    try {
      fetch("https://miniapp-1138f.web.app/api", {
        method: "POST",
        headers: {
          Authorization: `tma ${initDataRaw}`,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
  static async getRecomendations() {
    try {
      const response = await fetch(
        // "https://api.padzei.com/recommendations/50?initial=true"
        "https://api.padzei.com/recommendations-test/500/911?initial=true"
      );
      console.log(response);
      return await response.json();
    } catch (e) {
      console.error(e);
      console.log("Сервер недоступен");
    }
  }

  // static async getRecomendations(user) {
  //   try {
  //     const response = await fetch(
  //       "https://api.padzei.com/recommendations-by-query/5",
  //       {
  //         method: "POST",
  //         headers: JSON.stringify(user),
  //         // body: JSON.stringify(user),
  //       }
  //     );
  //     console.log(response);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }
}

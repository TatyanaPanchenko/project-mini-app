export default class Services {
  static async getRecomendations() {
    try {
      const response = await fetch(
        "https://api.padzei.com/recommendations/50?initial=false"
      );
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
}

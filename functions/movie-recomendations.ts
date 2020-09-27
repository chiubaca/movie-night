/* eslint-disable no-inner-declarations */
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import axios from "axios";

export const handler = async function (
  event: APIGatewayProxyEvent,
  _context: any,
  callback: APIGatewayProxyCallback
): Promise<void> {
  try {
    if (event.httpMethod === "POST") {
      const API_KEY = process.env.VUE_APP_MOVIE_DB_API_KEY;
      // const recomendationsPayload: any[] = [];

      // extract movie Ids from body payload
      const movieIds: { ids: number[] } = await JSON.parse(
        event.body as string
      );

      const recomendations = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieIds.ids[0]}/recommendations?api_key=${API_KEY}`
      );

      return callback(null, {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg: recomendations.data }),
      });
    } else {
      return callback(null, {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "not supported" }),
      });
    }
  } catch (error) {
    console.error("There was an error", error);
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error }),
    });
  }
};

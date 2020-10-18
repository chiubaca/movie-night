import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import axios from "axios";

// Dont let axios throw an error on 4XX errors so we can handle manually
axios.defaults.validateStatus = (status: number): boolean => status <= 500;

export const handler = async function (
  event: APIGatewayProxyEvent,
  _context: unknown,
  callback: APIGatewayProxyCallback
): Promise<void> {
  try {
    if (event.httpMethod === "GET") {
      const API_KEY = process.env.VUE_APP_MOVIE_DB_API_KEY;

      // Extract movie Ids from query param
      const movieIdParam = event.queryStringParameters?.id as string;
      const showTypeIdParam = event.queryStringParameters?.type as string;

      console.log("params provided", movieIdParam, showTypeIdParam);
      // Check if id param was provided if not throw error
      if (!movieIdParam) {
        return callback(null, {
          statusCode: 401,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            error: "no movie id was provided",
          }),
        });
      }

      // Check if show type param was provided if not throw error
      if (!showTypeIdParam) {
        return callback(null, {
          statusCode: 401,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            error: "no show type was provided",
          }),
        });
      }

      // Type check on query param to ensure it is a number
      const showId: number | false = isNaN(Number(movieIdParam))
        ? false
        : Number(movieIdParam);

      // Throw error if provided id was not a number
      if (showId === false) {
        console.log("empty id", movieIdParam);
        return callback(null, {
          statusCode: 401,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            error: "Not a valid movie ID",
          }),
        });
      }

      // Type check on showTypeIdParam to check it is either movie or tv
      // TODO: Use TS Enum?
      const showType: "movie" | "tv" | false =
        showTypeIdParam === "movie" || showTypeIdParam === "tv"
          ? showTypeIdParam
          : false;

      if (showType === false) {
        console.log("not valid show type", showTypeIdParam);
        return callback(null, {
          statusCode: 401,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            error: "Not a valid show type",
          }),
        });
      }

      let recommendedShows;
      if (showTypeIdParam === "movie") {
        // Make API call to MovieDB
        recommendedShows = await axios.get(
          `https://api.themoviedb.org/3/movie/${showId}/recommendations?api_key=${API_KEY}`
        );
      }
      if (showTypeIdParam === "tv") {
        // Make API call to MovieDB
        recommendedShows = await axios.get(
          `https://api.themoviedb.org/3/tv/${showId}/recommendations?api_key=${API_KEY}`
        );
      }

      // Return error if MovieDB did not find a movie from ID
      if (recommendedShows?.data.success === false) {
        return callback(null, {
          statusCode: 401,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            error: "Not a valid movie ID",
          }),
        });
      }

      // Happy path - return back results from MovieDB
      return callback(null, {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ results: recommendedShows?.data.results }),
      });
    } else {
      return callback(null, {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "not supported" }),
      });
    }
  } catch (error) {
    console.error("There was a fatal error", error);
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error }),
    });
  }
};

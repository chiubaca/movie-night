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
      const queryParam = event.queryStringParameters?.id as string;

      // Check if id param was provided if not throw error
      if (!queryParam) {
        return callback(null, {
          statusCode: 401,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            error: "no movie id was provided",
          }),
        });
      }

      // Type check on query param to ensure it is a number
      const movieId: number | false = isNaN(Number(queryParam))
        ? false
        : Number(queryParam);

      // Throw error if provided id was not a number
      if (movieId === false) {
        console.log("empy id", queryParam);
        return callback(null, {
          statusCode: 401,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            error: "Not a valid movie ID",
          }),
        });
      }

      // Make API call to MovieDB
      const recommendedMovies = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}`
      );

      // Return error if MovieDB did not find a movie from ID
      if (recommendedMovies.data.success === false) {
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
        body: JSON.stringify({ results: recommendedMovies.data.results }),
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

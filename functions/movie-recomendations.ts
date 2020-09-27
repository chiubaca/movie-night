import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
// import axios from "axios";

export const handler = async function (
  event: APIGatewayProxyEvent,
  _context: any,
  callback: APIGatewayProxyCallback
): Promise<void> {
  try {
    if (event.httpMethod === "GET") {
      // const API_KEY = process.env.VUE_APP_MOVIE_DB_API_KEY;

      // extract post id from query string
      const queryParam = event?.queryStringParameters;

      // const trendingMovies = await axios.get(
      //   `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${API_KEY}`
      // );
      console.log({ queryParam });

      return callback(null, {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg: queryParam }),
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

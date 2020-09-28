import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";

export const handler = async function (
  event: APIGatewayProxyEvent,
  _context: any,
  callback: APIGatewayProxyCallback
): Promise<void> {
  try {
    if (event.httpMethod === "GET") {
      // const API_KEY = process.env.VUE_APP_MOVIE_DB_API_KEY;
      console.log("working...");

      // extract movie Ids from query param
      const queryParam = event.queryStringParameters;
      const movieId = queryParam.id as unknown;

      console.log("what are the params?", movieId);

      if (!movieId) {
        return callback(null, {
          statusCode: 401,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            error: "no movie id was provided",
          }),
        });
      }

      return callback(null, {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg: "movie Id :" + movieId }),
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

exports.handler = async function(event) {
  const url = event.queryStringParameters.url;

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No URL" })
    };
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow"
    });

    const finalUrl = response.url;
    const asinMatch = finalUrl.match(/\/dp\/(B0[A-Z0-9]{8})/i);

    return {
      statusCode: 200,
      body: JSON.stringify({
        asin: asinMatch ? asinMatch[1] : null,
        finalUrl
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() })
    };
  }
};
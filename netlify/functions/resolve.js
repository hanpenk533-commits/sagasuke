exports.handler = async function(event) {
  const url = event.queryStringParameters.url;

  if (!url) {
    return { statusCode: 400, body: "No URL" };
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
        finalUrl,
        asin: asinMatch ? asinMatch[1] : null
      })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e.toString()
    };
  }
};
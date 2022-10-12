export async function fetchMovies(accessToken) {
  // const res = await fetch("http://api.dev.com:7000/v1/films", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + JSON.parse(accessToken),
  //   },
  // });
  const res = await fetch("/movies.json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
  // return res;
}

export async function fetchSingleMovie({ movieId, accessToken }) {
  //   const res = await fetch("http://api.dev.com:7000/v1/films/" + id, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + JSON.parse(accessToken),
  //     },
  //   });
  //   const film = await res.json();

  const res = await fetch("/movies.json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  let movie = data.find((m) => m.pk === movieId);

  if (movie) {
    movie = {
      id: movie.pk,
      ...movie.fields,
    };
  }

  console.log({ movie, data });

  return movie;
  // return res;
}

export async function createOrder({ accessToken, items }) {
  const url = "/api/order";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ items }),
  });
  const data = await res.json();

  console.log({ orderData: data });
  return data?.order_id;
}

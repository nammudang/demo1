import React from "react";
import { useQuery, gql } from "@apollo/client";
import axios from "axios";
const FILMS_QUERY = gql`
{
  getProducts {
    name
    price
    category
  }
}
`;

function Card()  {
  const { data, loading, error } = useQuery(FILMS_QUERY);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  return (
    <div>
      <h1>Show Data</h1>
      <ul>
        {data.getProducts.map((item,id) => (
          <li key={id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
export default Card
const fetchSearch = async ({ queryKey }) => {
  const { animal, breed, location } = queryKey[1];

  const result = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!result.ok) {
    throw new Error(`pet search is not ok ${animal}, ${location}, ${breed}`);
  }

  return result.json();
};

export default fetchSearch;

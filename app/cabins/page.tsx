import Counter from "../components/Counter";

export interface user {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: [object];
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export default async function Page() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  const data: user[] = await res.json();

  return (
    <div>
      <h1>Cabins page</h1>
      <ul>
        {data.map((user: user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <Counter users={data} />
    </div>
  );
}

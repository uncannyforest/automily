import { connectToDatabase } from '../util/mongodb'

export default function Users({ users }) {
  return (
    <div>
      <h1>Users!! (dev test page)</h1>
      <ul>
        {users.map((user) => (
          <li>
            <h2>{user.name}</h2>
            <h3>{user.email}</h3>
            <h3>{user.date}</h3>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase()

  const users = await db.collection('users').find({}).limit(20).toArray()

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  }
}

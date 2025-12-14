import { useAuth } from "./AuthContext";

const Error = () => {
  const { error, forgetName } = useAuth();
  console.log(error)
  return (
    <section>
      <h1>{error}</h1>
      <button onClick={forgetName}>Back</button>
    </section>
  )
}

export default Error;
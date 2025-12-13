import { useAuth } from "./AuthContext";

const ReturnEntrance = () => {
  const { name } = useAuth();
  return (
    <>
      <h1>Welcome Back to the Cave {name}</h1>
      <button>Continue</button>
      <button>Forget My Name</button>
    </>
  )
}

export default ReturnEntrance;
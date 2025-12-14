import { useAuth } from "./AuthContext";

const ReturnEntrance = () => {
  const { name, continueToTablet, forgetName } = useAuth();
  return (
    <>
      <h1>Welcome Back to the Cave {name}</h1>
      <section id="buttons">
        <button onClick={continueToTablet}>Continue</button>
        <button onClick={forgetName}>Forget My Name</button>
      </section>
    </>
  )
}

export default ReturnEntrance;
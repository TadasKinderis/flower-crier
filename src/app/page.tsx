import App from "./App";

export default function Home() {
  return (
    <main className="container">
      <div className="block hero is-primary">
        <div className="hero-body">
          <p className="title">Flower Crier</p>
        </div>
      </div>
      <div className="block">
        <App />
      </div>
    </main>
  );
}

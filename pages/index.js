import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

export default function Home() {
  return (
    <div className="font-mono">
      <Navbar />
      <Hero />
      <Products />
    </div>
  );
}

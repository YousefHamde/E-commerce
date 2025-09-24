import heroImg from "../assets/Hero.png";

export default function Hero() {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div
          className="flex min-h-[480px] flex-col items-start justify-end rounded-xl bg-cover bg-center bg-no-repeat p-12 text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${heroImg})`,
          }}
        >
          <h1 className="text-5xl font-black">New Arrivals</h1>
          <p className="text-lg">Discover the latest trends and styles</p>
        </div>
      </div>
    </section>
  );
}

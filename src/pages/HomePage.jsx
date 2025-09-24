import ButtonView from "../components/ButtonView";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SectionHeader from "../components/SectionHeader";
import { useProduct } from "../context/productContext";
import ProductGrid from "../components/ProductGrid";
import ProductCard from "../components/ProductCard";
import PromoSection from "../components/PromoSection";
import SpinnerFullPage from "../components/SpinnerFullPage";

export default function HomePage() {
  const { products, error ,isLoading } = useProduct();
  const piceProduct = products.filter((el) => {
    if (el.stock >= 92) return el;
  });

  if(isLoading) return <SpinnerFullPage/>

  return (
    <>
      <Header />
      <main className="px-10 lg:px-20 xl:px-30 py-10 flex-1 mt-20">
        {/* Hero Section */}
        <Hero />
        {error ? (
          <Massage massage={error} />
        ) : (
          <>
            <section>
              <SectionHeader
                button={<ButtonView />}
                header="Our Products"
                text="Too Many Products To Choose From? We Will Help You Find The Right One"
              >
                <ProductGrid>
                  {piceProduct.map((product) => (
                    <ProductCard product={product} key={product.id} />
                  ))}
                </ProductGrid>
              </SectionHeader>
            </section>
            <PromoSection />
            <section>
              <SectionHeader
                header="Our Products"
                text="Too Many Products To Choose From? We Will Help You Find The Right One"
              >
                <ProductGrid>
                  {piceProduct.map((product) => (
                    <ProductCard product={product} key={product.id} />
                  ))}
                </ProductGrid>
              </SectionHeader>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

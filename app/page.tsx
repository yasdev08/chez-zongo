import Hero from "@/components/hero";
import MenuSection from "@/components/menu-section";
import CartDrawer from "@/components/cart-drawer";
import FloatingCart from "@/components/floating-cart";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <Hero />

      {/* Menu — anchored for scroll-to */}
      <div id="menu">
        <MenuSection />
      </div>

      {/* Footer */}
      <Footer />

      {/* Cart UI (client) */}
      <CartDrawer />
      <FloatingCart />
    </main>
  );
}

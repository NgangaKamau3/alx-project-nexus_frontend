import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "@/store/store";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

import "@/styles/globals.css";
import CategoryPage from "./CategoryPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProductDetailPage from "./ProductDetailPage";
import CartPage from "./CartPage";
import WishlistPage from "./WishlistPage";
import VirtualTryOnPage from "./VirtualTryOnPage";
import { Home } from "lucide-react";
import HomePage from "./HomePage";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <RegisterPage />
        <LoginPage />
        <main className="flex-1">
          <HomePage />
          <CategoryPage />
          <ProductDetailPage />
          <CartPage />
          <WishlistPage />
          <VirtualTryOnPage />
        </main>

        <Footer />

        <Toaster position="top-right" />
      </div>
    </Provider>
  );
}

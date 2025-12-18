import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Home() {

  // 🔥 EXACTLY 9 HERO SLIDES
  const heroSlides = [
    {
      title: "Glazed skin goals",
      desc: "Up to 15% off on skin-protecting, dewy formulas.",
      img: "https://www.hindustantimes.com/ht-img/img/2023/03/14/1600x900/photo_2023-03-14_17-19-42_1678794913310_1678794921097_1678794921097.jpg",
      link: "/category/skin",
    },
    {
      title: "Luxury Makeup Picks",
      desc: "Flat 20% off on trending essentials.",
      img: "https://m.media-amazon.com/images/I/71TtkiOaU7L.jpg",
      link: "/category/makeup",
    },
    {
      title: "Hair Care Boost",
      desc: "Strong & silky hair starts here.",
      img: "https://beardo.in/cdn/shop/files/2_3.jpg?v=1762572768&width=1445",
      link: "/category/hair",
    },
    {
      title: "Fragrance Deals",
      desc: "Up to 30% off premium perfumes.",
      img: "https://cdn.i.haymarketmedia.asia/?n=campaign-india%2Fcontent%2Fiframe+width%3D560+height%3D315+src%3Dhttpswww.youtube.comembedEpu3lIByuuksi%3DsLPgApuxv_R3JPJG+title%3DYouTube+video+player+frameborder%3D0+allow%3Daccelerometer%3B+autoplay%3B+clipboard-write%3B+encrypted-media%3B+gy.jpg",
      link: "/category/fragrance",
    },
    {
      title: "Men Grooming Kit",
      desc: "Daily essentials for effortless style.",
      img: "https://mxp-media.ilnmedia.com/media/content/2025/Oct/Line-it-Shape-it-Own-it_68e28376b048f.jpg",
      link: "/category/men",
    },
    {
      title: "Bath & Body Wellness",
      desc: "Relax, refresh, recharge.",
      img: "https://www.bathandbodyworks.in/on/demandware.static/-/Sites-bathandbody_storefront_catalog/default/dw5f8d3c20/QQQ%2030.jpg",
      link: "/category/bath-body",
    },
    {
      title: "Mom & Baby Safe Care",
      desc: "Gentle products for everyday use.",
      img: "https://i.pinimg.com/736x/b4/a0/b5/b4a0b55abf5f1019d15db7a2e5ff681a.jpg",
      link: "/category/mom-baby",
    },
    {
      title: "Mini Essentials",
      desc: "Small size • Big impact.",
      img: "https://www.srisritattva.com/cdn/shop/products/MiniEssential.jpg?v=1700222302&width=1445",
      link: "/category/minis",
    },
    {
      title: "Festive Gift Combos",
      desc: "Special curated boxes.",
      img: "https://houseofaroma.in/wp-content/uploads/2025/09/Gifts-for-Festivals-3.webp",
      link: "/category/gifts",
    },
  ];

  // ✅ DEALS (unchanged)
  const deals = [
    {
      id: 1,
      name: "Glow Skin Serum",
      price: 299,
      image: "https://img.freepik.com/premium-vector/cosmetics-skin-care-product-ads-with-bottle-banner-ad-beauty-products-with-paper-art-love_258787-2914.jpg",
    },
    {
      id: 2,
      name: "Hair Strength Oil",
      price: 249,
      image: "https://img.freepik.com/premium-vector/hair-care-products-ad_258787-3104.jpg",
    },
    {
      id: 3,
      name: "Daily Face Wash",
      price: 199,
      image: "https://img.freepik.com/premium-vector/face-wash-ad-banner_258787-3120.jpg",
    },
    {
      id: 4,
      name: "Night Repair Cream",
      price: 349,
      image: "https://img.freepik.com/premium-vector/beauty-cream-ad_258787-3140.jpg",
    },
  ];

  return (
    <div className="w-full">

      {/* ---------------- HERO SLIDESHOW ---------------- */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link to={slide.link}>
              <div className="w-full py-16 bg-yellow-200 cursor-pointer">
                <div className="grid items-center grid-cols-1 gap-10 px-6 mx-auto max-w-7xl md:grid-cols-2">

                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h1 className="text-5xl font-bold text-gray-900">
                      {slide.title}
                    </h1>
                    <p className="max-w-md mt-4 text-lg text-gray-700">
                      {slide.desc}
                    </p>
                    <button className="px-8 py-3 mt-6 font-semibold text-white bg-black rounded-full">
                      Shop Now
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center"
                  >
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="object-cover rounded-xl w-[380px] h-[420px]"
                    />
                  </motion.div>

                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ---------------- DEALS ---------------- */}
      <div className="px-6 py-16 mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-semibold">
          Deals of the Day
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
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

  return (
    <div className="w-full">

      {/* ---------------- HERO SLIDESHOW ---------------- */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2500 }}
        pagination={{ clickable: true }}
        loop
        slidesPerView={1}
        className="w-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link to={slide.link}>
              <div className="w-full py-12 bg-yellow-200 cursor-pointer">
                <div className="grid items-center grid-cols-1 gap-10 px-6 mx-auto max-w-7xl md:grid-cols-2">

                  {/* LEFT TEXT */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    <h1 className="text-5xl font-bold leading-tight text-gray-900">
                      {slide.title}
                    </h1>

                    <p className="max-w-md mt-4 text-lg text-gray-700">
                      {slide.desc}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 mt-6 font-semibold text-white bg-black rounded-full"
                    >
                      Shop Now
                    </motion.button>
                  </motion.div>

                  {/* RIGHT IMAGE */}
                  <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    <img
                      className="rounded-xl w-[380px] h-[420px] object-cover shadow-lg"
                      src={slide.img}
                    />
                  </motion.div>

                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ---------------- BRANDS STRIP ---------------- */}
      <div className="px-6 py-10 mx-auto max-w-7xl">
        <motion.h2
          className="mb-6 text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Top Brands
        </motion.h2>

        <div className="grid grid-cols-3 gap-6 sm:grid-cols-5 md:grid-cols-6">
          {[
            "https://www.pngplay.com/wp-content/uploads/9/Polo-Ralph-Lauren-Logo-Logo-Transparent-Images.png",
            "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
            "https://logohistory.net/wp-content/uploads/2023/02/Nike-Logo.png",
            "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/23dc772e-e7e1-4cfa-81df-125bd93b6744.jpg",
            "https://download.logo.wine/logo/Zara_(retailer)/Zara_(retailer)-Logo.wine.png",
            "https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png"
          ].map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.12 }}
              className="flex items-center justify-center p-4 bg-white border shadow-sm cursor-pointer rounded-xl"
            >
              <img src={logo} className="object-contain h-12" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---------------- DEALS SECTION ---------------- */}
      <div className="px-6 py-10 mx-auto max-w-7xl">
        <h2 className="mb-6 text-3xl font-bold">Deals of the Day</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ rotateX: 6, rotateY: -6, scale: 1.05 }}
              style={{ transformStyle: "preserve-3d" }}
              className="p-4 bg-white border shadow cursor-pointer rounded-xl"
            >
              <img
                src="https://img.freepik.com/premium-vector/cosmetics-skin-care-product-ads-with-bottle-banner-ad-beauty-products-with-paper-art-love_258787-2914.jpg"
                className="object-cover w-full h-48 rounded-lg"
              />
              <h3 className="mt-3 text-lg font-semibold">Special Product</h3>
              <p className="mt-1 text-xl font-bold text-blue-600">₹299</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---------------- FOOTER ---------------- */}
      <motion.div
        className="py-10 mt-16 text-gray-300 bg-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <div className="grid gap-8 px-6 mx-auto max-w-7xl sm:grid-cols-3">
          <div>
            <h3 className="mb-3 text-xl font-semibold">E-Shop</h3>
            <p className="text-sm text-gray-400">
              Premium lifestyle & beauty products.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Customer Service</li>
              <li>Return Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-semibold">Follow Us</h3>
            <p className="text-sm">Instagram | Facebook | Twitter</p>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

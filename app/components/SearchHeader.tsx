"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LucideSearch, Menu, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { useSearch } from '../context/SearchContext';
import Link from 'next/link';

export function SearchHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Lấy các state và hàm xử lý từ SearchContext
  const {
    searchTerm,
    setSearchTerm,
    setMoqValue,
    setPriceValue,
    categories,
    filters,
    selectedCategory,
    setSelectedCategory,
    setSelectedSubCategory
  } = useSearch();

  // Logic ẩn hiện khi scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if ((window as Window & { __scrollingToTop?: boolean }).__scrollingToTop) {
        setLastScrollY(currentScrollY);
        return;
      }
      if (currentScrollY > lastScrollY && currentScrollY > 300) setIsVisible(false);
      else setIsVisible(true);
      setLastScrollY(currentScrollY);
    };
    const handleScrollToTopDone = () => setIsVisible(true);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scrollToTopDone', handleScrollToTopDone);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scrollToTopDone', handleScrollToTopDone);
    };
  }, [lastScrollY]);

  // Hàm xử lý khi người dùng thay đổi Category
  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    } else {
      setSelectedCategory(value);
      setSelectedSubCategory(null);
    }
  };

  return (
    <>
      {/* Fixed wrapper — banner always visible, nav collapses on scroll */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Marquee Banner — never hides */}
        <div className="overflow-hidden flex flex-nowrap bg-[#1E4A36] text-[#F4CA68] font-svn-regular font-semibold text-sm py-2" style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}>
          
          {/* CÁCH CHUẨN: Gắn trực tiếp animation vào 2 khối con */}
          {[0, 1].map((blockIdx) => (
            <div key={blockIdx} className="flex shrink-0 animate-marquee-ltr">
              {/* Chỉ lặp 6 lần là quá đủ để tràn màn hình rộng nhất, tránh lỗi tràn bộ nhớ GPU */}
              {[0, 1, 2, 3, 4, 5].map((itemIdx) => (
                <span key={itemIdx} className="inline-flex items-center gap-10 pr-10 md:gap-20 md:pr-20 uppercase tracking-wide whitespace-nowrap">
                  <span>Can&apos;t find the product you need?</span>
                  <span>Contact us to discuss more!</span>
                </span>
              ))}
            </div>
          ))}

        </div>

        {/* Nav — collapses to 0 height when scrolling down */}
        <motion.div
          initial={false}
          animate={{ height: isVisible ? 'auto' : 0 }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          className="overflow-hidden shadow-[0_1px_1px_rgba(0,0,0,0.06)]"
        >
          <div className="bg-linear-to-b from-[#E8F4ED] from-20% to-white px-4 md:px-8 py-3 md:py-4">
            <div className="max-w-360 mx-auto flex items-center justify-between gap-4 md:gap-12">
              {/* Mobile Menu Button */}
              <button onClick={() => setIsDrawerOpen(true)} className="md:hidden p-2 hover:bg-gray-100 rounded-md">
                <Menu size={24} className="text-[#428159]" />
              </button>

              {/* Logo */}
              <Link href="/">
                <div className="w-32 h-10 md:w-48 md:h-12 relative shrink-0 cursor-pointer">
                  <Image src="/assets/Group.png" alt="China Sourcing" fill className="object-contain" />
                </div>
              </Link>

              {/* Desktop Search Bar */}
              <div className="hidden md:flex flex-1 max-w-2xl border border-[#428159] rounded-none overflow-hidden bg-white">
                {categories && (
                  <Select
                    value={selectedCategory || "all"}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger className="w-35 h-12! border-0 border-r border-r-[#428159] rounded-none focus:ring-0 text-[#5F6567] font-medium">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className='md:translate-y-12'>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories?.map((cat) => (
                        <SelectItem key={cat.main} value={cat.main}>{cat.main}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 h-12 px-4 outline-none"
                />
                <button className="h-12 bg-[#1E4A36] px-6 text-white hover:bg-green-700 border-0">
                  <LucideSearch size={20} />
                </button>
              </div>

              <a
                href="mailto:info@vietnamsourcing.co"
                className="font-blaak tracking-tight hidden md:flex items-center bg-[#F4CA68] text-[#1E4A36] px-8 py-2.5 rounded-none active:scale-95 transition-all whitespace-nowrap cursor-pointer"
              >
                Email Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="h-24 md:h-28"></div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="md:hidden">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 overflow-y-auto"
            >
              <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-lg font-semibold text-[#428159]">Menu</h2>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-gray-100 rounded-md">
                  <X size={24} className="text-[#428159]" />
                </button>
              </div>

              <div className="p-4 border-b border-gray-200 space-y-3">
                <div className="w-full border border-[#428159] rounded-sm overflow-hidden">
                  {categories && (
                    <Select
                      value={selectedCategory || "all"}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger className="w-full h-12 border-0 rounded-none text-[#428159] font-medium focus:ring-0">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories?.map((cat) => (
                          <SelectItem key={cat.main} value={cat.main}>{cat.main}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 min-w-0 h-12 px-4 border border-[#428159] rounded-sm outline-none text-sm"
                  />
                  <button className="h-12 w-12 shrink-0 bg-[#428159] text-white rounded-sm flex items-center justify-center">
                    <LucideSearch size={20} />
                  </button>
                </div>
              </div>

              {filters && (
                <div className="p-4">
                  <Sidebar
                    filters={filters!}
                    onMoqChange={(v) => setMoqValue(v ? parseInt(v) : null)}
                    onPriceSearchChange={(v) => setPriceValue(v ? parseFloat(v) : null)}
                    onClose={() => setIsDrawerOpen(false)}
                  />
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
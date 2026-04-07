"use client"
import { useState, useRef } from 'react';
import { HomeDataDTO } from '@/backend/dto/product.dto';
import { FilterList } from './FilterList';
import { CornerDownLeft, ChevronDown, ChevronRight, Check } from 'lucide-react';
import { useSearch } from '../context/SearchContext';

interface SidebarProps {
  filters: HomeDataDTO['filters'];
  onMoqChange: (value: string) => void;
  onPriceSearchChange: (value: string) => void;
  onClose?: () => void; // Prop để đóng Drawer trên Mobile
}

export function Sidebar({ filters, onMoqChange, onPriceSearchChange, onClose }: SidebarProps) {
  const {
    selectedCategory, setSelectedCategory,
    selectedSubCategory, setSelectedSubCategory,
    selectedMaterial, setSelectedMaterial,
    selectedUsage, setSelectedUsage,
    selectedFeature, setSelectedFeature
  } = useSearch();

  // Refs để điều khiển input
  const moqInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);

  const [openMainCats, setOpenMainCats] = useState<Record<string, boolean>>({});
  const [isMoreCatsExpanded, setIsMoreCatsExpanded] = useState(false);

  const catLimit = 5;
  // --- DÒNG FIX LỖI Ở ĐÂY ---
  const hasMoreCats = filters.categories.length > catLimit;
  // --------------------------
  const displayedCategories = isMoreCatsExpanded ? filters.categories : filters.categories.slice(0, catLimit);

  const sections = [
    { label: 'Material', items: filters.materials, current: selectedMaterial, setter: setSelectedMaterial },
    { label: 'Usage', items: filters.usages, current: selectedUsage, setter: setSelectedUsage },
    { label: 'Special Features', items: filters.features, current: selectedFeature, setter: setSelectedFeature }
  ];

  const handleManualApply = (type: 'moq' | 'price') => {
    const input = type === 'moq' ? moqInputRef.current : priceInputRef.current;
    const value = input?.value || "";

    if (type === 'moq') onMoqChange(value);
    else onPriceSearchChange(value);

    input?.blur(); // Tắt bàn phím mobile

    if (onClose) {
      onClose(); // Đóng Sidebar Drawer
    }
  };

  const handleToggle = (current: string | null, value: string, setter: (v: string | null) => void) => {
    setter(current === value ? null : value);
  };

  const toggleSubAccordion = (catMain: string) => {
    setOpenMainCats(prev => ({ ...prev, [catMain]: !prev[catMain] }));
  };

  return (
    <aside className="w-full md:w-72 shrink-0 md:self-start">
      <div className="bg-[#428159]/10 border border-[#428159] rounded-md overflow-hidden md:sticky md:top-28 shadow-sm">

        {/* --- CATEGORY SECTION --- */}
        <div className="p-4 md:p-6">
          <h3 className="font-medium font-blaak text-[#161616] mb-4 text-base md:text-lg">Category</h3>

          <div className="space-y-2">
            {displayedCategories.map((cat) => {
              const isMainCatActive = selectedCategory === cat.main;

              return (
                <div key={cat.main} className="group">
                  <div
                    className="flex items-center justify-between cursor-pointer group/row"
                    onClick={() => toggleSubAccordion(cat.main)}
                  >
                    <p className={`text-sm md:text-md font-svn-regular transition-all ${isMainCatActive ? 'text-[#428159] font-bold' : 'text-[#585858] group-hover/row:text-[#428159]'
                      }`}>
                      {cat.main}
                    </p>

                    <div className="p-1 hover:bg-green-100 rounded-full transition-colors">
                      {openMainCats[cat.main] ? (
                        <ChevronDown size={16} className={isMainCatActive ? "text-[#428159]" : "text-[#1E4A36]"} />
                      ) : (
                        <ChevronRight size={16} className="text-[#428159]" />
                      )}
                    </div>
                  </div>

                  {openMainCats[cat.main] && (
                    <ul className="mt-1 ml-4">
                      {cat.subs.map((sub) => (
                        <li
                          key={sub}
                          onClick={() => {
                            if (selectedSubCategory === sub) {
                              setSelectedSubCategory(null);
                              setSelectedCategory(null);
                            } else {
                              setSelectedCategory(cat.main);
                              setSelectedSubCategory(sub);
                            }
                          }}
                          className={`text-xs md:text-sm font-svn-regular cursor-pointer py-1.5 pl-3 flex items-center gap-2 transition-all
                            ${selectedSubCategory === sub ? 'text-[#428159] font-bold' : 'text-[#585858] hover:text-[#428159]'}`}
                        >
                          {selectedSubCategory === sub && <Check size={14} className="text-green-600 stroke-[3px]" />}
                          {sub}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          {hasMoreCats && (
            <button
              onClick={() => setIsMoreCatsExpanded(!isMoreCatsExpanded)}
              className="flex items-center gap-1 text-xs md:text-sm font-svn-regular bg-white text-[#1F4A36] border border-[#428159] px-3 md:px-4 py-1.5 md:py-2 rounded-none mt-4 hover:bg-green-50 transition-all font-medium cursor-pointer"
            >
              <span>{isMoreCatsExpanded ? "Less" : "More"}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isMoreCatsExpanded ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>

        {/* --- OTHER FILTER SECTIONS --- */}
        {sections.map((section) => (
          <div key={section.label} className="p-4 md:p-6">
            <h3 className="font-medium font-blaak text-[#161616] mb-2 text-base md:text-lg">{section.label}</h3>
            <FilterList
              items={section.items}
              renderItem={(item) => (
                <li
                  key={item}
                  onClick={() => handleToggle(section.current, item, section.setter)}
                  className={`text-sm md:text-md font-svn-regular cursor-pointer transition-all py-1 flex items-center gap-2 ${section.current === item ? 'text-[#428159] font-bold' : 'text-[#585858] hover:text-[#428159]'
                    }`}
                >
                  {section.current === item && <Check size={14} className="text-green-600 stroke-[3px]" />}
                  {item}
                </li>
              )}
            />
          </div>
        ))}

        {/* --- INPUT SECTIONS (MOQ & PRICE) --- */}
        <div className="p-4 md:p-6 space-y-6">
          <div>
            <h3 className="font-medium font-blaak text-[#161616] mb-2 text-base md:text-lg">Min Order</h3>
            <div className="relative group/input">
              <input
                ref={moqInputRef}
                type="number"
                placeholder="Less than"
                className="w-full border border-[#428159] rounded-md py-2 px-3 pr-10 outline-none text-sm font-svn-regular bg-white focus:border-[#1E4A36] transition-all"
                onChange={(e) => onMoqChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleManualApply('moq')}
              />
              <button
                type="button"
                onClick={() => handleManualApply('moq')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#428159] hover:text-[#1E4A36] hover:bg-green-50 rounded transition-all cursor-pointer active:scale-90"
              >
                <CornerDownLeft size={16} />
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-medium font-blaak text-[#161616] mb-2 text-base md:text-lg">Search Within</h3>
            <div className="relative group/input">
              <input
                ref={priceInputRef}
                type="number"
                placeholder="Enter Price"
                className="w-full border border-[#428159] rounded-md py-2 px-3 pr-10 outline-none text-sm font-svn-regular bg-white focus:border-[#1E4A36] transition-all"
                onChange={(e) => onPriceSearchChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleManualApply('price')}
              />
              <button
                type="button"
                onClick={() => handleManualApply('price')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#428159] hover:text-[#1E4A36] hover:bg-green-50 rounded transition-all cursor-pointer active:scale-90"
              >
                <CornerDownLeft size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}
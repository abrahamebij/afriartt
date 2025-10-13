"use client";

import React, { type Dispatch, type SetStateAction } from "react";
import type { Category, OwnershipOption } from "../../../types/artwork";

interface FilterSidebarProps {
  categories: Category[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  ownershipOptions: OwnershipOption[];
  selectedOwnership: string[];
  toggleOwnership: (ownership: string) => void;
  minPrice: string;
  setMinPrice: Dispatch<SetStateAction<string>>;
  maxPrice: string;
  setMaxPrice: Dispatch<SetStateAction<string>>;
  resetFilters: () => void;
}

export function FilterSidebar({
  categories,
  selectedCategories,
  toggleCategory,
  ownershipOptions,
  selectedOwnership,
  toggleOwnership,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  resetFilters,
}: FilterSidebarProps): React.ReactElement {
  return (
    <aside className="lg:w-64 flex-shrink-0">
      <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Filter</h3>
          <button
            onClick={resetFilters}
            className="text-sm text-[#DF620C] hover:text-orange-700 font-medium"
          >
            Reset Filter
          </button>
        </div>

        <div className="space-y-6">
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
          />

          <PriceFilter
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />

          <OwnershipFilter
            ownershipOptions={ownershipOptions}
            selectedOwnership={selectedOwnership}
            toggleOwnership={toggleOwnership}
          />
        </div>
      </div>
    </aside>
  );
}

// Sub-component for Category Filter
interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
}

function CategoryFilter({
  categories,
  selectedCategories,
  toggleCategory,
}: CategoryFilterProps): React.ReactElement {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-900 mb-3">Category</h4>
      <div className="space-y-2">
        {categories.map((cat: Category) => (
          <CheckboxItem
            key={cat.id}
            id={cat.id}
            label={cat.label}
            checked={selectedCategories.includes(cat.label)}
            onChange={() => toggleCategory(cat.label)}
          />
        ))}
      </div>
    </div>
  );
}

// Sub-component for Price Filter
interface PriceFilterProps {
  minPrice: string;
  setMinPrice: Dispatch<SetStateAction<string>>;
  maxPrice: string;
  setMaxPrice: Dispatch<SetStateAction<string>>;
}

function PriceFilter({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: PriceFilterProps): React.ReactElement {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h4 className="text-sm font-semibold text-gray-900 mb-3">Price</h4>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#DF620C]/80"
        />
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#DF620C]/80"
        />
      </div>
    </div>
  );
}

// Sub-component for Ownership Filter
interface OwnershipFilterProps {
  ownershipOptions: OwnershipOption[];
  selectedOwnership: string[];
  toggleOwnership: (ownership: string) => void;
}

function OwnershipFilter({
  ownershipOptions,
  selectedOwnership,
  toggleOwnership,
}: OwnershipFilterProps): React.ReactElement {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h4 className="text-sm font-semibold text-gray-900 mb-3">
        Ownership Status
      </h4>
      <div className="space-y-2">
        {ownershipOptions.map((opt: OwnershipOption) => (
          <CheckboxItem
            key={opt.id}
            id={opt.id}
            label={opt.label}
            checked={selectedOwnership.includes(opt.label)}
            onChange={() => toggleOwnership(opt.label)}
          />
        ))}
      </div>
    </div>
  );
}

// Reusable Checkbox Component
interface CheckboxItemProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

function CheckboxItem({
  id,
  label,
  checked,
  onChange,
}: CheckboxItemProps): React.ReactElement {
  return (
    <label className="flex items-center cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-[#DF620C] border-gray-300 rounded focus:ring-[#DF620C]/80"
      />
      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
        {label}
      </span>
    </label>
  );
}

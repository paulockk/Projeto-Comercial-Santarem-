import { ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryTopBarProps {
  categoryTitle: string;
  search: string;
  setSearch: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  activeFilter: string;
  setActiveFilter: (value: string) => void;
  filterOptions: string[];
}

export default function CategoryTopBar({
  categoryTitle,
  search,
  setSearch,
  showFilters,
  setShowFilters,
  activeFilter,
  setActiveFilter,
  filterOptions,
}: CategoryTopBarProps) {
  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-container-max flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-margin-desktop">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
          <Link to="/" className="hover:text-[#2E3192]">
            Início
          </Link>

          <ChevronRight size={16} />

          <span className="text-[#2E3192]">{categoryTitle}</span>
        </div>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
          <div className="relative md:w-[420px]">
            <Search
              size={21}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2E3192]"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="O que você procura?"
              className="h-12 w-full rounded-full border border-gray-200 bg-[#F7F8FC] pl-12 pr-4 text-sm font-semibold text-gray-700 outline-none transition focus:border-[#2E3192] focus:bg-white focus:ring-4 focus:ring-[#2E3192]/10"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#2E3192]/10 px-6 text-sm font-extrabold text-[#2E3192] transition hover:bg-[#2E3192] hover:text-white"
          >
            <SlidersHorizontal size={19} />
            Filtros
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mx-auto max-w-container-max px-4 pb-5 md:px-margin-desktop">
          <div className="flex flex-wrap gap-2 rounded-2xl bg-[#F7F8FC] p-3">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  activeFilter === filter
                    ? "bg-[#E30613] text-white"
                    : "bg-white text-[#2E3192] hover:bg-[#2E3192] hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
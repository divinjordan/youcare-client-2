import FullPagination from "@/components/common/FullPagination";
import Spinner from "@/components/common/Spinner";
import { useForm } from "@/components/hooks/useForm";
import { InputText, Show, Display, Notifs } from "@/components/ui";
import { useDisplay, useLoading, useNotifs } from "@/store/interact";
import classNames from "classnames";
import { FC, useEffect } from "react";
import { MdClose, MdSearch } from "react-icons/md";

interface ResourceListingProps {
  model: any;
  name: string;
  searchInputPlaceholder?: string;
  searchFormWidth?: string;
  filters?: any;
  resetFilters?: () => void;
  filtersElement?: React.ReactNode;
  loadResource?: boolean;
  search?: any;
  children: React.ReactNode;
}

const ResourceListing: FC<ResourceListingProps> = ({
  model,
  name, // the key
  filters = undefined, // filters values. filterform.values. If undefined filters system is disabled
  resetFilters = () => {},
  searchInputPlaceholder = undefined, // placeholder of search input. If undefined.  search is disabled
  searchFormWidth = "w-[500px]",
  filtersElement, // filter elements jsx content
  search = {},
  loadResource = true,
  children,
}) => {
  const loading = useLoading((state) => state);
  const display = useDisplay((state) => state);
  const notifs = useNotifs();

  const searchForm = useForm();
  useEffect(() => {
    display.reset();
    if (loadResource) {
      loading.start(name);
      model
        .search(search)
        .catch(() => {
          notifs.set("error", "Une erreur c'est produite");
        })
        .finally(() => loading.stop(name));
    }
  }, []);

  const toggleFilters = () => {
    if (display.values.filters) {
      display.hide("filters");
      resetFilters();
    } else {
      display.show("filters");
    }
  };

  const submitSearch = () => {
    loading.start(name);
    model
      .search(
        filters != undefined
          ? { ...searchForm.values, ...filters }
          : searchForm.values
      )
      .finally(() => loading.stop(name));
  };
  return (
    <div>
      <Notifs />
      {searchInputPlaceholder != undefined ? (
        <div className="mt-4  items-center flex">
          <div className={searchFormWidth}>
            <InputText
              value={searchForm.values.keyword}
              handler={searchForm.handleChange}
              name={"keyword"}
              placeholder={searchInputPlaceholder}
              inputClass="px-3 py-2.5 border text-sm border-gray-300 w-full"
            />
          </div>
          {filters != undefined ? (
            <button
              onClick={toggleFilters}
              className="px-4 py-2 ml-2 bg-secondary text-white  flex items-center space-x-1"
            >
              <span>Filtres </span>
              <MdClose
                className={classNames("w-4 h-4 ml-2", {
                  hidden: !display.values.filters,
                })}
              />
            </button>
          ) : null}

          <button
            onClick={submitSearch}
            className="px-4 py-3 ml-2 bg-secondary text-white"
          >
            {loading.values[name] ? (
              <Spinner className="w-4 h-4 fill-primary text-white" />
            ) : (
              <MdSearch className="h-4 w-4" />
            )}
          </button>
        </div>
      ) : null}

      <Display item="filters" className="mt-8">
        <div className="border relative">
          <button
            onClick={() => {
              resetFilters();
              display.hide("filters");
            }}
            className="absolute right-2 top-2"
          >
            <MdClose className="w-5 h-5" />
          </button>
          {filtersElement}
        </div>
      </Display>

      {!loading.values[name] ? (
        <div>
          <div>{children}</div>
          <Show
            cond={model.items.length == 0}
            className="flex items-center justify-center py-4 bg-gray-200"
          >
            <span> Aucune resource disponible </span>
          </Show>

          {model.pagination.last_page != 1 ? (
            <div className="p-4 flex items-center">
              <FullPagination
                name={name}
                searchParams={{ keyword: searchForm.values.keyword }}
                model={model}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="border p-10 flex items-center justify-center  mt-4">
          <Spinner className="w-8 h-8 text-secondary fill-gray-100" />
        </div>
      )}
    </div>
  );
};

export default ResourceListing;
